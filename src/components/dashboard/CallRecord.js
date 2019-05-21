/* eslint-disable no-inner-declarations */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link, navigate } from '@reach/router';
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

import { formatPhoneNumber } from '../../app/utils';

import { db } from '../../firebase';

import Loading from '../Loading';

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
  return !contact ? (
    <Loading />
  ) : (
    <PrevCallsWrapper key={call.id}>
      <Aside>
        <User>
          <Link to={`/contact/${callInfo.id}`}>
            <Img
              src={
                contact.photoUrl ||
                'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
              }
              alt={contact.displayName}
            />
          </Link>
          <CallInfo>
            <H3>Previous Call</H3>
            <P>on</P>
            <Date>
              {moment(call.call_time, 'X').format('dddd, MMMM Do [at] h:mm A')}
            </Date>
            <P>with</P>
          </CallInfo>
          <UserInfo>
            <H3>{contact.displayName}</H3>
            <P>{contact.email}</P>
            <P>{formatPhoneNumber(contact.phoneNumber)}</P>
            <Button
              type='button'
              onClick={() => navigate(`/contact/${callInfo.id}`)}
            >
              Contact Info
            </Button>
            <Button type='button' onClick={() => navigate('/')}>
              <FaArrowLeft className='arrow' /> Back Home
            </Button>
          </UserInfo>
        </User>
      </Aside>
      <CallRecordBox>
        <Wrapper>
          <CardHeader>Call Record</CardHeader>
          <CallRecordCard>
            <Audio controls>
              <source src={call.audio} type='audio/wav' />
              <track kind='captions' />
              Your browser does not support the audio element
            </Audio>
            <TranscriptTitle>Transcript</TranscriptTitle>
            <TranscriptBox>
              {call.simplified &&
                call.simplified.map(line => {
                  return (
                    <>
                      <Speaker>{line.user}</Speaker>
                      <Script>{line.script}</Script>
                    </>
                  );
                })}
            </TranscriptBox>
          </CallRecordCard>
        </Wrapper>
      </CallRecordBox>
    </PrevCallsWrapper>
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
    display: flex;
    flex-direction: column;
  }
`;

const CallRecordBox = styled.div`
  grid-row: 2 / -1;
  grid-column: 2 / 4;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 50px;

  @media (max-width: 1025px) {
    grid-row: 2;
    grid-area: record;
    display: flex;
    flex-direction: column;
    width: 95%;
    justify-content: center;
  }
`;

const CardHeader = styled.h2`
  color: #999999;
  margin-bottom: 20px;
  font-size: 2.6rem;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  text-align: left;
  align-self: stretch;
`;
const CallRecordCard = styled.div`
  transition: box-shadow 0.3s;
  height: 600px;
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
  width: 100%;
  background: #636578;
  height: 60px;
  z-index: 0;

  ::-webkit-media-controls-panel {
    width: 98%;
    height: 100%;
    position: absolute;
    top: 0;
    background: #9c9a87;
    z-index: 1;
    filter: invert(100%);
  }
`;

const Wrapper = styled.div`
  width: 90%;
  margin-top: 40px;
  display: flex;
  flex-direction: column;

  @media (max-width: 1025px) {
    width: 95%;
    align-items: center;
  }
`;

const Date = styled.h3`
  font-size: 1.6rem;
  text-align: center;
  margin: 10px 0;
  color: #999999;
`;

const TranscriptTitle = styled.h3`
  font-size: 2.5rem;
  color: #999999;
  margin: 10px 15px;
`;

const Speaker = styled.h4`
  font-size: 1.8rem;
  font-weight: 600;
  margin-bottom: 5px;
`;

const Script = styled.p`
  font-size: 1.8rem;
  margin-bottom: 15px;
`;

const TranscriptBox = styled.div`
  height: 82.5%;
  overflow-x: auto;
  overflow-y: scroll;
  padding: 0 15px;

  ::-webkit-scrollbar {
    appearance: none;
  }

  ::-webkit-scrollbar-thumb {
    background: #999;
    border-radius: 10px;
  }
`;

const CallInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px 0 0;
`;
