import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { fetchDoc } from '../app/utils';

const CallConfirmation = ({ contactId, navigate }) => {
  const [contact, setContact] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const fetchedContact = await fetchDoc(`/contacts/${contactId}`);
        const formatted = moment(fetchedContact.next_call).format();
        setContact(formatted);
        setUser(fetchedContact.user1.id);
      } catch (err) {
        console.log(err);
      }
    };
    getData();
  }, [contactId]);

  const goToDashboard = e => {
    e.preventDefault();
    navigate(`/user/${user}`);
  };

  return (
    <>
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
    </>
  );
};

CallConfirmation.propTypes = {
  contactId: PropTypes.string,
  navigate: PropTypes.func,
};

export default CallConfirmation;
