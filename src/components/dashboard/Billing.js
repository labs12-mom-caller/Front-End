import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import moment from 'moment-timezone';
import styled from 'styled-components';
import axios from 'axios';
import { FaArrowLeft } from 'react-icons/fa';

import Loading from '../Loading';

import {
  Aside,
  User,
  Img,
  UserInfo,
  H3,
  Button,
  P,
} from '../../styles/UserCard';

import { formatPhoneNumber } from '../../app/utils';

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

  return (
    <Container>
      <Aside>
        <User>
          <Link to='/'>
            <Img src={user.photoUrl} alt={user.displayName} />
          </Link>
          <UserInfo>
            <H3>{user.displayName}</H3>
            <P>{formatPhoneNumber(user.phoneNumber)}</P>
            <P>{user.email}</P>
            <Button type='button' onClick={() => navigate('/')}>
              <FaArrowLeft className='arrow' /> Back Home
            </Button>
          </UserInfo>
        </User>
      </Aside>
      <BillingInformationBox>
        <Wrapper>
          <Header>Billing information</Header>
          {isLoading ? (
            <Loading />
          ) : (
            <BillingContainer>
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
                          {sub.contact.scheduled_day}s at{' '}
                          {sub.contact.scheduled_time}
                        </p>
                      </Contact>
                      <Table>
                        <TableHead>Previous Charges</TableHead>
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
                                  {moment(invoice.paid_at, 'X').format(
                                    'MM/DD/YY',
                                  )}
                                </td>
                                <td>
                                  ${(invoice.amount_paid / 100).toFixed(2)}
                                </td>
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
            </BillingContainer>
          )}
        </Wrapper>
      </BillingInformationBox>
    </Container>
  );
};

const Header = styled.h1`
  color: #999999;
  margin-bottom: 20px;
  font-size: 2.6rem;
  text-align: left;
  align-self: stretch;
`;

const BillingContainer = styled.div`
  // width: 100%;
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 40%;
  th,
  td {
    border: 1px solid #ddd;
    padding: 8px;
    width: 33%;
    font-size: 1.5rem;
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
const TableHead = styled.caption`
  width: 50%;
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 1.5rem;
  text-align: left;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  font-size: 1.5rem;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'aside'
      'upcoming'
      'previous';
    place-items: center;
  }
`;

const BillingInformationBox = styled.main`
  grid-row: 2 / -1;
  grid-column: 2 / 4;
  margin-bottom: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  @media (max-width: 1025px) {
    grid-row: 2;
    grid-area: record;
    width: 95%;
    justify-content: center;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1025px) {
    width: 95%;
    align-items: center;
  }
`;
