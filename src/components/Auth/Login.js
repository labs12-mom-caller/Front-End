/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import firebase from 'firebase';
import { navigate, Link } from '@reach/router';
import styled from 'styled-components';
import bottomImg from '../../assets/images/festivities.svg';
// import logo from '../../assets/images/icons8-google.svg';
import {
  DefaultInput,
  DefaultButtonBlueBG,
  styles,
} from '../../styles/styledDefaultComponents';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(false);

  const provider = new firebase.auth.GoogleAuthProvider();

  const handleSignIn = e => {
    e.preventDefault();
    return firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        setEmail('');
        setPassword('');
        setTimeout(() => {
          navigate(`/`);
        }, 500);
      })
      .catch(err => {
        setAuthError(true);
        console.log(`Error code: ${err.code}, Message: ${err.message}`);
      });
  };

  const handleGoogleSignIn = e => {
    e.preventDefault();
    return firebase
      .auth()
      .signInWithPopup(provider)
      .then(result => {
        setEmail('');
        setPassword('');
        navigate(`/`);
      })
      .catch(err => {
        setAuthError(true);
        console.log(`Error code: ${err.code}, Message: ${err.message}`);
      });
  };

  return (
    <div>
      <WrapperDiv>
        <div className='signInContainer'>
          <div className='hasAccount' style={{ justifyContent: 'center' }}>
            <h1 className='loginHeader' style={{ marginBottom: '10%' }}>
              ReCaller
            </h1>
            <form
              className='signInForm'
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-evenly',
                alignItems: 'center',
                height: '60vh',
              }}
            >
              <DefaultInput
                type='text'
                onChange={e => setEmail(e.target.value)}
                value={email}
                placeholder='email'
              />
              <DefaultInput
                type='password'
                onChange={e => setPassword(e.target.value)}
                value={password}
                placeholder='password'
              />
              <DefaultButtonBlueBG
                type='button'
                className='signInButton'
                onClick={handleSignIn}
              >
                Sign in
              </DefaultButtonBlueBG>
              <DefaultButtonBlueBG
                className='googleLogin'
                onClick={handleGoogleSignIn}
              >
                google login
              </DefaultButtonBlueBG>
              <img
                src={bottomImg}
                className='bottomImg'
                style={{ marginTop: '5%' }}
                alt='Trees'
              />
              <p className='haveAccountText'>
                Don&apos;t have an account?{' '}
                <Link to='/signup' className='signInSpan'>
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
        {authError && (
          <div>
            <p>Sorry, there was a problem</p>
            <p>
              <i>{authError.message}</i>
            </p>
            <p>Please try again</p>
          </div>
        )}
      </WrapperDiv>
    </div>
  );
};
export default Login;
const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  @media (min-width: 768px) {
    /* justify-content: unset; */
    /* min-height: 50vh; */
  }
  .loginHeader {
    ${styles.logoText};
    font-size: 5rem;
    color: ${styles.colors.mainBlue};
    @media (min-width: 992px) {
      /* justify-content: space-between; */
      /* align-self: baseline; */
      /* margin-top: 0; */
      /* margin-bottom: 10%; */
      /* margin-left: 5%; */
      /* padding-bottom: 21%; */
      /* position: absolute;
      top: 2%;
      left: 2%; */
      /* align-self: flex-start; */
      margin-top: 5%;
    }
  }
  .signUpBtnG {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
    @media (min-width: 768px) {
      width: 70%;
    }
    @media (min-width: 992px) {
      /* position: absolute; */
      /* right: 17%; */
      /* top: 27%; */
      /* display: flex;
      flex-direction: column-reverse;
      margin: 1rem auto;
      border: 2px solid ${styles.colors.mainBlue};
      width: 20%;
      height: 25%;
      padding: 10% 0;
      color: ${styles.colors.mainBlue};
      background-color: white;
      font-size: 1rem;
      text-transform: capitalize;
      font-weight: 700;
      border-radius: 40px; */
    }
    .logo {
      max-width: 30px;
      max-height: 30px;
      margin-right: 1%;
      @media (min-width: 992px) {
        /* margin-right: 3%;
        min-width: 120px;
        min-height: 120px;
        border-radius: 50%;
        background-color: #f3f3f3;
        border: 15px solid #f3f3f3; */
      }
    }
    .signUpText {
      font-size: 1rem;
      text-transform: capitalize;
      margin-bottom: 0;
      /* letter-spacing: 0.1rem; */
      @media (min-width: 992px) {
        width: 60%;
      }
    }
  }
  .bottomImg {
    max-width: 200px;
    max-height: 200px;
    margin-bottom: 8%;
    @media (min-width: 992px) {
      margin-bottom: 5%;
    }
    @media (min-width: 1600px) {
      margin-bottom: 2%;
    }
  }
  .submitCustomBtn {
    font-size: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 700;
    text-transform: uppercase;
    min-width: 70%;
    margin-bottom: 0;
    @media (min-width: 992px) {
      min-width: 0px;
      width: 142px;
      height: 50px;
      border-radius: 50px;
      background: ${styles.colors.redOrange};
      &:hover {
        background: white;
        color: ${styles.colors.redOrange};
        border: 2px solid ${styles.colors.redOrange};
      }
    }
  }
  .haveAccountText {
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 700;
    color: ${styles.colors.mainBlue};
    word-spacing: 0.1rem;
    /* margin-bottom: 8%; */
    /* margin-top: 35%; */
    @media (min-width: 768px) {
      font-size: 1.5rem;
      /* display: none; */
    }
    @media (min-width: 992px) {
      /* display: none; */
    }
    @media (min-width: 1500px) {
      /* display: none; */
    }
    .signInSpan {
      color: ${styles.colors.redOrange};
      font-size: 1.2rem;
      @media (min-width: 768px) {
        font-size: 1.5rem;
      }
    }
  }
  .backSignUp {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 2% auto;
    width: 60%;
    @media (min-width: 768px) {
      width: 60%;
    }
    @media (min-width: 992px) {
      width: 40%;
    }
    .backLogo {
      max-width: 30px;
      max-height: 30px;
      margin-right: 5%;
      font-size: 1.5rem;
    }
    .backBtnText {
      margin: 0;
      letter-spacing: 0.1rem;
      text-transform: capitalize;
    }
  }
  .googleLogin {
    letter-spacing: 0.1rem;
    margin: 2% auto;
    width: 60%;
    @media (min-width: 768px) {
      width: 50%;
    }
    @media (min-width: 992px) {
      width: 40%;
    }
    @media (min-width: 1200px) {
      width: 30%;
    }
  }
  .signInForm {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    input {
      width: 60%;
      @media (min-width: 768px) {
        width: 50%;
      }
      @media (min-width: 992px) {
        width: 40%;
      }
      @media (min-width: 1200px) {
        width: 30%;
      }
    }
  }
  .signInContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: space-evenly;
    min-width: 100%;
    /* margin-top: -100px; */
    /* margin-top: 8%; */
    @media (min-width: 992px) {
      .loginHeader2 {
        /* margin-left: 35%; */
        ${styles.logoText}
        font-size: 5rem;
        color: ${styles.colors.mainBlue};
      }
    }
  }
  .signInButton {
    width: 60%;
    /* margin-top: 8%; */
    @media (min-width: 768px) {
      width: 50%;
    }
    @media (min-width: 992px) {
      width: 40%;
    }
    @media (min-width: 1200px) {
      width: 30%;
    }
  }
  .hasAccount {
    display: flex;
    flex-direction: column;
    justify-content: unset;
    align-items: center;
    /* border: 1px solid red; */
    min-height: 100vh;
  }
`;
