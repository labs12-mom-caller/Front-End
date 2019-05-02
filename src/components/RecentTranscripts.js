import React from 'react';
import PropTypes from 'prop-types';
import { UpcomingCallsComponent } from '../styles/UpcomingCalls';

function RecentTranscripts({ transcripts }) {
  return (
    <UpcomingCallsComponent>
      <img
        src='https://lh4.googleusercontent.com/-zMAmXLwB4do/AAAAAAAAAAI/AAAAAAAAAaY/Udt0zCXYzKI/photo.jpg'
        alt='contact img'
      />
      <span>
        <strong>{transcripts.contactName}</strong>
      </span>
      <span>
        Date: {transcripts.callDate} Time: {transcripts.callTime}
      </span>
    </UpcomingCallsComponent>
  );
}

RecentTranscripts.propTypes = {
  transcripts: PropTypes.shape({
    contactName: PropTypes.string,
    callDate: PropTypes.string,
    callTime: PropTypes.string,

  }),
};

export default RecentTranscripts;
