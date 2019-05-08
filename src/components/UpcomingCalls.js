import React from 'react';
import PropTypes from 'prop-types';
import { UpcomingCallsComponent } from '../styles/UpcomingCalls';

function UpcomingCalls({ call }) {
  return (
    <UpcomingCallsComponent>
      {/* <img
        src='https://lh4.googleusercontent.com/-zMAmXLwB4do/AAAAAAAAAAI/AAAAAAAAAaY/Udt0zCXYzKI/photo.jpg'
        alt='contact img'
      /> */}
      <span>
        <strong>{call.contactName}</strong>
      </span>
      <span>
        Date: {call.callDate} Time: {call.callTime}
      </span>
    </UpcomingCallsComponent>
  );
}

UpcomingCalls.propTypes = {
  call: PropTypes.object,
};

export default UpcomingCalls;
