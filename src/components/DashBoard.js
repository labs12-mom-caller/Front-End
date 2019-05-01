import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
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
        <WelcomeUser>Hello {displayName} </WelcomeUser>
        <ProfileImage src={`${photoUrl}`} alt='ProfilePic' />
        <UpdateAccount onClick={() => navigate(`/account/${user.uid}`)}>
          Update Account
        </UpdateAccount>
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
    </div>
  );
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
