/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { navigate, Link } from '@reach/router';

import { firebase } from '../../firebase';

import logo from '../../assets/images/icons8-google.svg';

import { Wrapper } from '../../styles/Login';
import { Form } from '../../styles/Form';

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
    <Wrapper>
      <h1>ReCaller</h1>
      <p>
        Sign in to review your previous calls or schedule calls with more
        people!
      </p>
      <Form>
        <label htmlFor='email' className='sr'>
          Your E-mail Address
        </label>
        <input
          type='text'
          id='email'
          onChange={e => setEmail(e.target.value)}
          value={email}
          placeholder='Email Address'
        />
        <label htmlFor='password' className='sr'>
          Your Password
        </label>
        <input
          type='password'
          onChange={e => setPassword(e.target.value)}
          value={password}
          placeholder='Password'
        />
        <button type='button' onClick={handleSignIn}>
          Sign In
        </button>
        <button type='button' onClick={handleGoogleSignIn}>
          <img src={logo} alt='Google Logo' />
          Sign In with Google
        </button>
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
  );
};

export default Login;
