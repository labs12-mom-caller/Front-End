import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { db } from '../../firebase';
import ScheduledBy from '../ContactInfo/ScheduledBy';
import NextCall from '../ContactInfo/NextCall';
import PreviousCalls from '../ContactInfo/PreviousCalls';

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
        id: contactId,
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
    <Container>
      <PreviousCallsContainer>
        <PreviousCalls calls={calls} contact={contact} user={user} />
      </PreviousCallsContainer>
      <ScheduledByContainer>
        <Card>
          <ScheduledBy contact={contact} user={user} />
        </Card>
      </ScheduledByContainer>
      <NextCallContainer>
        <Card>
          <NextCall contact={contact} />
        </Card>
      </NextCallContainer>
    </Container>
  ) : (
    <p>Loading...</p>
  );
};

const Card = styled.div`

  transition: box-shadow .3s;
  width: 100%;
  border-radius: 6px;
   background: #fff;
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
  transition: box-shadow 0.5s;

    header {
      width: 100%
      background-color: #C4C4C4;
    }

    main {
      display: flex;
      justify-content: space-around;
    }

  img {
    max-width: 80px;
    border-radius: 100px;
  }

&:hover {
   box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
}
`;

const PreviousCallsContainer = styled.div`
  grid-row: 2 / -1;
  grid-column: 2 / 5;

  @media (max-width: 900px) {
  grid-row: 7 / 15;
  grid-column: 2 / 9;
}

  header {
      width: 100%
      background-color: #C4C4C4;
      display: flex;
      justify-content: space-around;
    }
  div {
    margin: 10px auto;
  }
`;
const ScheduledByContainer = styled.div`
  grid-row: 2 / -1;
  grid-column: 6 / 11;

  @media (max-width: 900px) {
    grid-row: 2 / -1;
    grid-column: 2 / 9;
  }

  img {
    width: 60px;
    height: 60px;
  }
`;
const NextCallContainer = styled.div`
  grid-row: 2 / -1;
  grid-column: 12 / 15;

  @media (max-width: 900px) {
    grid-row: 2 / -1;
    grid-column: 10 / 15;
  }
`;
const Container = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: repeat(15, 1fr);
`;

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
