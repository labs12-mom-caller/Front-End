import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { Link } from '@reach/router';
import styled from 'styled-components';
import { db } from '../../firebase';

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
      <PreviousCalls>
        <h3>Previous Calls</h3>
        {calls.length &&
          calls.map(call => {
            return (
              <Card key={call.id}>
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
              </Card>
            );
          })}
      </PreviousCalls>
      <ScheduledBy>
        <Card>
          <header>
            <h3>Scheduled By</h3>
            <h3>On</h3>
            <h3>With</h3>
          </header>
          <main>
            <div>
              <div>{contact.user1.displayName}</div>{' '}
              <img
                src={contact.user1.photoUrl}
                alt={contact.user1.displayName}
              />{' '}
            </div>
            <div>
              {moment(contact.created_at, 'X')
                .tz(contact.timezone)
                .format('MMMM Do, YYYY')}
            </div>
            <div>
              <div>{contact.user2.displayName}</div>
              <img
                src={
                  contact.user2.photoUrl ||
                  'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
                }
                alt={contact.user2.displayName}
              />
            </div>
          </main>
        </Card>
      </ScheduledBy>
      <NextCall>
        <Card>
          <div>
            <header>
              <h3>Next Call</h3>
            </header>
          </div>
        </Card>
      </NextCall>
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
      background-color: grey;
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

const PreviousCalls = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1;
`;
const ScheduledBy = styled.div`
  grid-row: 2 / -1;
  grid-column: 2;
`;
const NextCall = styled.div`
  grid-row: 2 / -1;
  grid-column: 3;
`;
const Container = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: 1fr 2fr 3fr;
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
