import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import Navbar from './NavBar';
import ModalPhoneNumber from './ModalPhoneNumber';
import UpcomingCalls from './UpcomingCalls';
import RecentTranscripts from './RecentTranscripts';

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

function ContactList() {
  return (
    <div>
      <h2>Upcoming Calls</h2>
      {calls.map(call => (
        <UpcomingCalls key={call.id} call={call} />
      ))}
    </div>
  );
}
function TranscriptList() {
  return (
    <div>
      <h2>Recent transcripts</h2>
      {transcripts.map(transcript => (
        <RecentTranscripts key={transcript.id} transcripts={transcript} />
      ))}
    </div>
  );
}
// <div>
//   <div>
//     {/* <img src={`${photoUrl}`} alt='ProfilePic' /> */}
//   </div>
// </div>
// f.value = f_val.slice(0,3)+"-"+f_val.slice(3,6)+"-"+f_val.slice(6);
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
          <h3>{displayName}</h3>
          <p>{formatPhoneNumber(user.phoneNumber)}</p>
          <p>{user.email}</p>
        </User>
      </Aside>
      <Upcoming>Michael</Upcoming>
      <Previous>Checo</Previous>
      <ModalPhoneNumber user={user} />
    </Container>
  );
};
const User = styled.div`
  border: 3px solid #999999;
`;
const Aside = styled.aside`
  border: 1px solid #000000;
  grid-row: 2 / -1;
  grid-column: 1;
`;
const Img = styled.img`
  border-radius: 50%;
  border: 1px solid #999999;
`;
const Upcoming = styled.div`
  border: 1px solid #000000;
  grid-row: 2 / -1;
  grid-column: 2;
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
