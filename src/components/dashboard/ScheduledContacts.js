/* eslint-disable no-inner-declarations */
import React from 'react';
import moment from 'moment-timezone';
import { db } from '../../firebase';

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = React.useState([]);

  const { uid } = user;

  React.useEffect(() => {
    // console.log('in use effect');
    const fetchData = async () => {
      // console.log('fetch data');
      try {
        const userContacts = await db
          .collection('contacts')
          .where('user1', '==', db.doc(`users/${uid}`))
          .get();
        // console.log(uid);
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
            // console.log(contact, 'forEach');
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
  }, [user]);
  console.log(contacts);

  return (
    contacts &&
    contacts.map((c, index) => {
      return (
        <div key={index}>
          <p>{c.user2.displayName}</p>
          <p>
            {moment(c.next_call, 'X')
              .tz(c.time_zone)
              .format('h:mm A [on] dddd MMMM Do, YYYY')}
          </p>
        </div>
      );
    })
  );
};
export default ScheduledContacts;
