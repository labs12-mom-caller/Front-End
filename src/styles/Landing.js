import styled from 'styled-components';

import bg from '../assets/images/womanOnPhone.jpg';

export const LandingTopPage = styled.div`
  width: 100%;
  height: ${props => props.correctHeight}px;
  background: linear-gradient(rgba(99, 101, 120, 0.6), rgba(99, 101, 120, 0.6)),
    url(${bg});
  background-size: cover;
  background-position-x: -150px;
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

    h2 {
      color: #fff;
      font-size: 2.5rem;
      font-weight: 500;
      margin: 20px 20px 10px;
    }

    p {
      color: #fff;
      font-size: 2rem;
      margin: 10px 20px;
      text-align: center;
    }

    .learn-more {
      font-size: 1.5rem;
      width: 40%;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    button {
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
    }
  }
`;
