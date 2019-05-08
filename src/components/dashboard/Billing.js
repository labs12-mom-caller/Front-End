import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Loading from '../Loading';
import { db } from '../../firebase';

const Billing = ({ user }) => {
  const [stripe, setStripe] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `https://api.stripe.com/v1/customers/${user.stripe_id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
              Authorization: `Bearer ${process.env.REACT_APP_STRIPESECRET}`,
            },
          },
        );
        const data = await response.json();
        const subs = data.subscriptions.data.map(async sub => {
          const contact = await db
            .doc(`/contacts/${sub.metadata.contact_id}`)
            .get();
          const user2 = await contact.data().user2.get();
          const invoicesFetch = await fetch(
            `https://api.stripe.com/v1/invoices?subscription=${sub.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                Authorization: `Bearer ${process.env.REACT_APP_STRIPESECRET}`,
              },
            },
          );
          const invoices = await invoicesFetch.json();
          return {
            contact_id: contact.id,
            user2: user2.data(),
            contact: contact.data(),
            next_charge_date: sub.current_period_end,
            amount: (sub.plan.amount / 100).toFixed(2),
            invoices: invoices.data,
          };
        });
        const results = await Promise.all(subs);
        console.log(results);
        setIsLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [user]);

  return isLoading ? (
    <Loading />
  ) : (
    <>
      <h2>Billing information</h2>
    </>
  );
};

Billing.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
    stripe_id: PropTypes.string,
  }),
};

export default Billing;
