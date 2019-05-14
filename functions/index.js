const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');

const caller = require('./tasks/caller.js');
const fetch = require('./tasks/twilioFetch.js');
const contactEmail = require('./tasks/contactEmail.js');
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
  .onCreate(async (snapshot, context) => {
    const data = snapshot.data();
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
        uid: snapshot.id,
      });

      const passwordLink = await admin
        .auth()
        .generatePasswordResetLink(data.email);
      console.log(passwordLink);
      const msg = {
        personalizations: [
          {
            to: [
              {
                email: data.email,
                name: data.displayName,
              },
            ],
            dynamic_template_data: {
              url: passwordLink,
            },
            subject: 'A friend or loved one has signed you up for ReCaller!',
          },
        ],
        from: {
          email: 'labsrecaller@gmail.com',
          name: 'ReCaller Team',
        },
        reply_to: {
          email: 'labsrecaller@gmail.com',
          name: 'ReCaller',
        },
        template_id: 'd-6077c121962b439f983a559b6f3a57f8',
      };
      sgMail.send(msg);
    } catch (e) {
      throw e;
    }
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
