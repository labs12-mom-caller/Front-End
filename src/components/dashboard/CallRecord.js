/* eslint-disable no-inner-declarations */
/* eslint-disable react/no-array-index-key */
import React from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Link } from '@reach/router';
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
    <Card>
      <h2>Review your call with {contact.displayName}</h2>
      <Link to={`contact/${contact.id}`}>
        <Img src={contact.photoUrl} alt={contact.displayName} />
      </Link>
      <p>
        {moment(call.call_time.seconds).format('dddd, MMMM Do [at] h:mm A')}
      </p>
      <p>Listen to Call</p>
      <audio controls>
        <source src={call.audio} type='audio/wav' />
        <track kind='captions' />
        Your browser does not support the audio element
      </audio>
      <Link to={`/contact/${callInfo.id}`}>Contact Information</Link>
      <h2>Transcript</h2>
      {call.simplified.map((line, index) => {
        return (
          <div key={index}>
            <h3>{line.user}</h3>
            <p>{line.script}</p>
          </div>
        );
      })}
    </Card>
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
