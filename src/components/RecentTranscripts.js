import React from 'react';
import PropTypes from 'prop-types';
import { UpcomingCallsComponent } from '../styles/UpcomingCalls';

function RecentTranscripts({ transcripts }) {
  return (
    <UpcomingCallsComponent
      style={{ overflow: 'hidden', maxHeight: '100px', maxWidth: '80%' }}
    >
      <img
        src={`${transcripts.photoUrl}`}
        alt='contact img'
        style={{ maxWidth: '100px', maxHeight: '100px' }}
      />
      <div
        style={{
          maxWidth: '80%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <span>
          <strong>{transcripts.contactName}</strong>
        </span>
        <span style={{ maxWidth: '80%', marginLeft: '14%' }}>
          {transcripts.transcript}
        </span>
      </div>
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
