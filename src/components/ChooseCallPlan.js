import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';

import { CallPlanView } from '../styles/CallPlanView';

const ChooseCallPlan = ({ contactId, userId }) => {
  const [free, setFree] = useState(null);
  const [paid, setPaid] = useState(null);

  const freeFrequency = e => {
    e.preventDefault();
    if (e.target.innerText === free) {
      setFree(null);
    } else {
      setFree(e.target.innerText);
    }
  };

  const paidFrequency = e => {
    e.preventDefault();
    if (e.target.innerText === paid) {
      setPaid(null);
    } else {
      setPaid(e.target.innerText);
    }
  };

  const selectFree = e => {
    e.preventDefault();
    navigate(`/choose/${userId}/${contactId}/${free}/schedule-free`);
  };

  const selectPaid = e => {
    e.preventDefault();
    navigate(`/choose/${userId}/${contactId}/${free}/schedule`);
  };

  return (
    <CallPlanView>
      <h2>Choose your plan</h2>
      <p>Don&apos;t worry, you can change this any time</p>
      <div className='card-container'>
        <div className='card'>
          <p>Up to 10 Minutes</p>
          <h3>Just saying &quot;Hi&quot;</h3>
          <h4>Randomly Scheduled</h4>
          <div>
            <button
              type='button'
              className={
                free === 'Bi-Weekly' ? 'frequency active' : 'frequency'
              }
              onClick={freeFrequency}
            >
              Bi-Weekly
            </button>
            <button
              type='button'
              className={free === 'Monthly' ? 'frequency active' : 'frequency'}
              onClick={freeFrequency}
            >
              Monthly
            </button>
          </div>
          <hr />
          <p>Free</p>
          <button type='button' disabled={!free} onClick={selectFree}>
            Select
          </button>
        </div>
        <div className='card'>
          <p>Up to 30 Minutes</p>
          <h3>Let&apos;s catch up</h3>
          <h4>Pre-Scheduled</h4>
          <div>
            <button
              type='button'
              className={
                paid === 'Bi-Weekly' ? 'frequency active' : 'frequency'
              }
              onClick={paidFrequency}
            >
              Bi-Weekly
            </button>
            <button
              type='button'
              className={paid === 'Monthly' ? 'frequency active' : 'frequency'}
              onClick={paidFrequency}
            >
              Monthly
            </button>
          </div>
          <hr />
          <p>$2.50 per month</p>
          <button type='button' disabled={!paid} onClick={selectPaid}>
            Select
          </button>
        </div>
      </div>
    </CallPlanView>
  );
};

ChooseCallPlan.propTypes = {
  contactId: PropTypes.string,
  userId: PropTypes.string,
};

export default ChooseCallPlan;
