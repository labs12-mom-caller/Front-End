import React from 'react';
import { navigate } from '@reach/router';
import { logout } from '../app/utils';

const NavBar = props => {
  return (
    <nav>
      <button type='button' onClick={logout}>
        log out
      </button>
      <button type='button'>Add New Call</button>
      <button type='button'>Review Calls</button>
      <button type='button'>Previous Calls</button>
      <button type='button'>Update Account</button>
      <button
        onClick={() => navigate(`/choose/${props.user.uid}`)}
        type='button'
      >
        Choose Contact
      </button>
    </nav>
  );
};

export default NavBar;
