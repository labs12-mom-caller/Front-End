/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import { logout } from '../app/utils';

const NavbarPage = ({ user }) => {
  const [collapseId, setCollapseId] = useState('');

  const [show, setShow] = useState(false);
  const toggleNav = () => {
    setShow(!show);
  };

  const toggleCollapse = newId => () => {
    return newId !== collapseId ? setCollapseId('') : setCollapseId(newId);
  };

  const logoutHandler = e => {
    e.preventDefault();
    window.localStorage.clear();
    logout();
    navigate('/');
  };

  return (
    <div>
      <Navbar className={show ? 'NavbarShow' : null}>
        <div className='NavbarLink NavbarLink-brand'>ReCaller</div>
        <nav
          className={
            show
              ? 'Navbar__Items Navbar__ToggleShow'
              : 'Navbar__Items Navbar__Items--right'
          }
        >
          <li
            className='NavbarLink'
            style={{ color: '#6B6D76', listStyle: 'none' }}
          >
            <Link
              style={{ color: '#083D77', padding: '5px' }}
              to={`/account/${user.uid}`}
            >
              Account
            </Link>
          </li>
          <li
            className='NavbarLink'
            style={{ color: '#6B6D76', listStyle: 'none' }}
          >
            <Link
              style={{ color: '#083D77', padding: '5px' }}
              to='/'
              onClick={logoutHandler}
            >
              Sign Out
            </Link>
          </li>
        </nav>
        <div
          onClick={() => toggleNav()}
          className='NavbarLink NavbarLink-toggle'
        >
          <i className='fas fa-bars' />
        </div>
        <Hr className='hr-underline' />
      </Navbar>
    </div>
  );
};

NavbarPage.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};

export default NavbarPage;

const Navbar = styled.div`
  background-color: transparent;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  font-family: sans-serif;
  color: white;
  max-width: 100%;
  .NavbarLink {
    padding-right: 8px;
    font-size: 100%;
    max-width: 100%;
    white-space: nowrap;
  }
  .NavbarLink-brand {
    color: #083d77;
    font-size: 3em;
    font-family: pacifico;
    margin-left: 2.5%;
    @media only screen and (max-width: 768px) {
      font-size: 2.5rem;
      align-self: center;
    }
  }
  .Navbar__Items {
    display: flex;
  }
  .Navbar__Items--right {
    margin-left: auto;
    align-self: center;
  }
  .NavbarLink-toggle {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    .Navbar__Items,
    .Navbar {
      flex-direction: column;
    }
    .Navbar__Items {
      display: none;
    }
    .Navbar__Items--right {
      margin-left: 0;
    }
    .Navbar__ToggleShow {
      display: flex;
      height: 158px;
      flex-direction: row;
      position: absolute;
      right: 69px;
      top: 30px;
    }
    .NavbarLink-toggle {
      align-self: flex-end;
      color: #083d77;
      display: initial;
      align-self: center;
      font-size: 2.5rem;
      cursor: pointer;
    }
  }
`;

const Hr = styled.hr`
  border-color: #083d77;
  width: 150%;
  position: absolute;
  top: 70px;
  left: 0;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
