import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate, Link } from '@reach/router';
import { FaArrowLeft } from 'react-icons/fa';
import { db } from '../../firebase';
import { Card } from '../../styles/styledDefaultComponents/ContactInfo';
import ScheduledBy from '../ContactInfo/ScheduledBy';
import NextCall from '../ContactInfo/NextCall';
import PreviousCallsWithContact from '../ContactInfo/PreviousCallsWithContact';
import {
  Aside,
  Button,
  H3,
  Img,
  P,
  User,
  UserInfo,
} from '../../styles/UserCard';
import Loading from '../Loading';
import { formatPhoneNumber } from '../../app/utils';

const ContactInfo = ({ contactId, user }) => {
  const { displayName, photoUrl, uid } = user;
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

  return contact.fetched ? (
    <GridContainer>
      <Aside className='contact-info-user-card'>
        <User>
          <Link to={`/account/${user.uid}`}>
            <Img src={photoUrl} alt={displayName} />
          </Link>
          <UserInfo>
            <H3>{displayName}</H3>
            <P>{user.phoneNumber && formatPhoneNumber(user.phoneNumber)}</P>
            <P>{user.email}</P>
            <Button
              onClick={e => {
                e.preventDefault();
                navigate(`/choose/${uid}`);
              }}
            >
              Add Call
            </Button>
            <Button onClick={() => navigate(`/billing/${uid}`)}>Billing</Button>
            <Button type='button' onClick={() => navigate('/')}>
              <FaArrowLeft className='arrow' /> Back Home
            </Button>
          </UserInfo>
        </User>
      </Aside>

      <Container>
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

        <PreviousCallsWithContactContainer>
          <PreviousCallsWithContact
            calls={calls}
            contact={contact}
            user={user}
          />
        </PreviousCallsWithContactContainer>
      </Container>
    </GridContainer>
  ) : (
    <Loading />
  );
};

export default ContactInfo;

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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;

  @media (max-width: 1025px) {
    grid-template-columns: 0fr;
    grid-template-rows: 1fr 1fr;
    width: 100%;
    justify-items: center;
  }

  .contact-info-user-card {
    @media (max-width: 1025px) {
      grid-row: 1;
      grid-column: 1 / 4;
    }
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  margin: 2rem auto;
  grid-row: 2 / -1;
  grid-column: 2 / 4;

  @media (max-width: 1025px) {
    grid-row: 2;
  }
`;

const ScheduledByContainer = styled.div`
  font-size: 1.5rem;
  width: 50%;
  margin: 2rem auto;
  min-width: 400px;

  @media (max-width: 415px) {
    min-width: auto;
    width: 100%;
  }

  header {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const NextCallContainer = styled.div`
  font-size: 1.5rem;
  width: 50%;
  margin: 2rem auto;
  min-width: 400px;

  @media (max-width: 415px) {
    min-width: auto;
    width: 100%;
  }
`;

const PreviousCallsWithContactContainer = styled.div`
font-size: 1.5rem;
width: 50%;
margin: 2rem auto;
min-width: 400px;


@media (max-width: 415px) {
  min-width: auto;
  width: 100%;
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
