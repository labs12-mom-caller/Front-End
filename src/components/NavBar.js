/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Link, navigate } from '@reach/router';
import { logout } from '../app/utils';

const NavbarPage = ({ user }) => {
  const logoutHandler = e => {
    e.preventDefault();
    window.localStorage.clear();
    logout();
    navigate('/');
  };

  return (
    <Container>
      <Name>
        <BrandLink to='/'>ReCaller</BrandLink>
      </Name>
      <Nav>
        <li>
          <BrandLink to={`/account/${user.uid}`}>Update Account</BrandLink>
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
    </Container>
  );
};

const Name = styled.h1`
  grid-column: 1 / span 1;
  margin-top: 7px;
  margin-left: 13px;
  padding: 5px;
  a {
    color: #636578;
    font-family: 'Pacifico';
    font-size: 4rem;
  }
`;
const VL = styled.div`
  border-left: 1px solid #999999;
  height: 25px;
  top: 2.4%;
`;

const BrandLink = styled(Link)`
  font-size: 1.7rem;
  &:hover {
    color: #ff6f61;
  }
  @media (max-width: 460px) {
    font-size: 1.4rem;
  }
`;

const Container = styled.div`
  border-bottom: 0.5px solid #000000;
  display: flex;
  margin-bottom: 2%;

  @media (max-width: 460px) {
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    padding: 1rem;
    border: none;
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
  @media (max-width: 460px) {
    display: flex;
    justify-content: center;
    align-items: center;
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
