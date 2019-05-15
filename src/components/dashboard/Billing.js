import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import moment from 'moment-timezone';
import styled from 'styled-components';
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
    <Container>
      <Loading />
    </Container>
  ) : (
    <>
      <Header>Billing information</Header>
      <Container>
        {subs ? (
          subs.map(sub => {
            return (
              <BillingCard key={sub.contact_id}>
                <H2>
                  {' '}
                  <Link to={`/contact/${sub.contact_id}`}>
                    {sub.user2.displayName}
                  </Link>{' '}
                  | {sub.contact.call_frequency}
                </H2>
                <Contact>
                  <p>
                    {sub.contact.scheduled_day}s at {sub.contact.scheduled_time}
                  </p>
                </Contact>
                {/* <Link to={`/contact/${sub.contact_id}`}>Contact Details</Link> */}

                <Table>
                  <TableHead>Previous Charges</TableHead>
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
                </Table>
                <P>
                  Next Charge:{' '}
                  {sub.contact.call_frequency === 'Monthly'
                    ? '$2.50 '
                    : '$5.00 '}
                  on {moment(sub.next_charge_date, 'X').format('M/D/YY')}
                </P>
              </BillingCard>
            );
          })
        ) : (
          <h3>You have no previous premium calls scheduled</h3>
        )}
      </Container>
    </>
  );
};
const P = styled.p`
  font-weight: 300;
  font-family: 'Roboto';
  font-size: 1rem;
`;
const Header = styled.h1`
  font-size: 2rem;
  font-family: 'Roboto';
  text-align: center;
  margin-bottom: 15px;
  font-weight: 350;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  justify-items: center;
  grid-gap: 10px;
  margin: 0 auto;
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
const Table = styled.div`
  border-collapse: collapse;

  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    width: 33%;
  }
  tbody {
  }
`;
const H2 = styled.h2`
  font-size: 2rem;
  a {
    color: #083d77;
    text-decoration: underline;
  }
  font-weight: 300;
`;
export const BillingCard = styled.div`
  display: flex;

  justify-content: space-around;
  flex-direction: column;
  transition: box-shadow 0.3s;
  width: 90%;
  height: 250px;
  border-radius: 3px;
  /* overflow: auto; */
  padding: 12px;
  margin-bottom: 20px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;

  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 700px) {
    margin: 10px;
    padding: 10px;
  }
  @media (max-width: 568px) {
    margin-left: 0;
  }
`;
export default Billing;

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
const Contact = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 1.6rem;
  font-family: 'Roboto';
  font-weight: 300;
`;
const TableHead = styled.h2`
  width: 50%;
  margin-bottom: 10px;
  font-family: 'Roboto';
  font-weight: 300;
  font-size: 1.2rem;
`;
