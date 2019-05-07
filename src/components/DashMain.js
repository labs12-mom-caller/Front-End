import React from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import ModalPhoneNumber from './ModalPhoneNumber';
import UpcomingCalls from './UpcomingCalls';
import RecentTranscripts from './RecentTranscripts';
import ScheduledContacts from './dashboard/ScheduledContacts';
import {
  Wrapper,
  ProfileImage,
  UpdateAccount,
  WelcomeUser,
  ProfileWrapper,
} from '../styles/Dashboard';

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
        <div
          style={{
            width: '50%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <ScheduledContacts user={user} />
        </div>
      </div>
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
