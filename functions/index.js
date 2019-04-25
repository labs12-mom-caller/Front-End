const functions = require('firebase-functions');
const admin = require('firebase-admin');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://recaller-14a1f.firebaseio.com',
});

const firestore = admin.firestore();

exports.callService = functions.pubsub.topic('recaller').onPublish(() => {
  const contacts = firestore.collection('contacts');
  const today = contacts
    .where('scheduled_day', '==', 'thursday')
    .get()
    .then(snapshot => {
      if (snapshot.empty) {
        console.log('No contacts');
        return;
      }
      snapshot.forEach(doc => {
        console.log(doc);
      });
    })
    .catch(err => {
      console.log('Error getting docs', err);
    });

  return 'ok';
});
