import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';
import { navigate } from '@reach/router';
import styled from 'styled-components';
import { Scheduler, Container } from '../../styles/Scheduler';

import { db } from '../../firebase';

const UpdatePaidCall = ({ contact }) => {
  const splitTime = time => {
    const hour = time.length === 7 ? time.slice(0, 1) : time.slice(0, 2);
    const minute = time.length === 7 ? time.slice(2, 4) : time.slice(3, 5);
    const period = time.slice(time.length - 2, time.length);
    return { hour, minute, period };
  };

  const currentTime = splitTime(contact.scheduled_time);

  const initialState = {
    timezone: contact.timezone,
    hour: currentTime.hour,
    minute: currentTime.minute,
    period: currentTime.period,
    day: contact.scheduled_day,
  };

  const [time, setTime] = useState(initialState);

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
      await db.doc(`contacts/${contact.id}`).update({
        next_call: nextCall,
        timezone: time.timezone,
        scheduled_day: time.day,
        scheduled_time: selectedTime,
        updated_at: moment().toDate(),
      });
      navigate(`/contact/${contact.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Container>
      <Scheduler>
        <h2 className='heading'>Update Call Information</h2>
        <p className='info'>
          Your current contact with {contact.user2.displayName} is listed below.
        </p>
        <form className='updateForm' onSubmit={handleSubmit}>
          <div className='updateSelects'>
            <div className='chooseDayWeek'>
              <label htmlFor='day'>Day of the week</label>
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
            <div className='chooseTime updateChooseTime'>
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
              <select
                id='timezone'
                value={time.timezone}
                onChange={handleChange}
              >
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
          </div>
          <button type='submit' className='submitBtn'>
            Save &amp; Continue
          </button>
        </form>
      </Scheduler>
    </Container>
  );
};

UpdatePaidCall.propTypes = {
  contact: PropTypes.object,
};

export default UpdatePaidCall;
