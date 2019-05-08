/* eslint-disable no-inner-declarations */
import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { db } from '../../firebase';

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = React.useState([]);
  const { uid } = user;

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const userContacts = await db
          .collection('contacts')
          .where('user1', '==', db.doc(`users/${uid}`))
          .get();
        userContacts.forEach(async doc => {
          try {
            const user2Snap = await db
              .doc(`users/${doc.data().user2.id}`)
              .get();
            const contact = {
              user2: {
                ...user2Snap.data(),
                id: user2Snap.id,
              },
              call_frequency: doc.data().call_frequency,
              next_call: doc.data().next_call,
              time_zone: doc.data().timezone,
              id: doc.id,
            };
            setContacts(contacts => [...contacts, contact]);
          } catch (err) {
            console.log(err);
          }
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [uid]);

  return (
    <>
      <div style={{ display: 'flex' }}>
        <div>Name</div>
        <div>Time</div>
        <div>Date</div>
      </div>
      {contacts &&
        contacts.map(c => {
          return (
            <Link to={`/contact/${c.id}`} key={c.id}>
              <div style={{ display: 'flex' }}>
                <div>{c.user2.displayName}</div>
                <div>
                  {moment(c.next_call, 'X')
                    .tz(c.time_zone)
                    .format(`h:mm A`)}
                </div>
                <div>
                  {moment(c.next_call, 'X')
                    .tz(c.time_zone)
                    .format(`MMMM Do, YYYY`)}
                </div>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default ScheduledContacts;

ScheduledContacts.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
