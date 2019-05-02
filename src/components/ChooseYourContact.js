import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { navigate } from '@reach/router';
import { Formik } from 'formik';
import { signupUserTwo } from '../app/utils';
import NavBar from './NavBar';
import styled from 'styled-components';
import { styles } from '../styles/styledDefaultComponents';
// import { Wrapper } from '../styles/Login';

function Choose({ user, userId }) {
  return (
    <Wrapper>
      <NavBar />
      <div className='heading'>Hello {user.displayName} </div>
      <div className='app'>
        <h1 className='choose'>Choose Your Loved One</h1>
        <Formik
          initialValues={{
            email: '',
            name: '',
            phoneNumber: '',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              signupUserTwo(values);
              setSubmitting(false);
              navigate(`/choose/${userId}/${user.uid}/call-plan`);
            }, 500);
          }}
          validationSchema={Yup.object().shape({
            email: Yup.string()
              .email()
              .required('Required'),
            name: Yup.string()
              .min(2, 'Too Short!')
              .max(50, 'Too Long!')
              .required('Required'),
            phoneNumber: Yup.number().required('Required'),
          })}
        >
          {props => {
            const {
              values,
              touched,
              errors,
              dirty,
              isSubmitting,
              handleChange,
              handleBlur,
              handleSubmit,
              handleReset,
            } = props;
            return (
              <form onSubmit={handleSubmit}>
                <label htmlFor='email' style={{ display: 'block' }}>
                  Email
                </label>
                <input
                  id='email'
                  placeholder='Enter your email'
                  type='text'
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.email && touched.email
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.email && touched.email && (
                  <div className='input-feedback'>{errors.email}</div>
                )}
                <label htmlFor='name' style={{ display: 'block' }}>
                  Name
                </label>
                <input
                  id='name'
                  placeholder='Enter your name'
                  type='text'
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.name && touched.name
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.name && touched.name && (
                  <div className='input-feedback'>{errors.name}</div>
                )}
                <label htmlFor='phoneNumber' style={{ display: 'block' }}>
                  Phone Number
                </label>
                <input
                  id='phoneNumber'
                  placeholder='Enter your number'
                  type='number'
                  value={values.phoneNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={
                    errors.phoneNumber && touched.phoneNumber
                      ? 'text-input error'
                      : 'text-input'
                  }
                />
                {errors.phoneNumber && touched.phoneNumber && (
                  <div className='input-feedback'>{errors.phoneNumber}</div>
                )}
                <div className='buttonWrapper'>
                  <button
                    type='button'
                    className='reset'
                    onClick={handleReset}
                    disabled={!dirty || isSubmitting}
                  >
                    Reset
                  </button>
                  <button
                    type='submit'
                    className='submit'
                    disabled={isSubmitting}
                  >
                    Submit
                  </button>
                </div>
              </form>
            );
          }}
        </Formik>
      </div>
    </Wrapper>
  );
}
export default Choose;
Choose.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  values: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.number,
  }),
  touched: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.number,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    name: PropTypes.string,
    phoneNumber: PropTypes.number,
  }),
  dirty: PropTypes.bool,
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  handleReset: PropTypes.func,
  userId: PropTypes.string,
};

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: unset;
  align-items: center;
  min-height: 100vh;
  .container {
    margin-top: 5%;
    margin-bottom: 5%;
  }
  .heading {
    font-size: 1.5rem;
    color: ${styles.colors.mainBlue};
    margin-bottom: 5%;
    margin-top: 20%;
    font-weight: 700;
    text-align: center;
  }
  .choose {
    text-align: center;
    font-size: 1.3rem;
    color: ${styles.colors.mainBlue};
    margin-bottom: 5%;
  }
  form {
    /* border: 1px solid red; */
    margin-top: 5%;
    label {
      /* border: 1px solid green; */
      text-align: center;
      color: ${styles.colors.mainBlue};
      margin-bottom: 3%;
      font-size: 1.2rem;
      font-weight: 700;
    }
    input {
      /* border: 1px solid blue; */
      text-align: center;
      margin: 2% auto;
      width: 100%;
      border: 2px solid ${styles.colors.mainBlue};
      border-radius: 100px;
      ::-webkit-input-placeholder {
        color: ${styles.colors.mainBlue};
        text-transform: capitalize;
        letter-spacing: 0.1rem;
      }
      ::-moz-placeholder {
        /* Firefox 19+ */
        color: ${styles.colors.mainBlue};
      }
      :-ms-input-placeholder {
        /* IE 10+ */
        color: ${styles.colors.mainBlue};
      }
      :-moz-placeholder {
        /* Firefox 18- */
        color: ${styles.colors.mainBlue};
      }
    }
  }
  .buttonWrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin: 2% auto;
    margin-top: 25%;
    width: 100%;
    /* border: 1px solid purple; */
    .reset {
      border: 2px solid ${styles.colors.mainWhite};
      margin-bottom: 3%;
      padding: 1rem;
      width: 100%;
      border-radius: 100px;
      color: ${styles.colors.mainWhite};
      background: ${styles.colors.mainBlue};
      &:hover {
        color: ${styles.colors.mainBlue};
        background: ${styles.colors.mainWhite};
        border: 2px solid ${styles.colors.mainBlue};
      }
    }
    .submit {
      border: 2px solid ${styles.colors.mainWhite};
      padding: 1rem;
      width: 100%;
      border-radius: 100px;
      color: ${styles.colors.mainWhite};
      background: ${styles.colors.mainBlue};
      &:hover {
        color: ${styles.colors.mainBlue};
        background: ${styles.colors.mainWhite};
        border: 2px solid ${styles.colors.mainBlue};
      }
    }
  }
`;
