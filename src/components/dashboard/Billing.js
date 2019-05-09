import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import moment from 'moment-timezone';

import Loading from '../Loading';
import { db } from '../../firebase';

const Billing = ({ user }) => {
  const [subs, setSubs] = useState([]);
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
            contact: { ...contact.data(), id: contact.id },
            next_charge_date: sub.current_period_end,
            amount: sub.plan.amount,
            invoices: invoices.data,
          };
        });
        const results = await Promise.all(subs);
        setSubs(s => results);
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
      {subs ? (
        subs.map(sub => {
          return (
            <div key={sub.contact_id}>
              <h3>Call with {sub.user2.displayName}</h3>
              <p>
                {sub.contact.scheduled_day}s at {sub.contact.scheduled_time}
              </p>
              <Link to={`/contact/${sub.contact_id}`}>Contact Details</Link>
              <p>Plan: {sub.contact.call_frequency}</p>
              <p>
                Next Charge:{' '}
                {sub.contact.call_frequency === 'Monthly' ? '$2.50 ' : '$5.00 '}
                on {moment(sub.next_charge_date, 'X').format('M/D/YY')}
              </p>
              <table>
                <thead>
                  <tr>
                    <th>Previous Charges</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>Date</th>
                    <th>Amount</th>
                    <th>Receipt</th>
                  </tr>
                  {sub.invoices.map(invoice => {
                    return (
                      <tr key={invoice.id}>
                        <td>
                          {moment(
                            invoice.status_transitions.paid_at,
                            'X',
                          ).format('MM/DD/YY')}
                        </td>
                        <td>${(invoice.amount_paid / 100).toFixed(2)}</td>
                        <td>
                          <a
                            href={invoice.hosted_invoice_url}
                            target='_blank'
                            rel='noopener noreferrer'
                          >
                            Receipt
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          );
        })
      ) : (
        <h3>You have no previous premium calls scheduled</h3>
      )}
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
