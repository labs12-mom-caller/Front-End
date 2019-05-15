/* eslint-disable no-inner-declarations */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { FaArrowLeft } from 'react-icons/fa';

import { styles } from '../../styles/styledDefaultComponents';
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
        <div className='user2Div'>
          <h3 className='prevHeader'>Previous Call with</h3>
          <img
            src={
              contact.photoUrl ||
              'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
            }
            alt='temp holder'
            className='user2Img'
          />
          <p className='user2Name'>{contact.displayName}</p>
          <p className='email'>{contact.email}</p>
          <p className='phone'>{contact.phoneNumber}</p>
          <button className='btn' type='button'>
            <FaArrowLeft className='arrow' />{' '}
            <Link to='/' className='link'>
              Back Home
            </Link>
          </button>
        </div>
        <div className='flexIt'>
          {' '}
          <div className='slider'>
            <audio controls className='audioControls'>
              <source src={call.audio} type='audio/wav' />
              <track kind='captions' />
              Your browser does not support the audio element
            </audio>
          </div>
          <p className='transcript'>Transcript</p>
          <div className='transcriptWrapper'>
            {call.simplified &&
              call.simplified.map(line => {
                return (
                  <>
                    <h3 className='name'>{line.user}</h3>
                    <p className='text'>{line.script}</p>
                  </>
                );
              })}
          </div>
        </div>

        <div className='momentWrapper'>
          <p className='callDuration'>
            Call duration: {call.call_duration} seconds
          </p>
          <p className='moment'>
            {moment(call.call_time, 'X').format('dddd, MMMM Do [at] h:mm A')}
          </p>
        </div>
      </PrevCallsWrapper>
    )
  );
};

export default CallRecord;
CallRecord.propTypes = {
  callId: PropTypes.string,
};

const PrevCallsWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr;
  margin-right: 3%;
  margin-left: 3%;
  place-items: center;
  grid-template-areas:
    'user2'
    'transcript'
    'callInfo';
  @media (min-width: 768px) {
    grid-template-columns: 1fr 3fr;
    grid-template-rows: 100% 100%;
    place-items: start;
    grid-template-areas:
      'user2 transcript'
      'callInfo callInfo';
    min-height: 85vh;
    @media (min-width: 992px) {
      grid-template-columns: 25% 2fr 25%;
      grid-template-rows: 100%;
      grid-template-areas: 'user2 transcript callInfo';
      /* height: 90%; */
    }
  }
  .user2Div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    @media (min-width: 768px) {
      justify-content: space-around;
      /* border: 1px solid green; */
      flex-wrap: wrap;
      /* height: 40%; */
    }
    @media (min-width: 992px) {
      /* border: 1px solid hotpink; */
      height: 73vh;
    }
    .prevHeader {
      font-size: 1.5rem;
      margin-top: 5%;
      color: ${styles.colors.mainBlue};
      @media (min-width: 768px) {
        font-size: 2rem;
        /* margin-bottom: 5%; */
      }
      @media (min-width: 992px) {
        font-size: 1.5rem;
      }
    }
    .user2Img {
      height: 250px;
      width: 300px;
      border-radius: 50%;
      margin: 5% auto;
      @media (min-width: 768px) {
        /* margin-bottom: 10%; */
        width: 250px;
        height: 250px;
        object-fit: contain;
      }
      @media (min-width: 992px) {
        max-width: 200px;
        max-height: 200px;
      }
    }
    .user2Name {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      font-weight: 700;
      margin-bottom: 8%;
      @media (min-width: 768px) {
        font-size: 2rem;
      }
      @media (min-width: 992px) {
        font-size: 2rem;
      }
    }
    .email {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      font-weight: 700;
      margin-bottom: 8%;
      @media (min-width: 768px) {
        text-align: justify;
        font-size: 1.7rem;
      }
      @media (min-width: 992px) {
        font-size: 1rem;
      }
    }
    .phone {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      margin-bottom: 8%;
      @media (min-width: 768px) {
        font-size: 1.7rem;
      }
    }
    .btn {
      background: #636578;
      border-radius: 10px;
      font-size: 1rem;
      color: white;
      margin-bottom: 10%;
      .link {
        text-decoration: none;
        color: white;
        font-size: 1rem;
      }
    }
  }
  .flexIt {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    padding: 0 10% 0 10%;
    margin-bottom: 5%;
    /* border: 1px solid blue; */
    /* height: 62vh; */
    grid-area: transcript;
    @media (min-width: 768px) {
      max-height: 100%;
      overflow: scroll;
      margin-top: 4%;
    }
    @media (min-width: 992px) {
      /* border: 1px solid hotpink; */
      max-height: 35%;
      object-fit: contain;
      overflow: scroll;
    }
    p {
      padding: 3%;
      border: 1px solid grey;
      box-shadow: 1px 1px 5px 1px;
      font-family: roboto;
    }
    .transcript {
      background: #c4c4c4;
      width: 100%;
      text-align: left;
      opacity: 0.7;
      margin: 5% auto;
      font-size: 1.5rem;
      /* margin-left: 3%; */
    }
    .transcriptWrapper {
      border: 1px solid grey;
      box-shadow: 1px 5px 15px 1px;
      overflow: scroll;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      /* max-height: 40%;
      max-width: 100%;
      object-fit: contain; */
      overflow: scroll;
      @media (min-width: 768px) {
        justify-content: flex-start;
        max-height: 50%;
        overflow: scroll;
      }
      @media (min-width: 992px) {
        /* max-height: 40%;
        max-width: auto;
        object-fit: contain;
        overflow: scroll; */
      }
      @media (min-width: 1300px) {
        max-height: 50%;
        overflow: scroll;
      }
      .transcriptText {
        font-size: 1.8rem;
        line-height: 2rem;
        overflow: scroll;
      }
      .name {
        margin-bottom: 5%;
        margin-top: 5%;
        margin-left: 3%;
        font-size: 1.5rem;
        color: ${styles.colors.mainBlue};
        @media (min-width: 768px) {
          font-size: 2rem;
        }
      }
      .text {
        margin-left: 3%;
        margin-right: 3%;
        margin-bottom: 5%;
        @media (min-width: 768px) {
          font-size: 1.5rem;
          letter-spacing: 0.1rem;
          line-height: 2rem;
        }
      }
      .slider {
        /* width: 70%; */
        /* border: 1px solid red; */
        margin: 3% auto;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
        .audioControls {
          margin-bottom: 3%;
          /* width: 200px; */
        }
      }
    }
  }
  .momentWrapper {
    grid-area: callInfo;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 5% auto;
    /* border: 1px solid purple; */
    /* height: 62vh; */
    @media (min-width: 992px) {
      justify-content: space-evenly;
      height: 80vh;
    }

    .callDuration {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      margin-bottom: 3%;
      /* border: 1px solid red; */
      text-align: center;
      @media (min-width: 768px) {
        margin: 5% auto;
      }
      @media (min-width: 992px) {
        font-size: 2rem;
      }
    }
    .moment {
      text-align: center;
      color: ${styles.colors.mainBlue};
      font-size: 1.5rem;
      font-weight: 1.5rem;
      @media (min-width: 992px) {
        font-size: 2rem;
      }
    }
  }
`;
