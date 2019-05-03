/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState } from 'react';
import { Formik } from 'formik';
import firebase from 'firebase';
import { MDBCol, MDBContainer, MDBRow, MDBFooter } from 'mdbreact';
import { TiArrowLeftThick } from 'react-icons/ti';
import styled from 'styled-components';
import { signup } from '../app/utils';
import img from '../assets/images/womanOnPhone.jpg';
import logo from '../assets/images/icons8-google.svg';
import {
  // DefaultButtonRed,
  // DefaultButtonBlue,
  DefaultInput,
  FormikWrapper,
  // DefaultButtonRedBG,
  DefaultButtonBlueBG,
  styles,
} from '../styles/styledDefaultComponents';

const isMobile = window.innerWidth <= 768;

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
    <div>
      <WrapperDiv>
        {!hasAccount && (
          <>
            <h1 className='loginHeader'>ReCaller</h1>
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
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(
                      values.email,
                    )
                  ) {
                    errors.email = 'Invalid email address';
                    errors.password =
                      'Password should be at least 6 characters';
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
                    <DefaultButtonBlueBG
                      type='button'
                      onClick={handleSignIn}
                      className='signUpBtnG'
                    >
                      <img src={logo} alt='google logo' className='logo' />
                      <p className='signUpText'>Sign up with Google</p>
                    </DefaultButtonBlueBG>
                  </form>
                )}
              </Formik>
            </FormikWrapper>
            {!hasAccount && (
              <p className='haveAccountText'>
                already have an account?{' '}
                <span
                  onClick={() => setHasAccount(true)}
                  className='signInSpan'
                >
                  Log In
                </span>
              </p>
            )}
          </>
        )}
        <div className='signInContainer'>
          {/* {hasAccount && (
            <DefaultButtonBlueBG
              className='backSignUp'
              type='button'
              onClick={() => setHasAccount(null)}
            >
              <TiArrowLeftThick className='backLogo' />{' '}
              <p className='backBtnText'>to sign up page !</p>
            </DefaultButtonBlueBG>
          )} */}

          {hasAccount && (
            <>
              {/* <DefaultButtonBlueBG
                className='googleLogin'
                onClick={handleSignIn}
              >
                google login
              </DefaultButtonBlueBG> */}
              <form className='signInForm'>
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

                <DefaultButtonBlueBG
                  type='button'
                  className='signInButton'
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
                </DefaultButtonBlueBG>
                <DefaultButtonBlueBG
                  className='googleLogin'
                  onClick={handleSignIn}
                >
                  google login
                </DefaultButtonBlueBG>
                {hasAccount && (
                  <p className='haveAccountText'>
                    Don't have an account?{' '}
                    <span
                      style={{ color: '#FF6F61' }}
                      onClick={() => setHasAccount(false)}
                      className='signInSpan'
                    >
                      Sign Up
                    </span>
                  </p>
                )}
              </form>
            </>
          )}
          {/* Eventually impement this */}
          {/* {hasAccount && (
          <p className='haveAccountText'>
                don't have an account?{' '}
                <span
                  onClick={() => setHasAccount(false)}
                  className='signInSpan'
                >
                  sign up!
                </span>
              </p>
          )} */}
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
}

export default Login;

const WrapperDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  /* min-height: 100vh; */
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
      align-self: flex-start;
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
      position: absolute;
      right: 17%;
      top: 27%;
      display: flex;
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
      border-radius: 40px;
    }
    .logo {
      max-width: 30px;
      max-height: 30px;
      margin-right: 1%;
      @media (min-width: 992px) {
        margin-right: 3%;
        min-width: 120px;
        min-height: 120px;

        border-radius: 50%;
        background-color: #f3f3f3;
        border: 15px solid #f3f3f3;
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
    margin-bottom: 8%;
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
    @media (min-width: 992px) {
      width: 40%;
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
      @media (min-width: 992px) {
        width: 40%;
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
    margin-top: 8%;
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
    @media (min-width: 992px) {
      width: 40%;
    }
  }
`;
