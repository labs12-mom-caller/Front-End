const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const stripe = require('stripe')(functions.config().stripe.secret);

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

exports.handler = app;
