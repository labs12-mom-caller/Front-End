import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import ModalPhoneNumber from './ModalPhoneNumber';
import UpcomingCalls from './UpcomingCalls';
import RecentTranscripts from './RecentTranscripts';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  WelcomeUser,
  ProfileWrapper,
} from '../styles/Dashboard';

const isMobile = window.innerWidth <= 768;

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
      <h2 style={{ textAlign: 'center' }}>Upcoming Calls</h2>
      {calls.map(call => (
        <UpcomingCalls key={call.id} call={call} />
      ))}
    </div>
  );
}
function TranscriptList() {
  return (
    <div>
      <h2 style={{ textAlign: 'center', width: '80%' }}>Recent transcripts</h2>
      {transcripts.map(transcript => (
        <RecentTranscripts key={transcript.id} transcripts={transcript} />
      ))}
    </div>
  );
}

const DashMain = ({ user }) => {
  const { displayName, photoUrl, uid } = user;
  return (
    <Wrapper>
      <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}>
        <ProfileWrapper>
          <WelcomeUser>Hello {displayName} </WelcomeUser>
          <ProfileImage src={`${photoUrl}`} alt='ProfilePic' />
          <UpdateAccount
            user={user}
            onClick={() => navigate(`/account/${uid}`)}
          >
            Update Account
          </UpdateAccount>
        </ProfileWrapper>
        {/* Calls Components */}
        {isMobile ? null : ContactList()}
        {/* {isMobile ? null : TranscriptList()} */}
        {/* <RecentTranscripts transcripts={transcripts} /> */}
      </div>
      {isMobile ? null : TranscriptList()}
      <ModalPhoneNumber user={user} />

      {/* Conditional render menu buttons */}
      {/* {isMobile ? (
          <DashboardButtons>
            <DefaultButtonBlueBG type='button'>New Call </DefaultButtonBlueBG>
            <DefaultButtonBlueBG type='button'>
              Scheduled Calls
            </DefaultButtonBlueBG>
            <DefaultButtonBlueBG type='button'>
              Previous Calls{' '}
            </DefaultButtonBlueBG>
          </DashboardButtons>
        ) : null} */}
    </Wrapper>
  );
};

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
