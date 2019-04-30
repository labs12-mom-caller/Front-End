import React from 'react';
import PropTypes from 'prop-types';
import NavBar from './NavBar';
import TakeMoney from './testingStripe';
import ModalPhoneNumber from './ModalPhoneNumber';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  DashboardButtons,
  WelcomeUser,
} from '../styles/Dashboard';
import { DefaultButtonBlueBG } from '../styles/styledDefaultComponents';

const DashBoard = ({ user }) => {
  return (
    <div>
      <NavBar user={user} />
      <Wrapper>
        <WelcomeUser>Hello {user.displayName} </WelcomeUser>
        <ProfileImage src={`${user.photoUrl}`} alt='ProfilePic' />
        <UpdateAccount>Update Account</UpdateAccount>
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
        <TakeMoney>
          <button type='submit'>Submit</button>
        </TakeMoney>
      </Wrapper>
    </div>
  );
};
DashBoard.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
export default DashBoard;
