import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';

import Day from './scheduler/Day';

import { Scheduler } from '../styles/Scheduler';

const ScheduleFreeCall = props => {
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

  useEffect(() => {
    const tz = moment.tz.guess(true);
    setTime({
      ...time,
      timezone: tz,
    });
  }, [time]);

  return (
    <Scheduler>
      <h2>Schedule a free call</h2>
      <p>
        Please select the block of hours that you have availability. A call will
        be randomly scheduled in one of the time blocks selected
      </p>
      <form>
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
        <button type='button'>Complete Sign Up</button>
      </form>
    </Scheduler>
  );
};

export default ScheduleFreeCall;
