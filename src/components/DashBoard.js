import React from 'react';
import PropTypes from 'prop-types';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import NavBar from './NavBar';
import ModalPhoneNumber from './ModalPhoneNumber';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  DashboardButtons,
  WelcomeUser,
} from '../styles/Dashboard';
import { DefaultButtonBlueBG } from '../styles/styledDefaultComponents';

const isMobile = window.innerWidth <= 768;

const DashBoard = ({ user }) => {
  const { displayName, photoUrl } = user;
  return (
    <div>
      <NavBar user={user} />
      <Wrapper>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '25%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <WelcomeUser>Hello {displayName} </WelcomeUser>
          <ProfileImage src={`${photoUrl}`} alt='ProfilePic' />
          <UpdateAccount>Update Account</UpdateAccount>
        </div>
        <ModalPhoneNumber user={user} />
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
      <MDBFooter fixed-bottom color='blue' className='fixed-bottom pt-4 mt-4'>
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
            <MDBCol style={{marginLeft: "5%"}} md='5'>
              <ul>
                <li className='list' style={{color: "#6B6D76"}}>
                  <a style={{color: "#FF6F61"}} href='/'>Dashboard</a>
                </li>
                <li className='list' style={{color: "#6B6D76"}}>
                  <a style={{color: "#FF6F61"}} href='#!'>Add New Call</a>
                </li>
                <li className='list' style={{color: "#6B6D76"}}>
                  <a style={{color: "#FF6F61"}} href='#!'>Review Calls</a>
                </li>
                <li className='list' style={{color: "#6B6D76"}}>
                  <a style={{color: "#FF6F61"}} href='#!'>Previous Calls</a>
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
