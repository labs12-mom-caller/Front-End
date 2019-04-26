import React from 'react';
import { navigate } from '@reach/router';
import { Formik } from 'formik';
import { firebase, db } from '../firebase';

const LoginForm = () => {
  const [authError, setAuthError] = React.useState(null);
  const handleSignUp = async (email, password) => {
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert('Password should be at least 6 characters');
      });
  };

  return (
    <div>
      <h1>Login with Email</h1>
      <Formik
        initialValues={{ email: '', password: '' }}
        validate={values => {
          const errors = {};
          if (!values.password) {
            errors.password = 'Required';
          }
          if (!values.email) {
            errors.email = 'Required';
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
          ) {
            errors.email = 'Invalid email address';
            errors.password = 'Password should be at least 6 characters';
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            // alert(JSON.stringify(values, null, 2));
            console.log(values);
            handleSignUp(values.email, values.password);
            setSubmitting(false);
            navigate(`/home`);
          }, 500);
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
            {errors.email && touched.email && errors.email}
            <input
              type='password'
              name='password'
              placeholder='Password'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
            />
            {errors.password && touched.password && errors.password}
            <button type='submit' disabled={isSubmitting}>
              Submit
            </button>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default LoginForm;
