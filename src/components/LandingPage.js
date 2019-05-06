import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';

import { styles, DefaultButtonRedBG } from '../styles/styledDefaultComponents';
import img from '../assets/images/womanOnPhone.jpg';

const MobileLandingPage = props => {
  return (
    <MobileLandingPageContainer
      img={img}
      style={{
        background: `linear-gradient(rgba(8,61,119,.6), rgba(8,61,119,.3)), url(${img})center/cover fixed no-repeat`,
      }}
    >
      <h1 className='heading'>recaller</h1>
      <div className='flexIt'>
        <h3 className='subheading'>stay connected</h3>
        <p className='text'>Never forget to call your loved ones again.</p>
        <Link to='/signup'>
          <DefaultButtonRedBG className='custom'>
            get started
          </DefaultButtonRedBG>
        </Link>
      </div>
    </MobileLandingPageContainer>
  );
};

export default MobileLandingPage;

const MobileLandingPageContainer = styled.main`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  text-align: center;
  .flexIt {
    display: flex;
    flex-direction: column;
    align-items: center;
    .subheading {
      color: ${styles.colors.mainWhite};
      font-size: 2rem;
      text-transform: capitalize;
      font-weight: 700;
      letter-spacing: 0.1rem;
      line-height: 1rem;
    }
    .text {
      color: ${styles.colors.mainWhite};
      font-size: 1.5rem;
      margin-top: 2%;
      letter-spacing: 0.1rem;
    }
    .custom {
      margin-top: 15%;
      margin-bottom: 8%;
    }
  }
  .heading {
    color: ${styles.colors.mainWhite};
    ${styles.logoText};
    text-transform: capitalize;
    font-size: 4rem;
    margin-top: 7%;
  }
`;
