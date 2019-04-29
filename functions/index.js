const functions = require('firebase-functions');
const admin = require('firebase-admin');

const caller = require('./tasks/caller.js');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://recaller-14a1f.firebaseio.com',
});

const firestore = admin.firestore();

exports.callService = functions.pubsub
  .topic('recaller')
  .onPublish((req, res) => {
    caller.handler(req, res, firestore);
  });
