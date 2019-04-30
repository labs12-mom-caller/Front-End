import React from 'react';
import NavBar from './NavBar';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  DashboardButtons,
  WelcomeUser,
} from '../styles/Dashboard';
import { DefaultButtonRedBG } from '../styles/styledDefaulComponents';

const DashBoard = ({ user }) => {
  return (
    <div>
      <NavBar user={user} />
      <Wrapper>
        <WelcomeUser>Hello {user.displayName} </WelcomeUser>
        <ProfileImage src={`${user.photoUrl}`} alt='ProfilePic' />
        <UpdateAccount>Update Account</UpdateAccount>
        <DashboardButtons>
          <DefaultButtonRedBG type='button'>New Call </DefaultButtonRedBG>
          <DefaultButtonRedBG type='button'>Scheduled Calls</DefaultButtonRedBG>
          <DefaultButtonRedBG type='button'>Previous Calls </DefaultButtonRedBG>
        </DashboardButtons>
      </Wrapper>
    </div>
  );
};

export default DashBoard;
