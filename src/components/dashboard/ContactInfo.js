import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from '@reach/router';

import { db } from '../../firebase';

import { ContactInfoPage } from '../../styles/ContactInfoPage';

import Loading from '../Loading';

const ContactInfo = ({ contactId, user }) => {
  const [contact, setContact] = useState({});
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const contactSnap = await db.doc(`contacts/${contactId}`).get();
      const user1Snap = await db
        .doc(`users/${contactSnap.data().user1.id}`)
        .get();
      const user2Snap = await db
        .doc(`users/${contactSnap.data().user2.id}`)
        .get();
      setContact({
        ...contactSnap.data(),
        user1: {
          ...user1Snap.data(),
        },
        user2: {
          ...user2Snap.data(),
        },
        fetched: true,
      });
      const callSnaps = await db
        .collection('calls')
        .where('contact_ref', '==', db.doc(`contacts/${contactId}`))
        .get();
      callSnaps.forEach(doc => {
        const callData = {
          call_duration: doc.data().call_duration,
          call_time: doc.data().call_time,
          id: doc.id,
        };
        setCalls(calls => [...calls, callData]);
      });
    };
    fetchData();
  }, [contactId]);

  console.log(calls);
  return contact.fetched ? (
    <ContactInfoPage>
      <h2>
        Call between {contact.user1.displayName} and {contact.user2.displayName}
      </h2>
      <div className='contact-header'>
        <img src={contact.user1.photoUrl} alt={contact.user1.displayName} />
        <div>
          <div>
            Scheduled by {contact.user1.displayName} on{' '}
            {moment(contact.created_at, 'X')
              .tz(contact.timezone)
              .format('MMMM Do, YYYY')}
          </div>
          <div>
            Next call at{' '}
            {moment(contact.next_call, 'X')
              .tz(contact.timezone)
              .format('h:mm A [on] dddd MMMM Do, YYYY')}
          </div>
          <div>Frequency of Calls: {contact.call_frequency}</div>
          <div>
            Call Schedule:{' '}
            {contact.call_type === 'paid'
              ? `${contact.scheduled_day}s at ${contact.scheduled_time}`
              : 'Random'}
          </div>
        </div>
        <img src={contact.user2.photoUrl} alt={contact.user2.displayName} />
      </div>
      <div>
        <h3>Previous Calls</h3>
        {calls.length &&
          calls.map(call => {
            return (
              <div key={call.id}>
                <div>
                  Call on{' '}
                  {moment(call.call_time, 'X')
                    .tz(contact.timezone)
                    .format('MMMM Do, YYY [at] h:mm A')}
                </div>
                <div>Call duration: {call.call_duration} seconds</div>
                <Link to={`/prev-calls/${user.uid}/${call.id}`}>
                  Review Call
                </Link>
              </div>
            );
          })}
      </div>
    </ContactInfoPage>
  ) : (
    <Loading />
  );
};

ContactInfo.propTypes = {
  contactId: PropTypes.string,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

export default ContactInfo;
