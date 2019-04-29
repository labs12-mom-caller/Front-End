const functions = require('firebase-functions');
const admin = require('firebase-admin');

const caller = require('./tasks/caller.js');
const fetch = require('./tasks/twilioFetch.js');

const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://recaller-14a1f.firebaseio.com',
  storageBucket: 'recaller-14a1f.appspot.com',
});

const firestore = admin.firestore();
const bucket = admin.storage().bucket();

exports.callService = functions.pubsub
  .topic('recaller')
  .onPublish((req, res) => {
    caller.handler(req, res, firestore);
  });

exports.twilioFetch = functions.pubsub
  .topic('twilioFetch')
  .onPublish((req, res) => {
    fetch.handler(req, res, firestore, bucket);
  });
