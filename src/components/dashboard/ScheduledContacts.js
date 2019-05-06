/* eslint-disable no-inner-declarations */
import React from 'react';
import moment from 'moment-timezone';
import { db } from '../../firebase';

const ScheduledContacts = ({ user }) => {
  const [contact, setContact] = React.useState([]);
  const [assignContact, setAssignContact] = React.useState([]);
  // const [callInfo, setCallInfo] = React.useState(null);
  const { uid } = user;

  React.useEffect(() => {
    const fetchData = async () => {
      const user = await db.collection('users').doc(uid);
      const userContacts = await db
        .collection('contacts')
        .where('user1', '==', user)
        .get();
      // console.log(userContacts.docs[0].id, 'from useEffect');
      userContacts.forEach(doc => {
        console.log(doc, 'inside foreach');
      });
      setContact({ userContacts });
    };
    fetchData();
  }, [user]);

  // console.log(contact);

  // React.useEffect(() => {
  //   const UserContact = async () => {
  //     return db
  //       .doc(`contacts/${contact.userContacts.doc.id}`)
  //       .onSnapshot(document => {
  //         setAssignContact({
  //           ...document.data(),
  //           user2: document.user2,
  //           next_call: document.next_call,
  //         });
  //       });
  //   };
  // }, []);

  // console.log(assignContact);

  if (!contact) return <p>Loading...</p>;
  if (!assignContact) return <p>Failed to retrieve your contacts...</p>;

  return (
    <>
      <h2>List of your contacts</h2>
      {/* {console.log(contact, 'from return')} */}
      {contact &&
        contact.map(contact => (
          <div key={contact.user1}>
            {/* <h3>Call with {contact.user2.displayName}</h3> */}
            <h3>At {contact.next_call}</h3>
          </div>
        ))}
    </>
  );
};

export default ScheduledContacts;
