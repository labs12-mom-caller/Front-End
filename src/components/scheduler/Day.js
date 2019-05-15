import React from 'react';
import PropTypes from 'prop-types';

import Slot from './Slot';
import { generateTimeSlots } from './generateTimeSlots';

const Day = ({ day, timezone, selectTime, current }) => {
  const timeSlots = generateTimeSlots(60, '06:00', '23:00');

  return (
    <div className='slick-slide'>
      <h2>{day}</h2>
      <div className='time-slots-container'>
        <div className='time-slots'>
          {timeSlots.map(slot => (
            <Slot
              slot={slot}
              key={slot}
              day={day}
              timezone={timezone}
              selectTime={selectTime}
              current={current}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.string,
  timezone: PropTypes.string,
  selectTime: PropTypes.func,
  current: PropTypes.array,
};

export default Day;
