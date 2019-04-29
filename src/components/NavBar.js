import React from 'react';
import { logout } from '../app/utils';

const NavBar = () => {
  return (
    <>
      <button type='button' onClick={logout}>
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
