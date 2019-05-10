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
          const user2 = await doc.data().user2.get();
          allCalls.forEach(async callDoc => {
            const callData = {
              id: callDoc.id,
              user2: user2.data(),
              contactId: doc.id,
              call_duration: callDoc.data().call_duration,
              call_time: moment(callDoc.data().call_time, 'X').format(),
              deepgram: callDoc.data().deepgram,
            };
            setCalls(c => [...c, callData]);
          });
        }
      });
    };
    fetchData();
  }, [userId]);

  if (calls.empty) return <p>No Calls Available...</p>;

  return (
    <>
      <TableHeader style={{ display: 'flex' }}>
        <div style={{ marginLeft: '2%' }}>Contact</div>
        <div style={{ marginLeft: '10%' }}>
          Transcripts{' '}
          <span>
            <a
              style={{ opacity: '0.5', color: '#7d7d7d', cursor: 'alias' }}
              href='https://www.deepgram.com/'
              target='_blank'
              rel='noopener noreferrer'
            >
              Powered By DeepGram
            </a>
          </span>
        </div>
      </TableHeader>
      {calls &&
        calls.map(call => (
          <Link
            to={`/prev-calls/${userId}/${call.id}`}
            style={{ inherit: 'all' }}
            key={call.id}
          >
            <PrevCallsWrapper>
              <User>
                <h3 className='prevHeader'>{call.user2.displayName}</h3>
                <Img
                  src={
                    call.user2.photoUrl ||
                    'https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
                  }
                  alt='temp holder'
                  className='user2Img'
                />
              </User>
              <Info>
                <Date>{moment(call.call_time).format('MMM DD - h:mm A')}</Date>
                <Transcript>
                  {call.deepgram.results.channels[0].alternatives[0].transcript}
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
const TableHeader = styled.div`
  display: flex;
  align-items: center;
  height: 28px;
  padding: 5px;
  border: 1px solid #cecece;
  background-color: #cecece;
  color: #7d7d7d;
  font-family: Roboto;
  font-size: 0.9rem;
  font-weight: 400;
  margin-bottom: 20px;
`;
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

const Card = styled.div`
  transition: box-shadow 0.3s;
  width: 90%;
  ${'' /* height: 120px; */}
  margin: 15px auto;
  margin-top: 20px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  &:nth-child(2) {
    margin-top: 0;
    margin-bottom: 15px;
  }
`;
