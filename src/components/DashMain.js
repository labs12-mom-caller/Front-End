import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import Navbar from './NavBar';
import ModalPhoneNumber from './ModalPhoneNumber';
import RecentTranscripts from './RecentTranscripts';
import ScheduledContacts from './dashboard/ScheduledContacts';

const calls = [
  {
    id: 1,
    contactName: 'Shawn',
    callDate: 'June 6',
    callTime: '11:00 AM',
  },
  {
    id: 2,
    contactName: 'Michael',
    callDate: 'July 10',
    callTime: '2:30 PM',
  },
];
const transcripts = [
  {
    id: 1,
    contactName: 'Shawn',
    transcript:
      'Another big problem in the speech analytics space when customers first bring a software on is that they are   ',
    photoUrl:
      'https://images.pexels.com/photos/428361/pexels-photo-428361.jpeg?cs=srgb&dl=adult-blur-boy-428361.jpg&fm=jpg',
  },
  {
    id: 2,
    contactName: 'Jenny',
    transcript:
      'con manolo bueno manolo ya está en su último año de universidades boston grado el próximo año y yo siempre  ',
    photoUrl:
      'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?cs=srgb&dl=attractive-beautiful-beauty-1542085.jpg&fm=jpg',
  },
];

function TranscriptList() {
  return (
    <>
      <h2>Recent transcripts</h2>
      {transcripts.map(transcript => (
        <>
          <RecentTranscripts key={transcript.id} transcripts={transcript} />
        </>
      ))}
    </>
  );
}

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
  console.log(user, 'dash');
  const { displayName, photoUrl, uid } = user;
  return (
    <Container>
      <Navbar user={user} />
      <Aside>
        <User>
          <Img src={photoUrl} alt={displayName} />
          <UserInfo>
            <H3>{displayName}</H3>
            <P>{formatPhoneNumber(user.phoneNumber)}</P>
            <P>{user.email}</P>
            <Button>Add Call</Button>
          </UserInfo>
        </User>
      </Aside>
      <Upcoming>
        <Wrapper>
          <CardHeader>Upcoming Calls</CardHeader>
          <Card>
            <ScheduledContacts user={user} />
          </Card>
        </Wrapper>
      </Upcoming>
      <Previous>Checo</Previous>
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
  margin-top: 40px;
`;
const Card = styled.div`

    transition: box-shadow .3s;
  width: 320px;
  height: 475px;
  border-radius: 6px;
   background: #fff;
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
  transition: box-shadow 0.5s;
}
&:hover {
   box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
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
  height: 100%;
`;
const Aside = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1;
`;
const Img = styled.img`
  border-radius: 50%;
  height: auto;
  margin-top: 35px;
  width: 80%;
  border: 3px solid #999999;
`;
const Upcoming = styled.div`
  grid-row: 2 / -1;
  grid-column: 2;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
`;
const Previous = styled.div`
  border: 1px solid #000000;
  grid-row: 2 / -1;
  grid-column: 3;
`;
const Container = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: 1fr 2fr 3fr;
  grid-template-rows: 70px 1fr;
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
