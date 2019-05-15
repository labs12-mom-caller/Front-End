/* eslint-disable no-inner-declarations */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { navigate } from '@reach/router';
import { FaArrowLeft } from 'react-icons/fa';

import {
  Aside,
  Button,
  H3,
  Img,
  P,
  User,
  UserInfo,
} from '../../styles/UserCard';

import { db } from '../../firebase';

const CallRecord = ({ callId }) => {
  const [call, setCall] = React.useState(null);
  const [contact, setContact] = React.useState(null);
  const [callInfo, setCallInfo] = React.useState(null);
  React.useEffect(() => {
    return db.doc(`calls/${callId}`).onSnapshot(document => {
      setCall({
        ...document.data(),
        id: document.id,
      });
    });
  }, [callId]);
  React.useEffect(() => {
    if (call) {
      function fetchCallInfo() {
        call.contact_ref.get().then(doc => {
          if (doc.exists) {
            setCallInfo({
              ...doc.data(),
              id: doc.id,
            });
          }
        });
      }
      fetchCallInfo();
    }
  }, [call]);
  React.useEffect(() => {
    if (callInfo) {
      function fetchContact() {
        callInfo.user2.get().then(doc => {
          if (doc.exists) {
            setContact({
              ...doc.data(),
              id: doc.id,
            });
          }
        });
      }
      fetchContact();
    }
  }, [callInfo]);
  if (!call) return <p>Loading..</p>;
  if (!callInfo) return <p>...</p>;
  if (!contact) return <p>...</p>;
  console.log(call);
  return (
    call && (
      <PrevCallsWrapper key={call.id}>
        <Aside>
          <User>
            <H3>Previous Call with</H3>
            <Img
              src={
                contact.photoUrl ||
                'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
              }
              alt={contact.displayName}
            />
            <UserInfo>
              <H3>{contact.displayName}</H3>
              <P>{contact.email}</P>
              <P>{contact.phoneNumber}</P>
              <Button type='button' onClick={() => navigate('/')}>
                <FaArrowLeft className='arrow' /> Back Home
              </Button>
            </UserInfo>
          </User>
        </Aside>
        <CallRecordBox>
          <CardHeader>Call Record</CardHeader>
          <CallRecordCard>
            <Audio controls>
              <source src={call.audio} type='audio/wav' />
              <track kind='captions' />
              Your browser does not support the audio element
            </Audio>
            <div>
              <span>Call duration: {call.call_duration} seconds</span>
              <span>
                {moment(call.call_time, 'X').format(
                  'dddd, MMMM Do [at] h:mm A',
                )}
              </span>
            </div>
            <p>Transcript</p>
            <div>
              {call.simplified &&
                call.simplified.map(line => {
                  return (
                    <>
                      <h3>{line.user}</h3>
                      <p>{line.script}</p>
                    </>
                  );
                })}
            </div>
          </CallRecordCard>
        </CallRecordBox>
      </PrevCallsWrapper>
    )
  );
};

export default CallRecord;
CallRecord.propTypes = {
  callId: PropTypes.string,
};

const PrevCallsWrapper = styled.section`
  display: grid;
  grid-template-columns: 1fr 2fr 3fr;

  @media (max-width: 1025px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    grid-template-areas:
      'aside'
      'upcoming'
      'previous';
    place-items: center;
  }
`;

const CallRecordBox = styled.div`
  grid-row: 2 / -1;
  grid-column: 2 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 1025px) {
    grid-area: previous;
    display: flex;
    flex-direction: column;
    width: 95%;
    justify-content: center;
  }
`;

const CardHeader = styled.h2`
  color: #999999;
  margin-bottom: 20px;
  font-size: 26px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const CallRecordCard = styled.div`
  transition: box-shadow 0.3s;
  height: 400px;
  overflow: scroll;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  ::-webkit-scrollbar {
    width: 0px; /* Remove scrollbar space */
    background: transparent; /* Optional: just make scrollbar invisible */
  }

  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 1025px) {
    margin: 0 auto;
    width: 100%;
  }
`;

const Audio = styled.audio`
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  -webkit-border-radius: 0;
  -moz-border-radius: 0;
  border-radius: 0;
  width: 100%;
  background: #636578;
  height: 60px;

  &::-webkit-media-controls-panel {
    -webkit-border-radius: 0;
    -moz-border-radius: 0;
    border-radius: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: #636578;
    border: 5px solid #636578;
    border-radius: none;
    box-shadow: 0 0 20px #636578;
    color: #fff;
  }

  &::-webkit-media-controls-mute-button {
  }

  &::-webkit-media-controls-play-button {
    appearnce: none;
    border: 1px solid red;
    color: #fff;
  }

  &::-webkit-media-controls-timeline-container {
  }

  &::-webkit-media-controls-current-time-display {
  }

  &::-webkit-media-controls-time-remaining-display {
  }

  &::-webkit-media-controls-timeline {
  }

  &::-webkit-media-controls-volume-slider-container {
  }

  &::-webkit-media-controls-volume-slider {
  }

  &::-webkit-media-controls-seek-back-button {
  }

  &::-webkit-media-controls-seek-forward-button {
  }

  &::-webkit-media-controls-fullscreen-button {
  }

  &::-webkit-media-controls-rewind-button {
  }

  &::-webkit-media-controls-return-to-realtime-button {
  }

  &::-webkit-media-controls-toggle-closed-captions-button {
  }
`;
