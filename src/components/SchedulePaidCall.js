import React, { useState } from 'react';
import { Scheduler } from '../styles/Scheduler';

const SchedulePaidCall = props => {
  const initialState = {
    timezone: '',
    selected_time: '',
    day: '',
  };

  const [time, setTime] = useState(initialState);

  const handleChange = e => {
    setTime({
      ...time,
      [e.target.id]: e.target.value,
    });
    console.log(time);
  };

  return (
    <Scheduler>
      <h2>Schedule a call</h2>
      <p>
        ReCaller will only call you and your loved one at your selected time.
      </p>
      <form>
        <label htmlFor='day'>Choose a day of the week</label>
        <select id='day' value={time.day} onChange={handleChange}>
          <option>Sunday</option>
          <option>Monday</option>
          <option>Tuesday</option>
          <option>Wednesday</option>
          <option>Thursday</option>
          <option>Friday</option>
          <option>Saturday</option>
          <option>Sunday</option>
        </select>
        <label htmlFor='selected_time'>Time</label>
        <input
          type='time'
          id='selected_time'
          value={time.selected_time}
          onChange={handleChange}
        />
        <label htmlFor='timezone'>Your time zone</label>
        <select id='timezone' value={time.timezone} onChange={handleChange}>
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
        <button type='submit'>Save &amp; Continue</button>
      </form>
    </Scheduler>
  );
};

export default SchedulePaidCall;
