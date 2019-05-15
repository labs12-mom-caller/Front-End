import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import ModalPhoneNumber from './ModalPhoneNumber';
import PreviousCalls from './dashboard/PreviousCalls';
import ScheduledContacts from './dashboard/ScheduledContacts';

function formatPhoneNumber(number) {
  const numberCopy = [...number];
  const digitsOnly = numberCopy.slice(2);
  const withDashes = `${digitsOnly.slice(0, 3)}-${digitsOnly.slice(
    3,
    6,
  )}-${digitsOnly.slice(6)}`;
  const formatted = [...withDashes];
  const phoneNumber = formatted.filter(n => n !== ',');
  phoneNumber.join('');
  return phoneNumber;
}

const DashMain = ({ user }) => {
  const { displayName, photoUrl, uid } = user;
  return (
    <Container>
      <Aside>
        <User>
          <Img src={photoUrl} alt={displayName} />
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
          </UserInfo>
        </User>
      </Aside>

      <Upcoming>
        <Wrapper>
          <CardHeader>Your Contacts</CardHeader>
          <UpcomingCard>
            <ScheduledContacts user={user} />
          </UpcomingCard>
        </Wrapper>
      </Upcoming>

      <Previous>
        <PrevWrapper>
          <CardHeader>Previous Calls</CardHeader>
          <PreviousCard>
            <PreviousCalls userId={user.uid} />
          </PreviousCard>
        </PrevWrapper>
      </Previous>

      <ModalPhoneNumber user={user} />
    </Container>
  );
};
const CardHeader = styled.h2`
  color: #999999;
  margin-bottom: 20px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const Wrapper = styled.div`
  width: 90%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1025px) {
    width: 95%;
    align-items: center;
  }
`;
const PrevWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @media (max-width: 1025px) {
    margin: 10px auto;
    align-items: center;
    width: 100%;
  }
`;
const UpcomingCard = styled.div`
  transition: box-shadow 0.3s;
  height: 400px;
  overflow: scroll;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 1025px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const PreviousCard = styled.div`
  transition: box-shadow 0.3s;
  width: 95%;
  height: 400px;
  overflow: scroll;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }
  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  &:nth-child(2) {
    margin-top: 0;
    margin-bottom: 15px;
  }

  @media (max-width: 1025px) {
    width: 100%;
  }
`;

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  margin-top: 15px;
  width: 80%;
  padding: 2px;
  justify-content: center;
  align-items: center;
  h3 {
    margin-bottom: 17px;
  }
  p {
    margin-bottom: 17px;
  }
  button {
    margin-top: 15px;
  }
`;
const H3 = styled.h3`
  color: #999999;
  font-size: 19px;
`;

const Button = styled.button`
  background-color: #636578;
  width: 157px;
  height: 43px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
  transition: all 0.4s ease;
  outline: 0;
  &:hover {
    background-color: #ffffff;
    color: #636578;
    border: 1px solid #636578;
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;

const P = styled.p`
  color: #999999;
  font-size: 19px;
`;

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 5px;
`;

const Aside = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1;

  @media (max-width: 1025px) {
    grid-area: aside;
  }
`;
const Img = styled.img`
  border-radius: 50%;
  height: auto;
  margin-top: 35px;
  width: 80%;

  @media (max-width: 1025px) {
    max-width: 300px;
  }
`;
const Upcoming = styled.div`
  grid-row: 2 / -1;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1025px) {
    grid-area: upcoming;
    width: 95%;
    justify-content: center;
  }
`;
const Previous = styled.div`
  grid-row: 2 / -1;
  grid-column: 3;

  @media (max-width: 1025px) {
    grid-area: previous;
    display: flex;
    flex-direction: column;
    width: 95%;
    justify-content: center;
  }
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;
  font-size: 1.5rem;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr 1fr;
    grid-template-areas:
      'aside'
      'upcoming'
      'previous';
    place-items: center;
  }
`;
DashMain.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

export default DashMain;
