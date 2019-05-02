const functions = require('firebase-functions');
const axios = require('axios');
const request = require('request');
const sgMail = require('@sendgrid/mail');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

sgMail.setApiKey(functions.config().sendgrid.key);

exports.handler = async (req, res, firestore, storage) => {
  const calls = firestore.collection('calls');
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
        const file = storage.file(`${id}`);
        request(
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
          });
      } else {
        console.log('Call has not finished recording');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
