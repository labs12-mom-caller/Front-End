import React, { useState } from 'react';
import { Formik, Field } from 'formik';

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
      timezone: e.target.value,
    });
  };

  return (
    <Scheduler>
      <h2>Schedule a free call</h2>
      <p>
        Please select the block of hours that you have availability. A call will
        be randomly scheduled in one of the time blocks selected
      </p>
      <Formik
        initialValues={{ timezone: '' }}
        render={() => (
          <form>
            <label htmlFor='timezone'>Please select your time zone</label>
            <Field component='select' id='timezone' onChange={setTimezone}>
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
            </Field>
            <div className='days'>
              {Object.keys(time.selectedTimes).map(day => (
                <Day day={day} key={day} />
              ))}
            </div>
            <button type='button'>Complete Sign Up</button>
          </form>
        )}
      />
    </Scheduler>
  );
};

export default ScheduleFreeCall;
