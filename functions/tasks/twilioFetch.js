const functions = require('firebase-functions');

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
      const recording = await client.recordings.list({ sourceSid: twilio });
      const { sid } = recording[0];
      const rec = await client.recordings(sid).fetch();
      console.log(rec);
    });
  } catch (err) {
    console.log(err);
  }
};
