/* eslint-disable jsx-a11y/media-has-caption */
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
          <Link to={`single-call/${call.callId}`} style={{ inherit: 'all' }}>
            <PrevCallsWrapper key={call.callId}>
              <User>
                <h3 className='prevHeader'>{call.user2.displayName}</h3>
                <Img src={img} alt='temp holder' className='user2Img' />
              </User>
              <Info>
                <Date>{moment(call.call_time).format('MMM DD - h:mm A')}</Date>
                <Transcript>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Asperiores excepturi nulla modi corporis totam itaque non
                  quasi sapiente, dolor quod, nemo in! Error delectus aliquam
                  magnam voluptatem maiores dignissimos facilis!
                </Transcript>
              </Info>
            </PrevCallsWrapper>
          </Link>
        ))}
    </>
  );
};

PreviousCalls.propTypes = {
  userId: PropTypes.string,
};
export default PreviousCalls;
const Info = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
`;
const Transcript = styled.p`
  font-family: 'Roboto';
  margin-top: 8px;
  color: #000000;
  font-weight: 300;
  line-height: 1.5;
  padding: 0px;
`;
const User = styled.div`
  h3 {
    margin-top: 5px;
    color: #000000;
  }
  width: 20%;
  display: flex;
  padding: 5px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  border-radius: 50%;
  width: 90px;
  padding: 5px;
  margin-top: 5px;
  height: 90px;
`;
const Date = styled.h3`
  font-family: 'Roboto';
  margin-top: 5px;
  color: #000000;
  font-size: 18px;
  font-weight: 380;
`;
const PrevCallsWrapper = styled.div`
  display: flex;
  height: inherit;
`;
