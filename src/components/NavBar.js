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
      <button>Add New Call</button>
      <button>Review Calls</button>
      <button>Previous Calls</button>
      <button>Update Account</button>
    </>
  );
};

export default NavBar;
