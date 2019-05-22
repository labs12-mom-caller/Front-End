import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
import moment from 'moment-timezone';

import Day from './scheduler/Day';
import randomTime from './scheduler/randomTime';

import { Container, H2, Info, SingleSection } from '../styles/Scheduler/index';
import { Button, Label, Select } from '../styles/Form/index';
import { CustomSlider, Days } from '../styles/Scheduler/TimePicker';

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
    <Container>
      <SingleSection>
        <H2>Schedule a free call</H2>
        <Info>
          Please select the block of hours that you have availability. A call
          will be randomly scheduled in one of the time blocks selected.
        </Info>
        <Label htmlFor='timezone'>Please select your time zone</Label>
        <Select id='timezone' onChange={setTimezone} value={time.timezone}>
          <option value={time.timezone} defaultValue>
            {time.timezone}
          </option>
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
        </Select>

        <Days>
          <CustomSlider {...settings}>
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
          </CustomSlider>
        </Days>
        <Button type='button' onClick={handleSubmit}>
          Submit
        </Button>
      </SingleSection>
    </Container>
  );
};

ScheduleFreeCall.propTypes = {
  contactId: PropTypes.string,
  userId: PropTypes.string,
  frequency: PropTypes.string,
};
export default ScheduleFreeCall;
