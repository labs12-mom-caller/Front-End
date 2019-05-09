import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
import { navigate } from '@reach/router';
import { Formik } from 'formik';
import styled from 'styled-components';

import { db } from '../firebase';
import { Wrapper } from '../styles/Login';
import { Form } from '../styles/Form';

function Choose({ user, userId }) {
  return (
    <Wrapper>
      <Header>
        <p>
          Remembering to keep in touch with loved ones has never been easier!
          Please enter contact&apos;s information below to schedule a call.
        </p>
        <p>
          Your contact will receive an email letting them know an account has
          been created for them.
        </p>
      </Header>
      <Formik
        initialValues={{
          email: '',
          displayName: '',
          phoneNumber: '',
        }}
        onSubmit={(values, { setSubmitting }) => {
          values.phoneNumber = String('+1').concat(
            String(values.phoneNumber).replace(/[^\d]/g, ''),
          );
          setTimeout(async () => {
            const userRef = await db
              .collection('users')
              .where('email', '==', values.email)
              .get();
            if (userRef.empty) {
              db.collection(`users`)
                .add(values)
                .then(ref => {
                  setSubmitting(false);
                  navigate(`/choose/${userId}/${ref.id}/call-plan`);
                });
            } else {
              navigate(`/choose/${userId}/${userRef.docs[0].id}/call-plan`);
            }
          }, 1000);
        }}
        validationSchema={Yup.object().shape({
          email: Yup.string()
            .email()
            .required('Required'),
          displayName: Yup.string()
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
            isSubmitting,
            handleChange,
            handleBlur,
            handleSubmit,
          } = props;
          return (
            <Form onSubmit={handleSubmit}>
              <label htmlFor='displayName' className='sr'>
                Enter Your Contact&apos;s Name
              </label>
              <input
                id='displayName'
                placeholder="Enter Your Contact's Name"
                type='text'
                value={values.displayName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                style={{
                  visibility:
                    errors.displayName && touched.displayName
                      ? 'visible'
                      : 'hidden',
                }}
              >
                &nbsp;{errors.displayName}&nbsp;
              </div>
              <label htmlFor='email' className='sr'>
                Your Contact&apos;s Email Address
              </label>
              <input
                id='email'
                placeholder="Your Contact's Email Address"
                type='email'
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                style={{
                  visibility:
                    errors.email && touched.email ? 'visible' : 'hidden',
                }}
              >
                &nbsp;{errors.email}&nbsp;
              </div>

              <label htmlFor='phoneNumber' className='sr'>
                Your Contact&apos;s Phone Number
              </label>
              <input
                id='phoneNumber'
                placeholder="Your Contact's Phone Number"
                type='tel'
                value={values.phoneNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <div
                style={{
                  visibility:
                    errors.phoneNumber && touched.phoneNumber
                      ? 'visible'
                      : 'hidden',
                }}
              >
                &nbsp;{errors.phoneNumber}&nbsp;
              </div>
              <SignupButton type='submit' disabled={isSubmitting}>
                Choose a Plan
              </SignupButton>
            </Form>
          );
        }}
      </Formik>
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
    displayName: PropTypes.string,
    phoneNumber: PropTypes.number,
  }),
  touched: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
    phoneNumber: PropTypes.number,
  }),
  errors: PropTypes.shape({
    email: PropTypes.string,
    displayName: PropTypes.string,
    phoneNumber: PropTypes.number,
  }),
  isSubmitting: PropTypes.bool,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  handleSubmit: PropTypes.func,
  userId: PropTypes.string,
};

const SignupButton = styled.button`
  height: 40px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  margin-bottom: 10px;
  border: none;

  img {
    height: 90%;
  }
  width: 75%;
  height: 40px;
  background-color: #636578;
  color: white;
  border-radius: 2px;
  font-size: 1.4rem;
  transition: all 0.4s ease;
  outline: 0;
  &:hover {
    background-color: #ffffff;
    color: #636578;
    border: 1px solid #636578;
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 68%;
  p {
    font-size: 1.2rem;
    text-align: center;
  }
`;
