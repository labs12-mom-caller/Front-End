import React from 'react';
import styled from 'styled-components';

import { Link } from '@reach/router';

const LandingNavbar = () => {
  return (
    <Container>
      <Name>
        <BrandLink to='/'>ReCaller</BrandLink>
      </Name>
      <Nav>
        <li>
          <BrandLink to='/signup'>Create Account</BrandLink>
        </li>
        <li>
          <VL />
        </li>
        <li>
          <BrandLink to='/login'>Login</BrandLink>
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

const Container = styled.header`
  padding: 5px 5%;
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
    font-family: Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans',
      'Helvetica Neue', sans-serif;
    margin: 0 5px;
    padding: 3px;
  }
  @media (max-width: 460px) {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export default LandingNavbar;
