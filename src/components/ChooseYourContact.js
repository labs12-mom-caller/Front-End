import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { navigate } from '@reach/router';
import { Formik } from 'formik';
import { firebase } from 'firebase/app';
import { signupUserTwo } from '../app/utils';
import NavBar from './NavBar';
import { Wrapper } from '../styles/Login';

function Choose({ user }) {
  const [userTwoEmail, setUserTwoEmail] = React.useState();
  console.log(userTwoEmail);
  return (
    <Wrapper>
      <NavBar />
      <div>Hello {user.displayName} </div>
      <div className='app'>
        <h1>Choose Your Loved One</h1>

        <Formik
          initialValues={{
            email: 'checomichael25@yahoo.com',
            name: 'Testing',
            phoneNumber: '1234567890',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              signupUserTwo(values);
              setUserTwoEmail(values.email);
              setSubmitting(false);
              navigate('/');
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
                  placeholder='Enter your phone number'
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
                <button
                  type='button'
                  className='outline'
                  onClick={handleReset}
                  disabled={!dirty || isSubmitting}
                >
                  Reset
                </button>
                <button type='submit' disabled={isSubmitting}>
                  Submit
                </button>
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
};
