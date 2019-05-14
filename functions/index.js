const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

const caller = require('./tasks/caller.js');
const fetch = require('./tasks/twilioFetch.js');
const contactEmail = require('./tasks/contactEmail.js');
const userTwo = require('./tasks/userTwo.js');
const serviceAccount = require('./serviceAccountKey.json');

sgMail.setApiKey(functions.config().sendgrid.key);

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
    return caller.handler(req, res, firestore);
  });

exports.signupUserTwo = functions.firestore
  .document(`/users/{useruid}`)
  .onCreate(snapshot => {
    return userTwo.handler(admin, snapshot, sgMail);
  });

exports.contactEmail = functions.firestore
  .document(`/contacts/{contactId}`)
  .onCreate((snapshot, context) => {
    return contactEmail.handler(snapshot, context, firestore);
  });

exports.twilio = functions.https.onRequest((req, res) => {
  fetch.handler(req, res, firestore, bucket);
  res.status(201).end();
});
