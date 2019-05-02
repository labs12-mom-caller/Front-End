const functions = require('firebase-functions');

const moment = require('moment-timezone');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

exports.handler = async (req, res, firestore) => {
  const contacts = firestore.collection('contacts');
  const users = firestore.collection('users');
  const calls = firestore.collection('calls');
  const min = moment()
    .subtract(1, 'm')
    .toDate();
  const max = moment()
    .add(3, 'm')
    .toDate();
  try {
    const snapshot = await contacts
      .where('next_call', '>', min)
      .where('next_call', '<', max)
      .get();
    if (snapshot.empty) {
      console.log('No contacts');
      return;
    }
    snapshot.forEach(async doc => {
      const user1id = doc.data().user1.id;
      const user1 = await users.doc(user1id).get();
      const user1phone = user1.data().phoneNumber;
      const user2id = doc.data().user2.id;
      const user2 = await users.doc(user2id).get();
      const user2phone = user2.data().phoneNumber;

      client.calls.create(
        {
          url: `https://handler.twilio.com/twiml/EHef6fe8c09005a4e4fa44c3142c2b2592?BuddyPhone=${user2phone}`,
          to: user1phone,
          from: '+18727048254',
        },
        (err, call) => {
          calls
            .add({
              contact_ref: contacts.doc(`contacts/${doc.id}`),
              twilio: call.sid,
              fetched: false,
            })
            .then(ref => {
              console.log(`Added call document with ID: ${ref.id}`);
            });
        },
      );
    });
  } catch (err) {
    console.log('Error getting docs', err);
  }
};
