import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { styles } from '../styles/styledDefaultComponents';
import { fetchDoc } from '../app/utils';

const CallConfirmation = ({ contactId, navigate }) => {
  const [contact, setContact] = useState({
    next_call: '',
    timezone: '',
    fetched: false,
  });

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedContact = await fetchDoc(`/contacts/${contactId}`);
        const formatted = moment(fetchedContact.next_call, 'X')
          .tz(fetchedContact.timezone)
          .format();
        console.log(formatted);
        setContact({
          next_call: formatted,
          timezone: fetchedContact.timezone,
          fetched: true,
        });
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [contactId]);

  const goToDashboard = e => {
    e.preventDefault();
    navigate('/');
  };

  return contact.fetched ? (
    <Container>
      <Confirmation>
        <h2 className='heading'>You&apos;re all set!</h2>
        <p>
          You&apos;ll receive an email shortly confirming your subscription.
        </p>
        <CallDetails>
          <h3 className='heading3'>Call Details</h3>
          <p>Your first call is scheduled for:</p>
          {contact && (
            <CallInfo>
              <h4>{moment(contact.next_call).format('dddd')}</h4>
              <h5>
                {moment
                  .tz(contact.next_call, contact.timezone)
                  .format('MMMM Do')}
              </h5>
              <h5>
                {moment
                  .tz(contact.next_call, contact.timezone)
                  .format('h:mm a')}
              </h5>
            </CallInfo>
          )}
        </CallDetails>
        <Button type='button' onClick={goToDashboard}>
          Continue to Dashboard
        </Button>
      </Confirmation>
    </Container>
  ) : (
    <h2>Loading...</h2>
  );
};

CallConfirmation.propTypes = {
  contactId: PropTypes.string,
  navigate: PropTypes.func,
};

export default CallConfirmation;

const Container = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  align-items: center;
  margin-top: 15%;
  @media (min-width: 768px) {
    margin-top: 0;
  }
  @media (min-width: 992px) {
    margin-top: 0;
  }
  @media (min-width: 993px) {
    margin-top: 0;
  }
`;

export const Confirmation = styled.div`
  width: 80%;
  padding: 5%;
  margin: 0 auto;
  margin-bottom: 20px;
  font-family: Roboto, helvetica;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid darkgrey;
  max-height: 80%;
  box-shadow: 1px 1px 15px;
  margin-top: 5%;

  .heading {
    font-size: 3rem;
    font-weight: 500;
    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
    @media (min-width: 992px) {
      font-size: 3.8rem;
    }
  }
  p {
    margin: 5% auto;
    font-size: 2rem;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      font-size: 2.5rem;
    }
  }
`;

const CallDetails = styled.div`
  h3 {
    text-align: center;
    font-size: 2rem;
    font-weight: 500;
    @media (min-width: 768px) {
      font-size: 3rem;
    }
    @media (min-width: 992px) {
      font-size: 3.8rem;
    }
  }
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1.2;
  margin-bottom: 5%;
  h4 {
    font-size: 2rem;
    font-weight: 500;
  }
  h5 {
    font-size: 2rem;
    font-weight: 500;
  }
`;

const Button = styled.button`
  padding: 1.5%;
  background-color: #3b78c6;
  color: white;
  border-radius: 5px;
  margin-top: 2%;
  font-size: 1.4rem;
  &:hover {
    background: white;
    color: ${styles.colors.mainBlue};
  }
  /* @media (min-width: 768px) {
    font-size: 2.5rem;
  }
  @media (min-width: 992px) {
    font-size: 1.5rem;
  } */
`;
