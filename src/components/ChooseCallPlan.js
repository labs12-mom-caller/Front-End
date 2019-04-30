import React from 'react';

import { CallPlanView } from '../styles/CallPlanView';

const ChooseCallPlan = () => {
  return (
    <CallPlanView>
      <h2>Choose your plan</h2>
      <p>Don't worry, you can change this any time</p>
      <div className='card-container'>
        <div className='card'>
          <p>Up to 10 Minutes</p>
          <h3>Just saying "Hi"</h3>
          <h4>Randomly Scheduled</h4>
          <div>
            <button type='button'>Bi-Weekly</button>
            <button type='button'>Monthly</button>
          </div>
          <hr />
          <p>Free</p>
          <button type='button'>Select</button>
        </div>
        <div className='card'>
          <p>Up to 30 Minutes</p>
          <h3>Let's catch up</h3>
          <h4>Pre-Scheduled</h4>
          <div>
            <button type='button'>Bi-Weekly</button>
            <button type='button'>Monthly</button>
          </div>
          <hr />
          <p>$2.50 per month</p>
          <button type='button'>Select</button>
        </div>
      </div>
    </CallPlanView>
  );
};

export default ChooseCallPlan;
