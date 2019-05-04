import React from 'react';
import { Formik } from 'formik';
import { Link, navigate } from '@reach/router';

import { signup } from '../../app/utils';
import {
  DefaultInput,
  DefaultButtonBlueBG,
  styles,
  FormikWrapper,
} from '../../styles/styledDefaultComponents';

const SignUp = () => {
  return (
    <>
      <h1 className='loginHeader'>ReCaller</h1>
      <FormikWrapper style={{ marginTop: '5px' }}>
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
            setTimeout(async () => {
              console.log(values);
              const id = await signup(values);
              setSubmitting(false);
              navigate(`/choose/${id}`);
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
              {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
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
              <DefaultButtonBlueBG type='button' className='signUpBtnG'>
                <p className='signUpText'>Sign up with Google</p>
              </DefaultButtonBlueBG>
            </form>
          )}
        </Formik>
      </FormikWrapper>
      <p className='haveAccountText'>
        Already have an account?
        <Link to='/login' className='signInSpan'>
          Login
        </Link>
      </p>
    </>
  );
};

export default SignUp;
