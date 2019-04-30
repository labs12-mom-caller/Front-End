import React from 'react';
import { MDBBtn } from 'mdbreact';
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
  return (
    <div>
      <NavBar user={user} />
      <Wrapper>
        <WelcomeUser>Hello {user.displayName} </WelcomeUser>
        <ProfileImage src={`${user.photoUrl}`} alt='ProfilePic' />
        <UpdateAccount>Update Account</UpdateAccount>

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
        <DashboardButtons>
          <DefaultButtonBlueBG type='button'>New Call </DefaultButtonBlueBG>
          <DefaultButtonBlueBG type='button'>
            Scheduled Calls
          </DefaultButtonBlueBG>
          <DefaultButtonBlueBG type='button'>
            Previous Calls{' '}
          </DefaultButtonBlueBG>
        </DashboardButtons>
        <ModalPhoneNumber user={user} />
      </Wrapper>
    </div>
  );
};

export default DashBoard;
