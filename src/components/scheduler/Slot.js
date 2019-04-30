import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Slot = ({ slot }) => {
  const [click, setClick] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    setClick(prev => !prev);
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
};

export default Slot;
