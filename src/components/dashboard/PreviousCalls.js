import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from '@reach/router';
import { db } from '../../firebase';

const PreviousCalls = ({ userId }) => {
  const [calls, setCalls] = useState([]);
  console.log(calls, 'CALLS');
  useEffect(() => {
    const fetchData = async () => {
      const user = await db.collection('users').doc(userId);
      const userContacts = await db
        .collection('contacts')
        .where('user1', '==', user)
        .get();
      console.log(userContacts, 'userContacts');
      await userContacts.forEach(async doc => {
        const allCalls = await db
          .collection('calls')
          .where('contact_ref', '==', doc.ref)
          .get();
        if (!allCalls.empty) {
          allCalls.forEach(async doc => {
            const callData = {
              callId: doc.id,
              user2: {},
              contactId: '',
              audio: doc.data().audio,
              call_duration: doc.data().call_duration,
              call_time: moment(doc.data().call_time.toDate()).format(),
            };
            const contactRef = doc.data().contact_ref.path;
            await db.doc(contactRef).onSnapshot(async doc => {
              callData.contactId = doc.id;
              await db.doc(doc.data().user2.path).onSnapshot(doc => {
                callData.user2 = {
                  displayName: doc.data().displayName,
                  email: doc.data().email,
                };
                setCalls(c => [...c, callData]);
              });
            });
          });
        }
      });
    };
    fetchData();
  }, [userId]);

  if (calls.empty) return <p>No Calls Available...</p>;

  return (
    <>
      <h2>List of previously recorded calls</h2>
      {calls &&
        calls.map(call => (
          <div key={call.callId}>
            <Link to={`${call.callId}`}>View Call</Link>
            <h3>Call with {call.user2.displayName}</h3>
            <p>{moment(call.call_time).format('dddd, MMMM Do [at] h:mm A')}</p>
            <p>Call duration: {call.call_duration} seconds</p>
            <p>Listen to call</p>
            {/* eslint-disable jsx-a11y/media-has-caption */}
            <audio controls>
              <source src={call.audio} type='audio/wav' />
              <track />
              Your browser does not support the audio element
            </audio>
          </div>
        ))}
    </>
  );
};

PreviousCalls.propTypes = {
  userId: PropTypes.string,
};

export default PreviousCalls;
