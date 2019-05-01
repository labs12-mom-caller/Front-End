import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import moment from 'moment-timezone';

import Day from './scheduler/Day';
import randomTime from './scheduler/randomTime';

import { Scheduler } from '../styles/Scheduler';

import { db } from '../firebase';

const ScheduleFreeCall = ({ contactId, userId, frequency }) => {
  const initialState = {
    timezone: '',
    selectedTimes: {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  };

  const [time, setTime] = useState(initialState);

  const setTimezone = e => {
    setTime({
      ...time,
      timezone: e.target.value,
    });
  };

  const selectTime = (day, selected, clicked) => {
    const prevTimes = time.selectedTimes[day];
    if (clicked) {
      setTime({
        ...time,
        selectedTimes: {
          ...time.selectedTimes,
          [day]: prevTimes.filter(item => item !== selected),
        },
      });
    } else {
      setTime({
        ...time,
        selectedTimes: {
          ...time.selectedTimes,
          [day]: [...prevTimes, selected],
        },
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const thisTime = randomTime(time.selectedTimes);
    let nextCall = moment(thisTime).toDate();
    if (nextCall < moment().toDate()) {
      nextCall = moment(nextCall)
        .add(1, 'w')
        .toDate();
    }
    try {
      const docRef = await db.collection('contacts').add({
        call_frequency: frequency.toLowerCase(),
        call_type: 'free',
        next_call: nextCall,
        timezone: time.timezone,
        selected_times: time.selectedTimes,
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
      <h2>Schedule a free call</h2>
      <p>
        Please select the block of hours that you have availability. A call will
        be randomly scheduled in one of the time blocks selected
      </p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='timezone'>Please select your time zone</label>
        <select
          id='timezone'
          onChange={setTimezone}
          placeholder='Select a Time Zone'
        >
          <option value='' />
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
        <div className='days'>
          {Object.keys(time.selectedTimes).map(day => (
            <Day
              day={day}
              key={day}
              timezone={time.timezone}
              selectTime={selectTime}
            />
          ))}
        </div>
        <button type='submit'>Complete Sign Up</button>
      </form>
    </Scheduler>
  );
};

ScheduleFreeCall.propTypes = {
  contactId: PropTypes.string,
  userId: PropTypes.string,
  frequency: PropTypes.string,
};

export default ScheduleFreeCall;
