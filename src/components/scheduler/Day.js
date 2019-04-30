import React from 'react';
import PropTypes from 'prop-types';

import Slot from './Slot';
import { generateTimeSlots } from './generateTimeSlots';

const Day = ({ day, timezone, selectTime }) => {
  //   const [scroll, setScroll] = useState(0);

  const timeSlots = generateTimeSlots(60, '00:00', '23:00');
  return (
    <div>
      <h2>{day}</h2>
      <div>
        <div>Scroll Up</div>
        <div>
          {timeSlots.map(slot => (
            <Slot
              slot={slot}
              key={slot}
              day={day}
              timezone={timezone}
              selectTime={selectTime}
            />
          ))}
        </div>
        <div>ScrollDown</div>
      </div>
    </div>
  );
};

Day.propTypes = {
  day: PropTypes.string,
  timezone: PropTypes.string,
  selectTime: PropTypes.func,
};

export default Day;
