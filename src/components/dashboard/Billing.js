import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import moment from 'moment-timezone';
import styled from 'styled-components';
import axios from 'axios';
import Loading from '../Loading';

const Billing = ({ user }) => {
  const [subs, setSubs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://us-central1-recaller-14a1f.cloudfunctions.net/stripe/billing/${
            user.stripe_id
          }`,
        );
        setSubs(subs => response.data);
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
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Amount</th>
                        <th>Receipt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sub.invoices.map(invoice => {
                        return (
                          <tr key={invoice.id}>
                            <td>
                              {moment(invoice.paid_at, 'X').format('MM/DD/YY')}
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
