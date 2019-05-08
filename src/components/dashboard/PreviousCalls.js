import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment-timezone';
import { Link } from '@reach/router';
import { db } from '../../firebase';
import { styles } from '../../styles/styledDefaultComponents';
import img from '../../assets/images/randomDummyImage.jpg';

const PreviousCalls = ({ userId }) => {
  const [calls, setCalls] = useState([]);
  console.log(calls, 'CALLS');
  useEffect(() => {
    const fetchData = async () => {
      const user = await db.collection('users').doc(userId);
      const userContacts = await db
        .collection('contacts')
        .where('user1', '==', user)
        .get();
      console.log(userContacts, 'userContacts');
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
              call_time: moment(doc.data().call_time.toDate()).format(),
            };
            const contactRef = doc.data().contact_ref.path;
            await db.doc(contactRef).onSnapshot(async doc => {
              callData.contactId = doc.id;
              await db.doc(doc.data().user2.path).onSnapshot(doc => {
                callData.user2 = {
                  displayName: doc.data().displayName,
                  email: doc.data().email,
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

  return (
    <>
      {calls &&
        calls.map(call => (
          <PrevCallsWrapper key={call.callId}>
            <div className='user2Div'>
              <h3 className='prevHeader'>Previous Call with</h3>
              <img src={img} alt='temp holder' className='user2Img' />
              <p className='user2Name'>{call.user2.displayName}</p>
            </div>
            <div className='flexIt'>
              <div className='transcriptWrapper'>
                <p className='callDuration'>
                  Call duration: {call.call_duration} seconds
                </p>
                <audio controls className='audioControls'>
                  <source src={call.audio} type='audio/wav' />
                  <track />
                  Your browser does not support the audio element
                </audio>
              </div>
              <div className='transcriptTextWrapper'>
                <p className='transcriptText'>
                  Lorem laudantium provident quae sunt laborum. Minima maiores
                  in ducimus repudiandae perspiciatis eum laboriosam? Sunt id
                  nisi nostrum dolorum autem. Pariatur mollitia laboriosam
                  tempora ea ratione ullam, ducimus enim! Cum Amet reiciendis
                  possimus consequatur corrupti deleniti. Quidem amet rerum
                  soluta sequi quam! Blanditiis fuga in a fugiat voluptatibus
                  voluptate Error molestias molestias ducimus dolor illum! Porro
                  saepe illo ducimus temporibus?
                </p>
              </div>
            </div>
            <div className='momentWrapper'>
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
  @media (min-width: 768px) {
    display: flex;
    align-items: start;
    justify-content: space-between;
    min-height: 80vh;
    padding: 3%;
    .flexIt {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 0 10% 0 10%;
      p {
        padding: 3%;
        border: 1px solid grey;
        box-shadow: 1px 5px 15px 1px;
      }
    }
  }
  @media (min-width: 992px) {
    //border: 1px solid red;
    display: flex;
    align-items: start;
    justify-content: space-between;
    min-height: 79vh;
    padding: 3%;
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
    @media (min-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
      .prevHeader {
        color: ${styles.colors.mainBlue};
        font-size: 1.5rem;
        text-transform: capitalize;
        font-weight: 700;
        text-align: center;
      }
      .user2Img {
        border-radius: 50%;
        min-height: 100px;
        min-width: 150px;
        margin: 15% auto;
      }
      .user2Name {
        font-size: 1.5rem;
        color: ${styles.colors.mainBlue};
        font-weight: 700;
      }
    }
    @media (min-width: 992px) {
      //border: 1px solid green;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      margin: 0 auto;
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
      padding: 3%;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      //width: 40%;
      margin: 5% auto 10% auto;
      .transcriptTextWrapper {
        margin: 0 auta (min-width: 992px) {
          width: 100%;
        }
        .callDuration {
          font-size: 1rem;
          color: ${styles.colors.mainBlue};
          margin-bottom: 3%;
        }
        .audioControls {
          margin-bottom: 3%;
        }
        .transcriptText {
          line-height: 1.5rem;
          font-size: 1.2rem;
        }
      }
      @media (min-width: 992px) {
        border: 1px solid grey;
        box-shadow: 1px 5px 15px 1px;
        padding: 3%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        //width: 40%;
        margin: 5% auto 10% auto;
        .callDuration {
          font-size: 1rem;
          color: ${styles.colors.mainBlue};
          margin-bottom: 3%;
        }
        .audioControls {
          margin-bottom: 3%;
        }
        .transcriptText {
          line-height: 1.5rem;
          font-size: 1.2rem;
        }
      }
    }
  }
  .momentWrapper {
    @media (min-width: 768px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 20%;
      margin: 0 auto;
      .moment {
        text-align: center;
        color: ${styles.colors.mainBlue};
        font-size: 1.5rem;
        font-weigth: 1.5rem;
        //width: 50%;
      }
    }
    //border: 1px solid hotpink;
    @media (min-width: 992px) {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 20%;
      margin: 0 auto;
      .moment {
        text-align: center;
        color: ${styles.colors.mainBlue};
        font-size: 1.5rem;
        font-weigth: 1.5rem;
        //width: 50%;
      }
    }
  }
`;
