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
      const time = moment
        .tz(schedTime, 'h:mm A', 'America/Chicago')
        .tz('utc')
        .format('h:mm A');
      if (now === time) {
        const user1id = doc.data().user.id;
        const user1 = await users.doc(user1id).get();
        const user1phone = user1.data().phone;
        const { phone2 } = doc.data();

        client.calls.create(
          {
            url: `https://handler.twilio.com/twiml/EHef6fe8c09005a4e4fa44c3142c2b2592?BuddyPhone=${phone2}`,
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
