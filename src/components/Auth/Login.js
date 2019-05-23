/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { navigate, Link } from '@reach/router';
import styled from 'styled-components';
import { useLocalStorageState } from '../../app/utils';
import { firebase } from '../../firebase';
import logo from '../../assets/images/icons8-google.svg';
import { Wrapper } from '../../styles/Login';
import { Form } from '../../styles/Form';
import {
  Container,
  Section,
  Img,
  H2,
  Info,
} from '../../styles/Scheduler/index';
import loginSvg from '../../assets/svg/undrawLogin.svg';

const Login = () => {
  const [email, setEmail] = useLocalStorageState('email', '');
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
        setTimeout(() => {
          navigate(`/`);
        }, 500);
      })
      .catch(err => {
        setAuthError(true);
        console.log(`Error code: ${err.code}, Message: ${err.message}`);
      });
  };

  return (
    <Container>
      <Section className='signup-img'>
        <Img src={loginSvg} alt='Woman looking at schedule' />
      </Section>
      <Wrapper>
        <Header>
          <H2>Login</H2>
        </Header>
        <Form>
          <label htmlFor='email' className='sr'>
            Your E-mail Address
          </label>
          <input
            style={{ width: '82%' }}
            type='email'
            id='email'
            data-testid='email'
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder='Email Address'
          />
          <label htmlFor='password' className='sr'>
            Your Password
          </label>
          <input
            type='password'
            id='password'
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder='Password'
          />
          <SignupButton type='button' onClick={handleSignIn}>
            Sign In
          </SignupButton>
          <GoogleButton
            type='button'
            data-testid='button'
            onClick={handleGoogleSignIn}
          >
            <img src={logo} alt='Google Logo' />
            Sign In with Google
          </GoogleButton>
          <p>
            Don&apos;t have an account?{' '}
            <Link to='/signup' className='signInSpan'>
              Sign Up
            </Link>
          </p>
        </Form>
        {authError && (
          <div>
            <p>Sorry, there was a problem</p>
            <p>
              <i>{authError.message}</i>
            </p>
            <p>Please try again</p>
          </div>
        )}
      </Wrapper>
    </Container>
  );
};
const GoogleButton = styled.button`
  height: 40px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;

  img {
    height: 90%;
  }
  width: 82%;
  height: 40px;
  background: #ffffff;
  color: #000000;
  border-radius: 2px;
  font-weight: 300;
  font-size: 1.4rem;
  transition: all 0.4s ease;
  outline: 0;
  &:hover {
    background-color: #ffffff;
    color: #ff6f61;
    border: 1px solid #ff6f61;
    cursor: pointer;
    transition: all 0.4s ease;
  }
  box-shadow: 1px 1px 0px 1px rgba(0, 0, 0, 0.05);
  transition-property: background-color, box-shadow;
  transition-duration: 150ms;
  transition-timing-function: ease-in-out;
  border: 1px solid #636578;
`;
const SignupButton = styled.button`
  height: 40px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  margin-bottom: 10px;
  border: none;

  img {
    height: 90%;
  }
  width: 82%;
  height: 40px;
  background-color: #636578;
  color: white;
  border-radius: 2px;
  font-size: 1.4rem;
  transition: all 0.4s ease;
  outline: 0;
  &:hover {
    background-color: #ffffff;
    color: #636578;
    border: 1px solid #636578;
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 75%;
  p {
    font-size: 1.5rem;
    text-align: center;
  }
`;
export default Login;
