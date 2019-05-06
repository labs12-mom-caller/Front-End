import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { db } from '../../firebase';

const ScheduledContacts = ({ user }) => {
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    const { uid } = user;
    // console.log(uid, 'from contacts');

    const fetchData = async () => {
      const user = await db.collection('users').doc(uid);
      const userContacts = await db
        .collection('contacts')
        .where('user1', '==', user)
        .get();
      // console.log(userContacts.docs[0].id, 'from useEffect');

      await userContacts.forEach(async doc => {
        const allContacts = await db
          .collection('contacts')
          .where(`${userContacts.docs.id}`, '==', `${user.uid}`)
          .get();

          console.log(userContacts, "from contacts")

        if (!allContacts.empty) {
          allContacts.forEach(async doc => {
            const contactData = {
              // callId: doc.id,
              // user2: {},
              // contactId: '',
              // audio: doc.data().audio,
              // call_duration: doc.data().call_duration,
              // call_time: moment(doc.data().call_time.toDate()).format(),
              user2: {},
              next_call: moment(doc.data().call_time.toDate()).format(),

            };
            const contactRef = doc.data().userContacts.docs.id.path;
            await db.doc(contactRef).onSnapshot(async doc => {
              contactData.user2 = doc.data().user2;
              await db.doc(doc.data().user2.path).onSnapshot(doc => {
                contactData.user2 = {
                  displayName: doc.data().displayName
                };
                setContacts(c => [...c, contactData]);
              });
            });
          });
        }
      });
    };
    fetchData();
  }, [user]);

  return (
    <>
      <h2>List of your contacts</h2>
      {console.log(contacts, 'from return')}
      {contacts &&
        contacts.map(contact => (
          <div key={contact.user1}>
            {/* <h3>Call with {contact.user2.displayName}</h3> */}
            <h3>At {contact.next_call}</h3>
          </div>
        ))}
    </>
  );
};

export default ScheduledContacts;
