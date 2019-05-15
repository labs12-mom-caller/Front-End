const functions = require('firebase-functions');
const admin = require('firebase-admin');
const sgMail = require('@sendgrid/mail');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.secret);

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

const app = express();

app.use(express.json());
app.use(cors({ origin: true }));

app.post('/newcustomer', (req, res) => {
  if (!req.body.email || !req.body.displayName) {
    res.status(406).json({ message: 'Requires email and displayName' });
    return;
  }

  stripe.customers.create(
    {
      email: req.body.email,
      name: req.body.displayName,
    },
    (err, customer) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Error creating the new customer' });
      } else {
        res.status(201).json({ stripe_id: customer.id });
      }
    },
  );
});

app.post('/newsubscription', (req, res) => {
  if (!req.body.stripeId || !req.body.tokenId || !req.body.planId) {
    res
      .status(406)
      .json({ message: 'Requires customer stripeId, tokenId, and planId' });
    return;
  }

  stripe.customers.update(
    req.body.stripeId,
    { source: req.body.tokenId },
    (err, customer) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Error setting payment source for customer' });
      } else {
        stripe.subscriptions.create(
          {
            customer: req.body.stripeId,
            items: [
              {
                plan: req.body.planId,
              },
            ],
          },
          (err, subscription) => {
            if (err) {
              console.log(err);
              res
                .status(500)
                .json({ message: 'Error creating new subscription' });
            } else {
              res
                .status(201)
                .json({ status: subscription.status, id: subscription.id });
            }
          },
        );
      }
    },
  );
});

app.put('/newsubscription/:subId', (req, res) => {
  if (!req.body.contactId) {
    res.status(406).json({ message: 'Need contactid' });
    return;
  }
  stripe.subscriptions.update(
    req.params.subId,
    {
      metadata: { contact_id: req.body.contactId },
    },
    (err, subscription) => {
      if (err) {
        console.log(err);
        res
          .status(500)
          .json({ message: 'Error updating subscription with contact id' });
      } else {
        res.status(200).json({
          message: 'Successfully updated subscription with contact id',
        });
      }
    },
  );
});

app.get('/billing/:stripeId', async (req, res) => {
  res.set('Access-Control-Allow-Origin', '*');
  stripe.customers.retrieve(req.params.stripeId, async (err, customer) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: 'error retrieving customer' });
    } else {
      const subs = customer.subscriptions.data.map(async sub => {
        const contact = await firestore
          .doc(`contacts/${sub.metadata.contact_id}`)
          .get();
        const user2 = await contact.data().user2.get();
        let result = {
          contact_id: contact.id,
          user2: user2.data(),
          contact: contact.data(),
          next_charge_date: sub.current_period_end,
          amount: sub.plan.amount,
          invoices: [],
        };
        stripe.invoices.list(
          {
            subscription: sub.id,
          },
          (err, invoices) => {
            if (err) {
              console.log(err);
              res.status(500).json({
                message: `Error retrieving invoices for subscription ${sub.id}`,
              });
            } else {
              const invoiceData = invoices.data.map(invoice => {
                return {
                  id: invoice.id,
                  paid_at: invoice.status_transitions.paid_at,
                  amount_paid: invoice.amount_paid,
                  hosted_invoice_url: invoice.hosted_invoice_url,
                };
              });
              result = {
                ...result,
                invoices: invoiceData,
              };
            }
          },
        );
        return result;
      });

      const results = await Promise.all(subs);
      res.status(200).json(results);
    }
  });
});

exports.stripe = functions.https.onRequest(app);
