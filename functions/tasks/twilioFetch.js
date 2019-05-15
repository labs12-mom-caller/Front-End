const functions = require('firebase-functions');
const axios = require('axios');
const sgMail = require('@sendgrid/mail');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

sgMail.setApiKey(functions.config().sendgrid.key);

const simplifyTranscript = require('./helpers/simplifyTranscript');

exports.handler = async (req, res, firestore, storage) => {
  const {
    RecordingUrl,
    RecordingSid,
    CallSid,
    RecordingStartTime,
    RecordingDuration,
  } = req.body;

  try {
    const snap = await firestore
      .collection('calls')
      .where('twilio', '==', CallSid)
      .get();

    const [call] = snap.docs;

    if (call) {
      const { id } = call;

      const file = await storage.file(id);
      const writer = file.createWriteStream({
        metadata: { contentType: 'audio/wav' },
      });

      const response = await axios({
        method: 'get',
        url: RecordingUrl,
        responseType: 'stream',
      });

      response.data.pipe(writer);

      writer.on('finish', async () => {
        const [url] = await file.getSignedUrl({
          action: 'read',
          expires: '01-01-3000',
        });

        const deepgram = await axios({
          method: 'post',
          url: 'https://brain.deepgram.com/v2/listen',
          auth: {
            username: functions.config().deepgram.username,
            password: functions.config().deepgram.password,
          },
          headers: {
            'Content-Type': 'application/json',
          },
          params: {
            model: 'phonecall',
            multichannel: true,
            punctuate: true,
          },
          data: {
            url,
          },
        });

        await client.recordings(RecordingSid).remove();

        const contact = await call.data().contact_ref.get();
        const user1 = await contact.data().user1.get();
        const user2 = await contact.data().user2.get();

        const simplified = simplifyTranscript(
          deepgram.data,
          user1.data().displayName,
          user2.data().displayName,
        );

        await firestore.doc(`/calls/${id}`).update({
          audio: url,
          fetched: true,
          call_duration: RecordingDuration,
          call_time: RecordingStartTime,
          deepgram: deepgram.data,
          simplified,
        });

        let html = ``;

        simplified.forEach(line => {
          html += `<h3>${line.user}</h3>\n<p>${line.script}</p>\n`;
        });

        const msg = {
          personalizations: [
            {
              to: user1.data().email,
              name: user1.data().displayName,
              dynamic_template_data: {
                user2: user2.data().displayName,
              },
            },
            {
              to: user2.data().email,
              name: user2.data().displayName,
              dynamic_template_data: {
                user2: user1.data().displayName,
              },
            },
          ],
          from: { email: 'labsrecaller@gmail.com', name: 'ReCaller' },
          dynamic_template_data: {
            audio: url,
            id,
            transcript: html,
          },
          templateId: 'd-59ed5092b3bf44118a5d7c1e0f617eef',
        };

        await sgMail.send(msg);
      });
      writer.on('error', () =>
        console.log('Error with downloading Twilio call to Cloud Storage'),
      );
    } else {
      console.log('Error fetching call from Calls collection');
    }
  } catch (err) {
    console.log(err);
  }
};
