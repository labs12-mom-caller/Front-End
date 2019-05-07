import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import { db } from '../../firebase';

const ContactInfo = ({ contactId }) => {
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
      });
      const callSnaps = await db
        .collection('calls')
        .where('contact_ref', '==', db.doc(`contacts/${contactId}`))
        .get();
      callSnaps.forEach(doc => setCalls(calls => [...calls, doc.data()]));
    };
    fetchData();
  }, [contactId]);

  console.log(calls);

  return (
    <>
      <h2>Review or Update Scheduled Contact Information</h2>
      {contact && <h3>{contact.call_frequency}</h3>}
    </>
  );
};

ContactInfo.propTypes = {
  contactId: PropTypes.string,
};

export default ContactInfo;
