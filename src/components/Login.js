import React, { useState } from 'react';
import { Formik } from 'formik';
// import { MDBIcon, MDBBtn } from 'mdbreact';
import firebase from 'firebase';
import { signup } from '../app/utils';
// style imports
// import { Wrapper } from '../styles/Login';
import logo from '../assets/images/icons8-google.svg';
import styled from 'styled-components';
import {
  DefaultButtonRed,
  DefaultButtonBlue,
  DefaultInput,
  FormikWrapper,
  DefaultButtonRedBG,
  DefaultButtonBlueBG,
  styles,
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
    <WrapperDiv>
      <h1 className='loginHeader'>ReCaller!</h1>
      {!hasAccount && (
        <>
          {/* <MDBBtn
            color='red'
            social='g'
            style={{ textTransform: 'capitalize' }}
            onClick={handleSignIn}
          >
            <MDBIcon fab icon='google' className='pr-1' /> Google Signin
          </MDBBtn> */}

          <FormikWrapper>
            <Formik
              initialValues={{
                email: '',
                phoneNumber: '',
                password: '',
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
                    placeholder='display Name'
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
                  <DefaultButtonBlueBG
                    className='submitCustomBtn'
                    type='submit'
                    disabled={isSubmitting}
                  >
                    Submit
                  </DefaultButtonBlueBG>
                </form>
              )}
            </Formik>
          </FormikWrapper>
          <DefaultButtonBlueBG
            type='button'
            onClick={handleSignIn}
            className='signUpBtnG'
          >
            <img src={logo} alt='google logo' className='logo' />
            <p className='signUpText'>Sign up with Google</p>
          </DefaultButtonBlueBG>
          {!hasAccount && (
            //   <DefaultButtonBlue
            //     type='button'
            //     onClick={() => setHasAccount(true)}
            //   >
            //     Already have an account? Sign in! {'🌋'}
            //   </DefaultButtonBlue>
            // )}
            <p className='haveAccountText'>
              already have an account?{' '}
              <span onClick={() => setHasAccount(true)} className='signInSpan'>
                sign in!
              </span>
            </p>
          )}
        </>
      )}
      {hasAccount && (
        <DefaultButtonBlue type='button' onClick={() => setHasAccount(null)}>
          {'🔙'} to sign up page !
        </DefaultButtonBlue>
      )}
      {hasAccount && (
        <>
          <DefaultButtonRedBG onClick={handleSignIn}>
            google login
          </DefaultButtonRedBG>
          {/* <MDBBtn
            color='red'
            social='g'
            style={{ textTransform: 'capitalize' }}
            onClick={handleSignIn}
          >
            <MDBIcon fab icon='google' className='pr-1' /> Google Login
          </MDBBtn> */}

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
    </WrapperDiv>
  );
}

export default Login;

const WrapperDiv = styled.div`
  border: 1px solid green;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  min-height: 100vh;
  .loginHeader {
    ${styles.logoText};
    margin-top: 8%;
    font-size: 5rem;
    color: ${styles.colors.mainBlue};
  }
  .signUpBtnG {
    display: flex;
    align-items: center;
    justify-content: center;
    .logo {
      max-width: 30px;
      max-height: 30px;
      margin-right: 8%;
    }
    .signUpText {
      font-size: 1rem;
      text-transform: capitalize;
      margin-bottom: 0;
      letter-spacing: 0.1rem;
    }
  }
  .submitCustomBtn {
    font-size: 1rem;
    letter-spacing: 0.1rem;
    font-weight: 700;
    text-transform: uppercase;
  }
  .haveAccountText {
    text-transform: capitalize;
    font-size: 1rem;
    font-weight: 700;
    color: ${styles.colors.mainBlue};
    word-spacing: 0.1rem;
    .signInSpan {
      color: ${styles.colors.redOrange};
      font-size: 1.2rem;
    }
  }
`;
