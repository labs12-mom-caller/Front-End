import React from 'react';
import NavBar from '../components/NavBar';

const DashBoard = ({ user, displayName, photoUrl }) => {
  return (
    <>
      <NavBar user={user} />
      <div>Hello {displayName} </div>
      <img
        src={`${photoUrl}`}
        style={{ width: 250, height: 250 }}
        alt='ProfileImg'
      />
    </>
  );
};

export default DashBoard;
