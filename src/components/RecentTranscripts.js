import React from 'react';
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

export default RecentTranscripts;
