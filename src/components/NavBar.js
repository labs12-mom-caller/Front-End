/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import { logout } from '../app/utils';

const NavbarPage = ({ user }) => {
  console.log(user, 'ello!');
  const [collapseId, setCollapseId] = useState('');

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
    <Container>
      <Name>
        <Link to='/'>ReCaller</Link>
      </Name>
      <Nav>
        <li>
          <Link to={`/account/${user.uid}`}>Account</Link>
        </li>
        <li>
          <VL />
        </li>
        <li>
          <Link to='/' onClick={logoutHandler}>
            Sign Out
          </Link>
        </li>
      </Nav>
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
  position: absolute;
  right: 4.8%;
  margin-left: -3px;
  top: 2.4%;
`;
const Container = styled.div`
  border: 0.5px solid #000000;
  display: grid;
  grid-column: 1 / -1;
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
