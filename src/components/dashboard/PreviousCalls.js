import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

import { db } from '../../firebase';

const PreviousCalls = ({ userId }) => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await db.collection('users').doc(userId);
      const userContacts = await db
        .collection('contacts')
        .where('user1', '==', user)
        .get();

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

  return (
    <>
      <h2>List of previously recorded calls</h2>
      {calls &&
        calls.map(call => (
          <div key={call.callId}>
            <h3>Call with {call.user2.displayName}</h3>
            <p>{moment(call.call_time).format('dddd, MMMM Do [at] h:mm A')}</p>
            <p>Call duration: {call.call_duration} seconds</p>
            <p>Listen to call</p>
            <audio controls>
              <source src={call.audio} type='audio/wav' />
              <track
                src='transcription.vtt'
                kind='transcription'
                srcLang='en'
                label='English'
              />
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
