import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { db } from '../../firebase';
import ScheduledCall from '../ContactInfo/ScheduledCall';
import NextCall from '../ContactInfo/NextCall';

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
    <Container>
      <PreviousCallsContainer>
        <header>
          <h3>Previous Calls</h3>
        </header>

        {calls.length > 0 ? (
          calls.map(call => {
            return (
              <Card key={call.id}>
                <h2>
                  {moment(call.call_time, 'X')
                    .tz(contact.timezone)
                    .format('MMMM Do, YY [at] h:mm A')}
                </h2>
                <div>Call duration: {call.call_duration} seconds</div>
                <Link to={`/prev-calls/${user.uid}/${call.id}`}>
                  Review Call
                </Link>
              </Card>
            );
          })
        ) : (
          <Card>
            <p>You have no previous calls with this contact</p>
          </Card>
        )}
      </PreviousCallsContainer>
      <ScheduledByContainer>
        <Card>
          <ScheduledCall contact={contact} />
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
      display: flex;
      justify-content: space-around;
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

const PreviousCallsContainer = styled.aside`
  grid-row: 2 / -1;
  grid-column: 2 / 5;
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
  img {
    width: 60px;
    height: 60px;
  }
`;
const NextCallContainer = styled.div`
  grid-row: 2 / -1;
  grid-column: 12 / 15;
`;
const Container = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: repeat(15, 1fr);
  grid-template-rows: 70px 1fr;
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
