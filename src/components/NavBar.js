/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import { logout } from '../app/utils';

const NavbarPage = ({ user }) => {
  const [show, setShow] = useState(false);

  const toggleNav = () => {
    setShow(!show);
  };

  const logoutHandler = e => {
    e.preventDefault();
    window.localStorage.clear();
    logout();
    navigate('/');
  };

  return (
    <Container className={show ? 'NavbarShow' : null}>
      <Name>
        <BrandLink to='/'>ReCaller</BrandLink>
      </Name>
      <Nav
        className={
          show
            ? 'Navbar__Items Navbar__ToggleShow'
            : 'Navbar__Items Navbar__Items--right'
        }
      >
        <li>
          <BrandLink to={`/account/${user.uid}`}>Account</BrandLink>
        </li>
        <li>
          <VL />
        </li>
        <li>
          <BrandLink to='/' onClick={logoutHandler}>
            Sign Out
          </BrandLink>
        </li>
      </Nav>
      <Hamburger
        onClick={() => toggleNav()}
        className='NavbarLink NavbarLink-toggle'
      >
        <i className='fas fa-bars' />
      </Hamburger>
    </Container>
  );
};

const Name = styled.h1`
  grid-column: 1 / span 1;
  margin-top: 7px;
  margin-left: 13px;
  padding: 5px;
  a {
    color: #083d77;
    font-family: 'Pacifico';
    font-size: 42px;
  }
`;
const VL = styled.div`
  border-left: 1px solid #999999;
  height: 25px;
  top: 2.4%;
`;

const BrandLink = styled(Link)`
  &:hover {
    color: #ff6f61;
  }
`;
const Hamburger = styled.div`
  i {
    &:hover {
      color: #ff6f61;
    }
  }
`;

const Container = styled.div`
  border-bottom: 0.5px solid #000000;
  display: grid;
  grid-column: 1 / -1;
  margin-bottom: 2%;

  .NavbarLink-toggle {
    display: none;
  }

  @media only screen and (max-width: 600px) {
    border-bottom: none;
    .Navbar__ToggleShow {
      display: flex;
      height: 158px;
      flex-direction: row;
      position: absolute;
      right: 4px;
      top: -2px;
    }
    .NavbarLink-toggle {
      color: #083d77;
      display: initial;
      font-size: 2.5rem;
      cursor: pointer;
      position: absolute;
      right: 4%;
      top: 1.5%;
    }
  }
`;
const Nav = styled.nav`
  display: flex;
  width: 100%;
  grid-column: 3 / span 2;
  justify-content: flex-end;
  align-items: center;
  list-style: none;
  a {
    color: #999999;
    font-weight: 550;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    margin: 0 5px;
    padding: 3px;
  }
  @media only screen and (max-width: 850px) {
    position: absolute;
    right: 3%;
    top: 3%;
  }
  @media only screen and (max-width: 600px) {
    display: none;
    a {
      font-size: 0.8rem;
    }
    .Navbar__ToggleShow {
      display: flex;
      height: 158px;
      font-size: 1rem;
      flex-direction: row;
      position: absolute;
      right: 69px;
      top: -45px;
    }
    .NavbarLink-toggle {
      color: #083d77;
      display: initial;
      font-size: 2.5rem;
      cursor: pointer;
      position: absolute;
      right: 4%;
      top: 1.5%;
    }
  }
`;

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
