import React, { useState } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import StripeCheckout from 'react-stripe-checkout';

import { Scheduler } from '../styles/Scheduler';

import { db } from '../firebase';

const SchedulePaidCall = ({ userId, contactId, frequency }) => {
  const [paid, setPaid] = useState(false);

  const initialState = {
    timezone: moment.tz.guess(),
    hour: '1',
    minute: '00',
    periods: 'AM',
    day: '',
  };

  const [time, setTime] = useState(initialState);

  const onToken = token => {
    fetch('https://us-central1-recaller-14a1f.cloudfunctions.net/charge', {
      method: 'POST',
      body: JSON.stringify({
        token,
        charge: {
          amount: 250,
          currency: 'usd',
        },
      }),
    }).then(res => {
      res.json().then(data => {
        data.body = JSON.parse(data.body);
        if (data.statusCode === 200) {
          setPaid(true);
        }
        return data;
      });
    });
  };

  const handleChange = e => {
    setTime({
      ...time,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const selectedTime = `${time.hour}:${time.minute} ${time.period}`;
    let nextCall = moment
      .tz(`${time.day} ${selectedTime}`, 'dddd h:mm A', time.timezone)
      .utc()
      .toDate();
    if (nextCall < moment().toDate()) {
      nextCall = moment(nextCall)
        .add(1, 'w')
        .toDate();
    }
    try {
      const docRef = await db.collection('contacts').add({
        call_frequency: frequency,
        call_type: 'paid',
        next_call: nextCall,
        timezone: time.timezone,
        scheduled_day: time.day,
        scheduled_time: selectedTime,
        user1: db.collection('users').doc(userId),
        user2: db.collection('users').doc(contactId),
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
      });
      navigate(`/confirmation/${docRef.id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Scheduler>
      <h2>Schedule a call</h2>
      <p>
        ReCaller will only call you and your loved one at your selected time.
      </p>
      <div>
        <label htmlFor='day'>Choose a day of the week</label>
        <select id='day' value={time.day} onChange={handleChange}>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
        </select>
      </div>
      <div>
        <label htmlFor='selected_time'>Time</label>
        {/* <input
        type='time'
        id='selected_time'
        value={time.selected_time}
        onChange={handleChange}
      /> */}
        <select value={time.hour} id='hour' onChange={handleChange}>
          <option>1</option>
          <option>2</option>
          <option>3</option>
          <option>4</option>
          <option>5</option>
          <option>6</option>
          <option>7</option>
          <option>8</option>
          <option>9</option>
          <option>10</option>
          <option>11</option>
          <option>12</option>
        </select>
        <select value={time.minute} id='minute' onChange={handleChange}>
          <option>00</option>
          <option>05</option>
          <option>10</option>
          <option>15</option>
          <option>20</option>
          <option>25</option>
          <option>30</option>
          <option>35</option>
          <option>40</option>
          <option>45</option>
          <option>50</option>
          <option>55</option>
        </select>
        <select value={time.period} id='period' onChange={handleChange}>
          <option>AM</option>
          <option>PM</option>
        </select>
      </div>
      <div>
        <label htmlFor='timezone'>Your time zone</label>
        <select id='timezone' value={time.timezone} onChange={handleChange}>
          <option>{time.timezone}</option>
          <option value='US/Alaska'>Alaska</option>
          <option value='US/Aleutian'>Aleutian</option>
          <option value='US/Arizona'>Arizona</option>
          <option value='US/Central'>Central</option>
          <option value='US/East-Indiana'>East-Indiana</option>
          <option value='US/Eastern'>Eastern</option>
          <option value='US/Hawaii'>Hawaii</option>
          <option value='US/Indiana-Starke'>Indiana-Starke</option>
          <option value='US/Michigan'>Michigan</option>
          <option value='US/Mountain'>Mountain</option>
          <option value='US/Pacific'>Pacific</option>
          <option value='US/Pacific-New'>Pacific-New</option>
        </select>
      </div>
      <StripeCheckout
        token={res => onToken(res)}
        description='Thank you for becoming a Pro User'
        name='ReCaller'
        image='https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
        stripeKey={process.env.REACT_APP_STRIPEKEY}
      />
      <button type='button' onClick={handleSubmit} disabled={!paid}>
        Save &amp; Continue
      </button>
    </Scheduler>
  );
};

SchedulePaidCall.propTypes = {
  userId: PropTypes.string,
  contactId: PropTypes.string,
  frequency: PropTypes.string,
};

export default SchedulePaidCall;
