import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link } from '@reach/router';

const ScheduledCall = ({ contact, user }) => {
  return (
    <Container>
      <header>
        <h3>Scheduled By</h3>
        <h3>On</h3>
        <h3>With</h3>
      </header>
      <main>
        <div>
          <div>{contact.user1.displayName}</div>{' '}
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
        <div>
          <div>{contact.user2.displayName}</div>
          <img
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
  display: grid;
  grid-template-areas:
    'header header header'
    'main main main'
    'main main main'
    'main main main'
    'main main main';

  header {
    grid-area: header;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
    text-align: center;
    padding: 10px;
  }

  main {
    grid-area: main;
    justify-content: space-around;
    margin: 5px;
    padding: 5px;
    text-align: center;
  }

  footer {
    grid-area: edit;
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
