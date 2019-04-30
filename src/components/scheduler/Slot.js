import React, { useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment-timezone';

const Slot = ({ slot, timezone, day, selectTime }) => {
  const [click, setClick] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setClick(prev => !prev);
    const formatted = moment
      .tz(`${day} ${slot}`, 'dddd hh:mm A', timezone)
      .tz('UTC')
      .format();
    selectTime(day, formatted, click);
  };

  return (
    <>
      <div
        onMouseDown={e => handleClick(e)}
        onMouseOver={e => {
          if (e.buttons === 1) {
            handleClick(e);
          }
        }}
        onFocus={e => handleClick(e)}
        role='option'
        aria-selected={click}
        tabIndex='0'
        className={!click ? 'slot' : 'slot selected-slot'}
      >
        {slot}
      </div>
    </>
  );
};

Slot.propTypes = {
  slot: PropTypes.string,
  timezone: PropTypes.string,
  day: PropTypes.string,
  selectTime: PropTypes.func,
};

export default Slot;
