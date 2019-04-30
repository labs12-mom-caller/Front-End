const functions = require('firebase-functions');
const axios = require('axios');
const fs = require('fs');

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
      const { sid } = recording;
      const { id } = doc;
      const file = storage.file(`${id}.wav`);
      fs.createReadStream(
        `https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Recordings/${sid}`,
      )
        .pipe(file.createWriteStream())
        .on('error', err => console.log(err))
        .on('finish', () => {});
    });
  } catch (err) {
    console.log(err);
  }
};
