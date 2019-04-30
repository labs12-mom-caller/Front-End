const functions = require('firebase-functions');
const axios = require('axios');
const request = require('request');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

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
            const url = await file.getSignedUrl({
              action: 'read',
              expires: '01-01-3000',
            });
            doc.set({
              audio: url,
              fetched: true,
            });
          });
      } else {
        console.log('Call has not finished recording');
      }
    });
  } catch (err) {
    console.log(err);
  }
};
