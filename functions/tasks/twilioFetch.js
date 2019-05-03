const functions = require('firebase-functions');
const axios = require('axios');
const request = require('request');
const sgMail = require('@sendgrid/mail');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

sgMail.setApiKey(functions.config().sendgrid.key);

const callEmail = require('./helpers/callEmail.js');

exports.handler = async (req, res, firestore, storage) => {
  const calls = firestore.collection('calls');
  const contacts = firestore.collection('contacts');
  const users = firestore.collection('users');

  try {
    const snapshot = await calls.where('fetched', '==', false).get();
    if (snapshot.empty) {
      console.log('No calls waiting');
      return;
    }
    snapshot.forEach(async doc => {
      const { twilio } = doc.data();
      const [recording] = await client.recordings.list({ sourceSid: twilio });
      const { sid, status } = recording;
      if (status === 'completed') {
        const { id } = doc;
        const file = await storage.file(`${id}`);
        await request(
          `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Recordings/${sid}.wav`,
        )
          .pipe(
            file.createWriteStream({
              metadata: { contentType: 'audio/wav' },
            }),
          )
          .on('error', err => console.log(err))
          .on('finish', async () => {
            const [url] = await file.getSignedUrl({
              action: 'read',
              expires: '01-01-3000',
            });
            const response = await axios({
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
            await calls.doc(id).update({
              audio: url,
              fetched: true,
              call_duration: recording.duration,
              call_time: recording.dateCreated,
              deepgram: response.data,
            });
            await client.recordings(sid).remove();
            const userInfo = {
              user1email: '',
              user1name: '',
              user2email: '',
              user2name: '',
            };
            const contact = await contacts
              .doc(doc.data().contact_ref.id)
              .onSnapshot(async doc => {
                const user1 = await users.doc(doc.data().user1.id).get();
                userInfo.user1email = user1.data().email;
                userInfo.user1name = user1.data().displayName;

                const user2 = await users.doc(doc.data().user2.id).get();
                userInfo.user2email = user2.data().email;
                userInfo.user2name = user2.data().displayName;
              });

            const msg = {
              personalizations: [
                {
                  to: userInfo.user1email,
                  name: userInfo.user1name,
                  dynamic_template_data: {
                    user2: userInfo.user2name,
                  },
                },
                {
                  to: userInfo.user2email,
                  name: userInfo.user2name,
                  dynamic_template_data: {
                    user2: userInfo.user1name,
                  },
                },
              ],
              from: { email: 'labsrecaller@gmail.com', name: 'ReCaller' },
              dynamic_template_data: {
                audio: url,
                id,
                transcript: 'Need to map transcript received from deepgram',
              },
              templateId: 'd-59ed5092b3bf44118a5d7c1e0f617eef',
            };

            await sgMail.send(msg);
          });
      } else {
        console.log('Call has not finished recording');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
