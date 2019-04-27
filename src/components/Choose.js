// libraries
import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { Formik } from 'formik';
//
import HomePage from './HomePage';
import useDoc from '../hooks/useDoc';
import { db } from '../firebase';

function Choose({ user }) {
  const [newUser, setNewUser] = React.useState(null);
  React.useEffect(() => {
    if (newUser) {
      db.doc(`users/${user.uid}`).update({
        contact: {
          email: newUser.contact.email,
          name: newUser.contact.name,
          phoneNumber: newUser.contact.phoneNumber,
        },
      });
    }
  }, [newUser, user.uid]);
  const updateUser = values => {
    const formattedPhone = String('+1').concat(
      String(values.phoneNumber).replace(/[^\d]/g, ''),
    );
    setNewUser({
      ...user,
      contact: { ...values, phoneNumber: formattedPhone },
    });
  };
  const currentUserData = useDoc(`users/${user.uid}`);

  if (newUser || currentUserData) {
    if (currentUserData && currentUserData.contact) {
      return <HomePage user={currentUserData} />;
    }
    if (newUser && newUser.contact) {
      return <HomePage user={newUser} />;
    }
  }
  console.log(newUser, 'NEWUSER');
  console.log(currentUserData, 'CURRENT');
  console.log(user, 'USER');
  return (
    <>
      <div>Hello {user.displayName} </div>
      <div className='app'>
        <h1>Choose Your Loved One</h1>

        <Formik
          initialValues={{
            email: 'test1@test.com',
            name: 'Testing',
            phoneNumber: '1234567890',
          }}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              updateUser(values);
              setSubmitting(false);
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
    </>
  );
}
export default Choose;

Choose.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    photoUrl: PropTypes.string.isRequired,
    uid: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
  }),
  values: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number.isRequired,
  }),
  touched: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number.isRequired,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.number.isRequired,
  }),
  dirty: PropTypes.bool.isRequired,
  isSubmitting: PropTypes.bool.isRequired,
  handleChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  handleReset: PropTypes.func.isRequired,
};
