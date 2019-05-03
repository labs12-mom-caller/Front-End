import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import ModalPhoneNumber from './ModalPhoneNumber';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  WelcomeUser,
  ProfileWrapper,
} from '../styles/Dashboard';
import UpcomingCalls from './UpcomingCalls';
import RecentTranscripts from './RecentTranscripts';

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

const DashBoard = ({ user }) => {
  console.log(user, 'From Dashboard');
  const { displayName, photoUrl, uid } = user;
  return (
    <div>
      {/* <NavBar user={user} /> */}
      <Wrapper>
        <div
          style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}
        >
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

      <div>
        <Footer>
          <SectionLeft className='sectionLeft' style={{}}>
            <p style={{ color: 'white' }}>
              We believe in connecting friends and family by offering scheduled
              calls and call transcription. Always remember the things you’ve
              talked about with your loved ones. We are ReCaller.
            </p>
            <span style={{ color: 'white' }}>
              &copy; {new Date().getFullYear()}
              <a href='/' style={{ color: 'white' }}>
                {' '}
                ReCaller{' '}
              </a>
            </span>{' '}
          </SectionLeft>
          <SectionRight>
            <ul>
              <li className='list' style={{ color: '#6B6D76' }}>
                <a style={{ color: '#FF6F61' }} href='/'>
                  Dashboard
                </a>
              </li>
              <li className='list' style={{ color: '#6B6D76' }}>
                <a style={{ color: '#FF6F61' }} href='#!'>
                  Add New Call
                </a>
              </li>
              <li className='list' style={{ color: '#6B6D76' }}>
                <a style={{ color: '#FF6F61' }} href='#!'>
                  Review Calls
                </a>
              </li>
              <li className='list' style={{ color: '#6B6D76' }}>
                <a style={{ color: '#FF6F61' }} href='#!'>
                  Previous Calls
                </a>
              </li>
              <li className='list' style={{ color: '#6B6D76' }}>
                <a style={{ color: '#FF6F61' }} href='/about-us'>
                  Our Team
                </a>
              </li>
            </ul>
          </SectionRight>
        </Footer>
      </div>
    </div>
  );
};

DashBoard.propTypes = {
  user: PropTypes.object,
};

export default DashBoard;
DashBoard.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

const Footer = styled.div`
  display: flex;
  background-color: #083d77;
  /* height: 250px; */
  height: 17%;

  @media (max-width: 992px) {
    margin-top: 40%;
  }
`;
const SectionLeft = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 2%;
  width: 48%;

  @media (max-width: 992px) {
    p {
      padding: 5px;
      font-size: 12px;
    }
    span {
      text-align: center;
      margin-left: 5%;
    }
  }
`;
const SectionRight = styled.div`
  /* align-self: flex-end; */
  margin-left: 4%;
  margin-top: 2.6%;
  width: 40%;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;
  @media (max-width: 992px) {
    padding: 5px;
    margin-top: 8%;
    margin-right: 2%;
    font-size: 15px;
    line-height: 1.5;
  }
`;
