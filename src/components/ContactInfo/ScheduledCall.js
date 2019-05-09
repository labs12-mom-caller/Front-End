import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ScheduledCall = ({ contact }) => {
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
          />{' '}
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
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-areas:
    'header header header'
    'stuff stuff stuff'
    'stuff stuff stuff'
    'stuff stuff stuff';

  header {
    grid-area: header;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    align-items: center;
    justify-items: center;
  }

  main {
    grid-area: stuff;
    justify-content: space-around;
    margin: 5px;
  }

  footer {
    grid-area: edit;
  }
`;

export default ScheduledCall;

ScheduledCall.propTypes = {
  contact: PropTypes.object,
};
