import React from 'react';
import firebase from 'firebase';

const NavBar = () => {
  return (
    <>
      <button
        type='button'
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        log out
      </button>
      <button type='button'>Add New Call</button>
      <button type='button'>Review Calls</button>
      <button type='button'>Previous Calls</button>
      <button type='button'>Update Account</button>
    </>
  );
};

export default NavBar;
