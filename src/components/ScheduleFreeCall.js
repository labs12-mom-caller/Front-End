import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import moment from 'moment-timezone';
import Slider from 'react-slick';
import styled from 'styled-components';

import Day from './scheduler/Day';
import randomTime from './scheduler/randomTime';

import { Scheduler } from '../styles/Scheduler';

import { db } from '../firebase';

const ScheduleFreeCall = ({ contactId, userId, frequency }) => {
  const initialState = {
    timezone: moment.tz.guess(),
    days: [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    selectedTimes: [],
  };

  const [time, setTime] = useState(initialState);

  const setTimezone = e => {
    setTime({
      ...time,
      timezone: e.target.value,
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
      const docRef = await db.collection('contacts').add({
        call_frequency: frequency,
        call_type: 'free',
        next_call: nextCall,
        timezone: time.timezone,
        selected_times: time.selectedTimes,
        user1: db.collection('users').doc(userId),
        user2: db.collection('users').doc(contactId),
        created_at: moment().toDate(),
        updated_at: moment().toDate(),
        canceled: false,
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
      <div className='header'>
        <h2 style={{ fontWeight: '300' }}>Schedule a free call</h2>
        <p style={{ fontWeight: '300', textAlign: 'left' }}>
          Please select the block of hours that you have availability. A call
          will be randomly scheduled in one of the time blocks selected.
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className='timezone-select'>
          <label htmlFor='timezone'>Please select your time zone</label>
          <Select
            id='timezone'
            onChange={setTimezone}
            value={time.timezone}
            placeholder='Select a Time Zone'
          >
            <MenuItem value={time.timezone} defaultValue>
              {time.timezone}
            </MenuItem>
            <MenuItem value='US/Alaska'>Alaska</MenuItem>
            <MenuItem value='US/Aleutian'>Aleutian</MenuItem>
            <MenuItem value='US/Arizona'>Arizona</MenuItem>
            <MenuItem value='US/Central'>Central</MenuItem>
            <MenuItem value='US/East-Indiana'>East-Indiana</MenuItem>
            <MenuItem value='US/Eastern'>Eastern</MenuItem>
            <MenuItem value='US/Hawaii'>Hawaii</MenuItem>
            <MenuItem value='US/Indiana-Starke'>Indiana-Starke</MenuItem>
            <MenuItem value='US/Michigan'>Michigan</MenuItem>
            <MenuItem value='US/Mountain'>Mountain</MenuItem>
            <MenuItem value='US/Pacific'>Pacific</MenuItem>
            <MenuItem value='US/Pacific-New'>Pacific-New</MenuItem>
          </Select>
        </div>

        <div className='days'>
          <Slider {...settings}>
            {time.days.map((day, index) => (
              <Day
                day={day}
                key={day}
                timezone={time.timezone}
                selectTime={selectTime}
                index={index}
                current={[]}
              />
            ))}
          </Slider>
        </div>
        <Button type='submit'>Submit</Button>
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
// export default withStyles(styles)(ScheduleFreeCall);

const Button = styled.button`
  background-color: #636578;
  width: 157px;
  height: 43px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 16px;
  transition: all 0.4s ease;
  outline: 0;
  &:hover {
    background-color: #ffffff;
    color: #636578;
    border: 1px solid #636578;
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;
