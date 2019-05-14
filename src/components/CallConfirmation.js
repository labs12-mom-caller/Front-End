import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import styled from 'styled-components';
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
    <Wrapper>
      <h2>You&apos;re all set!</h2>
      <p>You&apos;ll receive an email shortly confirming your subscription.</p>
      <div>
        <h3>Call Details</h3>
        <p>Your first call is scheduled for:</p>
        {contact && (
          <>
            <h4>{moment(contact.next_call).format('dddd')}</h4>
            <h5>
              {moment.tz(contact.next_call, contact.timezone).format('MMMM Do')}
            </h5>
            <h5>
              {moment.tz(contact.next_call, contact.timezone).format('h:mm a')}
            </h5>
          </>
        )}
      </div>
      <button type='button' onClick={goToDashboard}>
        Continue to Dashboard
      </button>
    </Wrapper>
  ) : (
    <h2>Loading...</h2>
  );
};

CallConfirmation.propTypes = {
  contactId: PropTypes.string,
  navigate: PropTypes.func,
};

export default CallConfirmation;

const Wrapper = styled.div`
  width: 95%;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  font-family: Roboto, helvetica;
`;
