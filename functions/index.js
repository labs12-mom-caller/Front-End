const functions = require('firebase-functions');
const admin = require('firebase-admin');
const stripe = require('stripe')(functions.config().stripe.token);
const express = require('express');
const cors = require('cors')({ origin: true });
const caller = require('./tasks/caller.js');
const fetch = require('./tasks/twilioFetch.js');

const app = express();
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
    return caller.handler(req, res, firestore);
  });

exports.twilioFetch = functions.pubsub
  .topic('twilioFetch')
  .onPublish((req, res) => {
    return fetch.handler(req, res, firestore, bucket);
  });
function send(res, code, body) {
  res.send({
    statusCode: code,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify(body),
  });
}
function charge(req, res) {
  const body = JSON.parse(req.body);
  const token = body.token.id;
  const { amount } = body.charge;
  const { currency } = body.charge;

  // Charge card
  stripe.charges
    .create({
      amount,
      currency,
      description: 'Firebase Example',
      source: token,
    })
    .then(charge => {
      send(res, 200, {
        message: 'Success',
        charge,
      });
    })
    .catch(err => {
      console.log(err);
      send(res, 500, {
        error: err.message,
      });
    });
}

app.use(cors);
app.post('/', (req, res) => {
  // Catch any unexpected errors to prevent crashing
  try {
    charge(req, res);
  } catch (e) {
    console.log(e);
    send(res, 500, {
      error: `The server received an unexpected error. Please try again and contact the site admin if the error persists.`,
    });
  }
});

exports.charge = functions.https.onRequest(app);

exports.signupUserTwo = functions.firestore
  .document(`/users/{useruid}`)
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
    console.log(data);
    try {
      await admin.auth().createUser({
        email: data.email,
        emailVerified: false,
        password: Math.random()
          .toString(36)
          .slice(-8),
        displayName: data.displayName,
        photoURL: data.photoURL,
        disabled: false,
        uid: data.id,
      });

      admin.auth().generatePasswordResetLink({
        email: data.email,
      });
    } catch (e) {
      throw e;
    }
  });
