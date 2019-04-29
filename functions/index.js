const functions = require('firebase-functions');
const admin = require('firebase-admin');
const moment = require('moment-timezone');

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
  const today = moment()
    .format('dddd')
    .toLowerCase();
  const now = moment().format('h:mm A');
  try {
    const snapshot = await contacts.where('scheduled_day', '==', today).get();
    if (snapshot.empty) {
      console.log('No contacts');
      return;
    }
    snapshot.forEach(async doc => {
      const schedTime = doc.data().scheduled_time;
      const { timezone } = doc.data();
      const time = moment
        .tz(schedTime, 'h:mm A', timezone)
        .tz('utc')
        .format('h:mm A');
      if (now === time) {
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
            console.log(call);
          },
        );
      }
    });
  } catch (err) {
    console.log('Error getting docs', err);
  }
});
