import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';
import { firstNameOnly } from '../../app/utils';

const ScheduledCall = ({ contact, user }) => {
  return (
    <Container>
      <header>
        <h3 className='schedule'>Scheduled By</h3>
        <h3 className='on'>On</h3>
        <h3 className='with'>With</h3>
      </header>
      <main>
        <div className='user'>
          <div>{firstNameOnly(contact.user1.displayName)}</div>{' '}
          <img
            src={
              contact.user1.photoUrl ||
              'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
            }
            alt={contact.user1.displayName}
          />
          <div
            style={
              user.uid === contact.user1.uid
                ? { visibility: 'visible' }
                : { visibility: 'hidden' }
            }
          >
            <Link to={`/contact/${contact.id}/update`} state={{ contact }}>
              Update Call
            </Link>
          </div>
        </div>
        <div>
          {moment(contact.created_at, 'X')
            .tz(contact.timezone)
            .format('MMMM Do, YYYY')}
        </div>
        <div className='user'>
          <div>{firstNameOnly(contact.user2.displayName)}</div>
          <img
            className='userTwoImage'
            src={
              contact.user2.photoUrl ||
              'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
            }
            alt={contact.user2.displayName}
          />
        </div>
      </main>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;

  header {
    align-items: center;
    text-align: center;
    padding: 10px;

    .schedule {
      margin-left: 2rem;
    }

    .on {
      margin-right: 3rem;
    }

    .with {
      margin-right: 4.5rem;
    }
  }

  main {
    justify-content: space-between;
    align-items: center;
    padding: 2rem;
    text-align: center;

    img {
      width: 100px;
      border-radius: 100%;
    }

    .user {
      height: 200px;
      width: 120px;
      padding: 2rem;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

    .userTwoImage {
      margin-bottom: 3rem;
    }
  }
`;

export default ScheduledCall;

ScheduledCall.propTypes = {
  contact: PropTypes.object,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
