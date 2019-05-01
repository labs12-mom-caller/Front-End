// This is our main login component
import React, { useState } from 'react';
import { Formik } from 'formik';
import { MDBIcon, MDBBtn } from 'mdbreact';
import firebase from 'firebase';
import { signup } from '../app/utils';
// style imports
import { Wrapper } from '../styles/Login';
import {
  DefaultButtonRed,
  DefaultButtonBlue,
  DefaultInput,
  FormikWrapper,
} from '../styles/styledDefaultComponents';

function Login() {
  // state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState(null);
  const [hasAccount, setHasAccount] = useState(null);

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
        <DefaultButtonBlue type='button' onClick={() => setHasAccount(true)}>
          Already have an account? Sign in! {'🌋'}
        </DefaultButtonBlue>
      )}
      {!hasAccount && (
        <>
          {/* <DefaultButtonRed type='button' onClick={handleSignIn}>
            Sign up with Google
          </DefaultButtonRed> */}
          <MDBBtn
            color='red'
            social='g'
            style={{ textTransform: 'capitalize' }}
            onClick={handleSignIn}
          >
            <MDBIcon fab icon='google' className='pr-1' /> Google Signin
          </MDBBtn>

          <FormikWrapper>
            <Formik
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
                  signup(values);
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
              }) => (
                <form onSubmit={handleSubmit}>
                  <DefaultInput
                    type='email'
                    name='email'
                    placeholder='Email'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.email}
                  />
                  <DefaultInput
                    type='name'
                    name='displayName'
                    placeholder='displayName'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.displayName}
                  />
                  {errors.email && touched.email && errors.email}
                  <DefaultInput
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
                  <DefaultInput
                    type='password'
                    name='password'
                    placeholder='Password'
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  {errors.password && touched.password && errors.password}
                  <DefaultButtonRed type='submit' disabled={isSubmitting}>
                    Submit
                  </DefaultButtonRed>
                </form>
              )}
            </Formik>
          </FormikWrapper>
        </>
      )}
      {hasAccount && (
        <DefaultButtonBlue type='button' onClick={() => setHasAccount(null)}>
          {'🔙'} to sign up page !
        </DefaultButtonBlue>
      )}
      {hasAccount && (
        <>
          <MDBBtn
            color='red'
            social='g'
            style={{ textTransform: 'capitalize' }}
            onClick={handleSignIn}
          >
            <MDBIcon fab icon='google' className='pr-1' /> Google Login
          </MDBBtn>

          <form>
            <DefaultInput
              type='text'
              onChange={e => setEmail(e.target.value)}
              value={email}
              placeholder='email'
            />
            <DefaultInput
              type='text'
              onChange={e => setPassword(e.target.value)}
              value={password}
              placeholder='password'
            />

            <DefaultButtonRed
              type='button'
              onClick={() =>
                firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .catch(function catchError(error) {
                    console.log(`Error ${error.message}`);
                  })
              }
            >
              Sign in {'🎈'}
            </DefaultButtonRed>
          </form>
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

export default Login;
