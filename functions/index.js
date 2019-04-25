const functions = require('firebase-functions');
const admin = require('firebase-admin');

const accountSid = functions.config().twilio.sid;
const authToken = functions.config().twilio.token;
const client = require('twilio')(accountSid, authToken);

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://recaller-14a1f.firebaseio.com',
});

const firestore = admin.firestore();

exports.callService = functions.pubsub.topic('recaller').onPublish(async () => {
  const contacts = firestore.collection('contacts');
  const users = firestore.collection('users');
  try {
    const snapshot = await contacts
      .where('scheduled_day', '==', 'thursday')
      .get();
    if (snapshot.empty) {
      console.log('No contacts');
      return;
    }
    snapshot.forEach(async doc => {
      const user1id = doc.data().user1.id;
      const user1 = await users.doc(user1id).get();
      const user1phone = user1.data().phone;
      console.log(doc.id, user1phone);
    });
  } catch (err) {
    console.log('Error getting docs', err);
  }
});
