import React from 'react';
import NavBar from './NavBar';

const DashBoard = ({ user }) => {
  return (
    <>
      <NavBar user={user} />
      <div>Hello {user.displayName} </div>
      <img
        src={`${user.photoUrl}`}
        style={{ width: 250, height: 250 }}
        alt='ProfilePic'
      />
    </>
  );
};

export default DashBoard;
