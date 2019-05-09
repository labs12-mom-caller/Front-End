import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { Link } from '@reach/router';
import { db } from '../../firebase';
import { styles } from '../../styles/styledDefaultComponents';
// import img from '../../assets/images/randomDummyImage.jpg';
import { FaArrowLeft } from 'react-icons/fa';

const PreviousCalls = ({ userId }) => {
  const [calls, setCalls] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const user = await db.collection('users').doc(userId);
      const userContacts = await db
        .collection('contacts')
        .where('user1', '==', user)
        .get();

      await userContacts.forEach(async doc => {
        const allCalls = await db
          .collection('calls')
          .where('contact_ref', '==', doc.ref)
          .get();
        if (!allCalls.empty) {
          allCalls.forEach(async doc => {
            const callData = {
              callId: doc.id,
              user2: {},
              contactId: '',
              audio: doc.data().audio,
              call_duration: doc.data().call_duration,
              call_time: moment(doc.data().call_time, 'X').format(),
            };
            const contactRef = doc.data().contact_ref.path;
            await db.doc(contactRef).onSnapshot(async doc => {
              callData.contactId = doc.id;
              await db.doc(doc.data().user2.path).onSnapshot(doc => {
                callData.user2 = {
                  displayName: doc.data().displayName,
                  email: doc.data().email,
                  phoneNumber: doc.data().phoneNumber,
                  photoUrl: doc.data().photoUrl,
                };
                setCalls(c => [...c, callData]);
              });
            });
          });
        }
      });
    };
    fetchData();
  }, [userId]);

  if (calls.empty) return <p>No Calls Available...</p>;
  console.log(calls);
  return (
    <>
      {calls &&
        calls.map(call => (
          <PrevCallsWrapper key={call.callId}>
            <div className='user2Div'>
              <h3 className='prevHeader'>Previous Call with</h3>
              <img
                src={call.user2.photoUrl}
                alt='temp holder'
                className='user2Img'
              />
              <p className='user2Name'>{call.user2.displayName}</p>
              <p className='email'>{call.user2.email}</p>
              <p className='phone'>{call.user2.phoneNumber}</p>
              <button className='btn'>
                <FaArrowLeft className='arrow' /> Back Home
              </button>
            </div>
            <div className='flexIt'>
              {' '}
              <p className='transcript'>Transcript</p>
              <div className='transcriptWrapper'>
                <p className='transcriptText'>
                  Lorem laudantium provident quae sunt laborum. Minima maiores
                  in ducimus repudiandae perspiciatis eum laboriosam? Sunt id
                  nisi nostrum dolorum autem. Pariatur mollitia laboriosam
                  tempora ea ratione ullam, ducimus enim! Cum Amet reiciendis
                  possimus consequatur corrupti deleniti. Quidem amet rerum
                  soluta sequi quam! Blanditiis fuga in a fugiat voluptatibus
                  voluptate Error molestias molestias ducimus dolor illum! Porro
                  saepe illo ducimus temporibus? nisi nostrum dolorum autem.
                  Pariatur mollitia laboriosam tempora ea ratione ullam, ducimus
                  enim! Cum Amet reiciendis possimus consequatur corrupti
                  deleniti. Quidem amet rerum soluta sequi quam! Blanditiis fuga
                  in a fugiat voluptatibus voluptate Error molestias molestias
                  ducimus dolor illum! Porro saepe illo ducimus temporibus?
                </p>
              </div>
            </div>

            <div className='momentWrapper'>
              <p className='callDuration'>
                Call duration: {call.call_duration} seconds
              </p>
              <div className='slider'>
                <audio controls className='audioControls'>
                  <source src={call.audio} type='audio/wav' />
                  <track />
                  Your browser does not support the audio element
                </audio>
              </div>
              <p className='moment'>
                {moment(call.call_time).format('dddd, MMMM Do [at] h:mm A')}
              </p>
            </div>
            {/* eslint-disable jsx-a11y/media-has-caption */}
          </PrevCallsWrapper>
        ))}
    </>
  );
};

PreviousCalls.propTypes = {
  userId: PropTypes.string,
};

export default PreviousCalls;

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
