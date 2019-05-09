import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Slider from 'react-slick';
import moment from 'moment-timezone';
import { navigate } from '@reach/router';

import Day from './Day';
import randomTime from './randomTime';

import { db } from '../../firebase';

import { Scheduler } from '../../styles/Scheduler';

const UpdateFreeCall = ({ contact }) => {
  const initialState = {
    timezone: contact.timezone,
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    selectedTimes: [...contact.selected_times],
    currentAvailability: contact.selected_times,
  };

  const [time, setTime] = useState(initialState);

  const setTimezone = e => {
    const prevTz = time.timezone;
    const prevAvail = time.currentAvailability;
    setTime({
      ...time,
      timezone: e.target.value,
      currentAvailability: prevAvail.map(slot => {
        return moment.tz(slot, prevTz).tz(e.target.value);
      }),
    });
  };

  const selectTime = (selected, clicked) => {
    const prevTimes = time.selectedTimes;
    if (clicked) {
      setTime({
        ...time,
        selectedTimes: prevTimes.filter(item => item !== selected),
      });
    } else {
      setTime({
        ...time,
        selectedTimes: [...prevTimes, selected],
      });
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const thisTime = randomTime(time.selectedTimes);
    let nextCall = moment(thisTime).toDate();
    if (
      nextCall <
      moment()
        .tz(time.timezone)
        .toDate()
    ) {
      nextCall = moment(nextCall)
        .add(1, 'w')
        .toDate();
    }
    try {
      const docRef = await db.doc(`contacts/${contact.id}`).update({
        call_type: 'free',
        next_call: nextCall,
        timezone: time.timezone,
        selected_times: time.selectedTimes,
        updated_at: moment().toDate(),
      });
      navigate(`/confirmation/${docRef.id}`);
    } catch (err) {
      console.log(err);
    }
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    touchMove: false,
    swipe: false,
    touchThreshold: 1,
    responsive: [
      {
        breakpoint: 890,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 590,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 430,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <Scheduler>
      <h2>Update Your Availability</h2>
      <p>Below is your current availability.</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor='timezone'>Please select your time zone</label>
        <select
          id='timezone'
          onChange={setTimezone}
          placeholder='Select a Time Zone'
        >
          <option value={time.timezone}>{time.timezone}</option>
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
          <Slider {...settings}>
            {time.days.map((day, index) => (
              <Day
                day={day}
                key={day}
                timezone={time.timezone}
                selectTime={selectTime}
                index={index}
                current={time.currentAvailability}
              />
            ))}
          </Slider>
        </div>
        <button type='submit'>Update Availability</button>
      </form>
    </Scheduler>
  );
};

UpdateFreeCall.propTypes = {
  contact: PropTypes.object,
};

export default UpdateFreeCall;
