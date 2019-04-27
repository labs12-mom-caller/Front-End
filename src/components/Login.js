// This is our main login component

import React from 'react';
import { Formik } from 'formik';
import firebase from 'firebase';
import Wrapper from '../styles/Login';
import { db } from '../firebase';

function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  console.log(email, password, 'state');

  const [authError, setAuthError] = React.useState(null);
  const [hasAccount, setHasAccount] = React.useState(null);

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };

  return (
    <Wrapper>
      <h1>ReCaller!</h1>
      {!hasAccount && (
        <button
          className='login-toggle-btn'
          onClick={() => setHasAccount(true)}
          onKeyDown={() => setHasAccount(true)}
        >
          Already have an account? Sign in! {'🌋'}
        </button>
      )}
      {!hasAccount && (
        <>
          <button type='button' onClick={handleSignIn}>
            Sign up with Google
          </button>
          <Formik
            className='formik'
            initialValues={{
              email: 'G@g.com',
              phoneNumber: '1234567890',
              password: '123456',
              displayName: '',
            }}
            validate={values => {
              const errors = {};
              if (!values.password) {
                errors.password = 'Required';
              }
              if (!values.phoneNumber) {
                errors.phoneNumber = 'Required';
              }
              if (!values.email) {
                errors.email = 'Required';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Invalid email address';
                errors.password = 'Password should be at least 6 characters';
                errors.phoneNumber = 'Phone number is invalid';
              }
              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              setTimeout(() => {
                console.log(values);
                handleSubmit(values);
                setSubmitting(false);
              }, 400);
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit}>
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  type='name'
                  name='displayName'
                  placeholder='displayName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.displayName}
                />
                {errors.email && touched.email && errors.email}
                <input
                  pattern='[1-9]{1}[0-9]{9}'
                  type='text'
                  name='phoneNumber'
                  placeholder='Phone'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.phoneNumber}
                />
                {errors.phoneNumber &&
                  touched.phoneNumber &&
                  errors.phoneNumber}
                <input
                  type='password'
                  name='password'
                  placeholder='Password'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />
                {errors.password && touched.password && errors.password}
                <button
                  className='signup-submit-btn'
                  type='submit'
                  disabled={isSubmitting}
                >
                  Sign Up
                </button>
              </form>
            )}
          </Formik>
        </>
      )}

      {hasAccount && (
        <button
          className='login-toggle-btn'
          onKeyDown={() => setHasAccount(true)}
          onClick={() => setHasAccount(null)}
        >
          {'🔙'} to sign up page !
        </button>
      )}
      {hasAccount && (
        <>
          <button onClick={handleSignIn}>Sign in with Google</button>
          <form>
            <input
              className='signin-input'
              type='text'
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder='email'
            />
            <input
              className='signin-input'
              type='text'
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder='password'
            />
          </form>
          <button
            type='button'
            onClick={() =>
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                  console.log(`Error ${error.message}`);
                })
            }
          >
            Sign in {'🎈'}
          </button>
        </>
      )}

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
}

const handleSubmit = async values => {
  console.log(values);
  const formattedPhone = String('+1').concat(
    String(values.phoneNumber).replace(/[^\d]/g, ''),
  );
  // const userEmail = 'bobrssss@bob.com';
  // const password = '123456';
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(values.email, values.password);
    const ref = db.doc(`users/${user.uid}`);
    const { email, photoURL } = user;
    ref.set({
      displayName: values.displayName,
      photoURL,
      email: values.email,
      phoneNumber: formattedPhone,
    });
    console.log(user, '$$$$$$');
    user.updateProfile({ displayName: values.displayName });
  } catch (error) {
    alert(error);
  }
};

export default Login;
