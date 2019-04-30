import React from 'react';
import NavBar from './NavBar';
import ModalPhoneNumber from './ModalPhoneNumber';

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
      <ModalPhoneNumber user={user} />
    </>
  );
};

export default DashBoard;
