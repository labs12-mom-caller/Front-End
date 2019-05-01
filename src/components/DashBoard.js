import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import NavBar from './NavBar';
import ModalPhoneNumber from './ModalPhoneNumber';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  DashboardButtons,
  WelcomeUser,
  ProfileWrapper,
} from '../styles/Dashboard';
import { DefaultButtonBlueBG } from '../styles/styledDefaultComponents';
import UpcomingCalls from './UpcomingCalls';

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

const DashBoard = ({ user }) => {
  console.log(user);
  const { displayName, photoUrl } = user;
  return (
    <div>
      <NavBar user={user} />
      <Wrapper>
        <div
          style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%' }}
        >
          <ProfileWrapper>
            <WelcomeUser>Hello {displayName} </WelcomeUser>
            <ProfileImage src={`${photoUrl}`} alt='ProfilePic' />
            <UpdateAccount>Update Account</UpdateAccount>
          </ProfileWrapper>
          {isMobile ? null : ContactList()}
        </div>
        <ModalPhoneNumber user={user} />

        {/* Conditional render menu buttons */}
        {isMobile ? (
          <DashboardButtons>
            <DefaultButtonBlueBG type='button'>New Call </DefaultButtonBlueBG>
            <DefaultButtonBlueBG type='button'>
              Scheduled Calls
            </DefaultButtonBlueBG>
            <DefaultButtonBlueBG type='button'>
              Previous Calls{' '}
            </DefaultButtonBlueBG>
          </DashboardButtons>
        ) : null}
      </Wrapper>

      {/* Condtitional Footer */}
      {isMobile ? (
        <MDBFooter
          fixed-bottom
          style={{ backgroundColor: '#083D77' }}
          className='fixed-bottom pt-4 mt-4'
        >
          <MDBContainer fluid className='text-center text-md-left'>
            <MDBRow>
              <MDBCol md='5'>
                <p>
                  We believe in connecting friends and family by offering
                  scheduled calls and call transcription. Always remember the
                  things you’ve talked about with your loved ones. We are
                  ReCaller.
                </p>
                &copy; {new Date().getFullYear()} <a href='/'> ReCaller </a>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
        </MDBFooter>
      ) : (
        <MDBFooter
          fixed-bottom
          style={{ backgroundColor: '#083D77' }}
          className='fixed-bottom pt-4 mt-4'
        >
          <MDBContainer fluid className='text-center text-md-left'>
            <MDBRow>
              <MDBCol md='5'>
                <p>
                  We believe in connecting friends and family by offering
                  scheduled calls and call transcription. Always remember the
                  things you’ve talked about with your loved ones. We are
                  ReCaller.
                </p>
                &copy; {new Date().getFullYear()} <a href='/'> ReCaller </a>
              </MDBCol>
              <MDBCol style={{ marginLeft: '5%' }} md='5'>
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
                </ul>
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          {/* <div className='footer-copyright text-center py-3'>
          <MDBContainer fluid>
            &copy; {new Date().getFullYear()} <a href='/'> ReCaller </a>
          </MDBContainer>
        </div> */}
        </MDBFooter>
      )}
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
