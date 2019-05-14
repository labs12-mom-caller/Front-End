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

app.post('/newsubscription', (req, res) => {});

exports.handler = app;
