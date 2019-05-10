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
    // <Card>
    //   <h2>Review your call with {contact.displayName}</h2>
    //   <Link to={`/contact/${contact.id}`}>
    //     <Img
    //       src={
    //         contact.photoUrl ||
    //         'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
    //       }
    //       alt={contact.displayName}
    //     />
    //   </Link>
    //   <p>
    //     {moment(call.call_time.seconds).format('dddd, MMMM Do [at] h:mm A')}
    //   </p>
    //   <p>Listen to Call</p>
    //   <audio controls>
    //     <source src={call.audio} type='audio/wav' />
    //     <track kind='captions' />
    //     Your browser does not support the audio element
    //   </audio>
    //   <Link to={`/contact/${callInfo.id}`}>Contact Information</Link>
    //   <h2>Transcript</h2>
    //   {call.simplified.map((line, index) => {
    //     return (
    //       <div key={index}>
    //         <h3>{line.user}</h3>
    //         <p>{line.script}</p>
    //       </div>
    //     );
    //   })}
    // </Card>
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
            <FaArrowLeft className='arrow' /> Back Home
          </button>
        </div>
        <div className='flexIt'>
          {' '}
          <p className='transcript'>Transcript</p>
          <div className='transcriptWrapper'>
            {call.simplified.map(line => {
              return (
                <>
                  <h3>{line.user}</h3>
                  <p>{line.script}</p>
                </>
              );
            })}
          </div>
        </div>

        <div className='momentWrapper'>
          <p className='callDuration'>
            Call duration: {call.call_duration} seconds
          </p>
          <div className='slider'>
            <audio controls className='audioControls'>
              <source src={call.audio} type='audio/wav' />
              <track kind='captions' />
              Your browser does not support the audio element
            </audio>
          </div>
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
const Card = styled.div`
  transition: box-shadow 0.3s;
  margin: 25px 0;
  padding: 20px;
  border-radius: 10px;
  border: 1px solid #ccc;
  background: #fff;
  &:hover {
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
`;
const Img = styled.img`
  border-radius: 50%;
  height: 100px;
  width: 100px;
  float: right;
`;
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
    p {
      padding: 3%;
      border: 1px solid grey;
      box-shadow: 1px 5px 15px 1px;
    }
    .transcript {
      background: grey;
      width: 100%;
      text-align: center;
      opacity: 0.7;
      margin-top: 5%;
    }
  }

  @media (min-width: 768px) {
    /* display: flex;
    align-items: start;
    justify-content: space-between;
    min-height: 80vh;
    padding: 3%; */
    display: grid;
    grid-template-columns: 1fr 3fr 160px;
    min-height: 70vh;

    margin-right: 3%;
    margin-left: 3%;
    place-items: center;
    grid-template-areas: 'user2 transcript callInfo';
  }
    @media (min-width: 992px) {
      display: grid;
      grid-template-columns: 1fr 3fr 200px;
      grid-template-areas: 'user2 transcript callInfo';
 
    }
@media (min-width: 768px) {
    .flexIt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      padding: 0 10% 0 10%;
      margin-bottom: 0;
      /* border: 1px solid blue; */
      height: 62vh;
      grid-area: transcript;
      p {
        padding: 3%;
        border: 1px solid grey;
        box-shadow: 1px 5px 15px 1px;
      }
      .transcript {
        background: grey;
        width: 100%;
        text-align: center;
        opacity: 0.7;
        margin-top: 5%;
      }
    }
  }
  }
  @media (min-width: 992px) {
    //border: 1px solid red;
    display: flex;
    align-items: start;
    justify-content: space-between;
    min-height: 68vh;
    /* padding: 3%; */
    .flexIt {
      display: flex;
      flex-direction: column;
      //width: 40%;
      p {
        padding: 3%;
        border: 1px solid grey;
        box-shadow: 1px 5px 15px 1px;
      }
    }
  }
  .user2Div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .prevHeader {
      font-size: 1.5rem;
      margin-top: 5%;
      color: ${styles.colors.mainBlue};
    }
    .user2Img {
      max-height: 200px;
      max-width: 250px;
      border-radius: 50%;
      margin: 5% auto;
    }
    .user2Name {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      font-weight: 700;
      margin-bottom: 8%;
    }
    .email {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      font-weight: 700;
      margin-bottom: 8%;
    }
    .phone {
      font-size: 1.5rem;
      color: ${styles.colors.mainBlue};
      margin-bottom: 8%;
    }
    .btn {
      background: #636578;
      border-radius: 10px;
      font-size: 1rem;
      color: white;
    }
    @media (min-width: 768px) {
      grid-area: user2;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      align-items: center;
      margin: 0 auto;
      /* border: 1px solid red; */
      height: 80%;
      /* width: 90%; */
      /* width: 25%; */
      /* height: 50vh; */
      .prevHeader {
        color: ${styles.colors.mainBlue};
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 700;
        text-align: center;
      }
      .user2Img {
        border-radius: 50%;
        max-height: 200px;
        max-width: 250px;
        margin: 0 auto;
      }
      .user2Name {
        font-size: 1.5rem;
        color: ${styles.colors.mainBlue};
        font-weight: 700;
        margin-bottom: 8%;
      }
      .email {
        font-size: 1.5rem;
        color: ${styles.colors.mainBlue};
        font-weight: 700;
        margin-bottom: 8%;
      }
      .phone {
        font-size: 1.5rem;
        color: ${styles.colors.mainBlue};
        margin-bottom: 8%;
      }
      .btn {
        background: #636578;
        border-radius: 10px;
        font-size: 1rem;
        color: white;
      }
    }
    @media (min-width: 992px) {
      //border: 1px solid green;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      /* height: 60vh; */
      .prevHeader {
        color: ${styles.colors.mainBlue};
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 700;
        text-align: center;
      }
      .user2Img {
        border-radius: 50%;
        min-height: 200px;
        min-width: 250px;
        margin: 15% auto;
      }
      .user2Name {
        font-size: 1.5rem;
        color: ${styles.colors.mainBlue};
        font-weight: 700;
      }
    }
  }
  .transcriptWrapper {
    @media (min-width: 768px) {
      border: 1px solid grey;
      box-shadow: 1px 5px 15px 1px;
      overflow: scroll;
      .transcriptText {
        font-size: 1.8rem;
        line-height: 2rem;
        overflow: scroll;
      }
      @media (min-width: 992px) {
        .transcriptText {
          font-size: 2rem;
          line-height: 3rem;
          padding: 3%;
          overflow: scroll;
        }
      }
      /* padding: 3%; */
      /* display: flex; */
      /* flex-direction: column; */
      /* justify-content: center; */
      /* align-items: center; */
      /* width: 32%; */
      /* margin: 5% auto 10% auto; */
    }

    /* @media (min-width: 992px) {
      .transcriptWrapper {
        border: 1px solid grey;
        box-shadow: 1px 5px 15px 1px;
        padding: 3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 5% auto 10% auto;
        .transcriptText {
          line-height: 1.5rem;
          font-size: 4.2rem;
        }
      }
    } */
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

    .slider {
      width: 70%;
      margin: 0 auto;
      display: flex;
      justify-content: center;
      align-items: center;
      align-self: center;
      .audioControls {
        margin-bottom: 3%;
        /* width: 200px; */
      }
    }
    .callDuration {
      font-size: 1rem;
      color: ${styles.colors.mainBlue};
      margin-bottom: 3%;
      /* border: 1px solid red; */
      text-align: center;
    }
    .moment {
      text-align: center;
      color: ${styles.colors.mainBlue};
      font-size: 1.5rem;
      font-weight: 1.5rem;
      //width: 33%;
    }

    @media (min-width: 768px) {
      grid-area: callInfo;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 100%;
      margin: 0 auto;
      /* border: 1px solid purple; */
      height: 62vh;

      .slider {
        width: 70%;
        margin: 0 auto;
        display: flex;
        justify-content: center;
        align-items: center;
        align-self: center;
        .audioControls {
          margin-bottom: 3%;
          /* width: 200px; */
        }
      }
      .callDuration {
        font-size: 1rem;
        color: ${styles.colors.mainBlue};
        margin-bottom: 3%;
        /* border: 1px solid red; */
        text-align: center;
      }
      .moment {
        text-align: center;
        color: ${styles.colors.mainBlue};
        font-size: 1.5rem;
        font-weight: 1.5rem;
        //width: 33%;
      }
    }
    //border: 1px solid hotpink;
    @media (min-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
      width: 20%;
      margin: 0 auto;
      .moment {
        text-align: center;
        color: ${styles.colors.mainBlue};
        font-size: 2rem;
        font-weight: 700;
        //width: 50%;
      }
      .callDuration {
        font-size: 1.5rem;
      }
    }
  }
`;
