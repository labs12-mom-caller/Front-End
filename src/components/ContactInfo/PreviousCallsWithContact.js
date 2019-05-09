import React from 'react';
import moment from 'moment-timezone';
import styled from 'styled-components';
import { Link } from '@reach/router';
import PropTypes from 'prop-types';

const PreviousCallsWithContact = ({ calls, contact, user }) => {
  return (
    <>
      <header>
        <h3>Previous Calls</h3>
      </header>
      {calls.length > 0 ? (
        calls.map(call => {
          return (
            <Card key={call.id}>
              <h2>
                {moment(call.call_time, 'X')
                  .tz(contact.timezone)
                  .format('MMMM Do, YY [at] h:mm A')}
              </h2>
              <div>Call duration: {call.call_duration} seconds</div>
              <Link to={`/prev-calls/${user.uid}/${call.id}`}>Review Call</Link>
            </Card>
          );
        })
      ) : (
        <Card>
          <p>You have no previous calls with this contact</p>
        </Card>
      )}
    </>
  );
};

export default PreviousCallsWithContact;

PreviousCallsWithContact.propTypes = {
  contact: PropTypes.object,
  calls: PropTypes.array,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

const Card = styled.div`
  transition: box-shadow 0.3s;
  width: 100%;
  border-radius: 6px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
`;
