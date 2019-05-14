import React, { useState } from 'react';
import moment from 'moment-timezone';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Loader from 'react-loader-spinner';

import { Scheduler, CustomStripeBtn, Container } from '../styles/Scheduler';

import { db } from '../firebase';

const SchedulePaidCall = ({ userId, contactId, frequency, user }) => {
  const [paid, setPaid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [payError, setPayError] = useState(false);
  const [subId, setSubId] = useState('');

  const initialState = {
    timezone: moment.tz.guess(),
    hour: '1',
    minute: '00',
    period: 'AM',
    day: 'Sunday',
  };

  const [time, setTime] = useState(initialState);

  const onToken = async token => {
    setLoading(true);
    let stripeId = user.stripe_id || '';
    if (!user.stripe_id) {
      const formData = new URLSearchParams({
        email: user.email,
        name: user.displayName,
      });
      const response = await fetch('https://api.stripe.com/v1/customers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Bearer ${process.env.REACT_APP_STRIPESECRET}`,
        },
        body: formData,
      });
      const { id } = await response.json();
      await db.doc(`/users/${userId}`).update({
        stripe_id: id,
      });
      stripeId = id;
    }
    try {
      await fetch(
        `https://api.stripe.com/v1/customers/${stripeId}?source=${token.id}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${process.env.REACT_APP_STRIPESECRET}`,
          },
        },
      );
      const planId =
        frequency === 'Bi-Weekly'
          ? 'plan_F20stdpdPhbPlz'
          : 'plan_F20svaxc8pnQWp';
      const response = await fetch(
        `https://api.stripe.com/v1/subscriptions?customer=${stripeId}&items[0][plan]=${planId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${process.env.REACT_APP_STRIPESECRET}`,
          },
        },
      );
      const data = await response.json();
      if (data.status === 'active') {
        setSubId(data.id);
        setLoading(false);
        setPaid(true);
      } else {
        setLoading(false);
        setPayError(true);
      }
    } catch (err) {
      console.log(err);
    }
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
    if (
      nextCall <
      moment()
        .tz(time.timezone)
        .toDate()
    ) {
      nextCall = moment
        .tz(nextCall, time.timezone)
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
        canceled: false,
      });
      await fetch(
        `https://api.stripe.com/v1/subscriptions/${subId}?metadata[contact_id]=${
          docRef.id
        }`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Bearer ${process.env.REACT_APP_STRIPESECRET}`,
          },
        },
      );
      navigate(`/confirmation/${docRef.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Scheduler>
        <h2 className='heading'>Schedule a call</h2>
        <p>
          ReCaller will only call you and your loved one at your selected time.
        </p>
        <div className='chooseDayWeek'>
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
        <div className='chooseTime'>
          <label htmlFor='selected_time'>Time</label>
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
        <div className='chooseTimezone'>
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
        <CustomStripeBtn
          token={res => onToken(res)}
          description='Thank you for becoming a Pro User'
          name='ReCaller'
          image='https://raw.githubusercontent.com/labs12-mom-caller/Front-End/master/public/favicon.ico'
          stripeKey={process.env.REACT_APP_STRIPEKEY}
        />
        <button
          type='button'
          onClick={handleSubmit}
          disabled={!paid}
          className='submitBtn'
        >
          {loading ? <Loader type='ThreeDots' /> : 'Save & Continue'}
        </button>
        <div style={{ visibility: payError ? 'visible' : 'hidden' }}>
          Issue with payment. Please try again
        </div>
      </Scheduler>
    </Container>
  );
};

SchedulePaidCall.propTypes = {
  userId: PropTypes.string,
  contactId: PropTypes.string,
  frequency: PropTypes.string,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
    stripe_id: PropTypes.string,
  }),
};

export default SchedulePaidCall;
