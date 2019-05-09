import styled from 'styled-components';

import bg from '../assets/images/womanOnPhone.jpg';

export const LandingTopPage = styled.div`
  width: 100%;
  height: ${props => props.correctHeight}px;
  background: linear-gradient(rgba(99, 101, 120, 0.6), rgba(99, 101, 120, 0.6)),
    url(${bg});
  background-size: cover;
  /* background-position-x: -150px; */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  font-family: 'Roboto', sans-serif;

  h1 {
    font-family: 'Pacifico', cursive;
    font-size: 4rem;
    color: #fff;
    margin-top: 40px;
    user-select: none;
  }

  nav {
    display: none;
  }

  main {
    display: flex;
    flex-direction: column;
    align-items: center;

    .learn-more {
      font-size: 1.5rem;
      width: 40%;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }

  @media only screen and (max-width: 600px) {
    background-position-x: -295px;
  }
`;

export const Header2 = styled.h2`
  color: #fff;
  font-size: 2.5rem;
  font-weight: 500;
  margin: 20px 20px 10px;

  @media only screen and (max-width: 600px) {
    font-size: 2rem;
  }
`;

export const Ptag = styled.p`
  color: #fff;
  font-size: 2.5rem;
  margin: 10px 20px;
  text-align: center;

  @media only screen and (max-width: 600px) {
    font-size: 1.5rem;
  }
`;

export const Button = styled.button`
  cursor: pointer;
  color: #fff;
  background: #ee6352;
  border: none;
  font-size: 1.8rem;
  padding: 10px;
  margin: 20px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media only screen and (max-width: 600px) {
    font-size: 1rem;
    padding: 10px;
  }
`;
