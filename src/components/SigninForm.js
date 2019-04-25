import React from 'react';
import { Formik } from 'formik';
import { firebase, db } from '../firebase';

function useAuth(values) {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    // this effect allows us to persist login
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser && firebaseUser.phoneNumber !== null) {
        const currentUser = {
          email: firebaseUser.email,
          phone: values,
          uid: firebaseUser.uid,
        };
        if (currentUser) {
          setUser(currentUser);
          db.collection('users')
            .doc(currentUser.uid)
            .set(currentUser, { merge: true }); // merge adds safety
        } else {
          setUser(null);
        }
      }
    });
  }, [values]);
  return user;
}

const SignupForm = () => {
  const [authError, setAuthError] = React.useState(null);
  const [phone, setPhone] = React.useState(null);
  const user = useAuth(phone);
  const handleSignUp = async (email, password) => {
    const provider = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => {
        // Handle Errors here.
        console.log(error, 'failed to signup');
        // ...
      });
    const result = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => {
        alert('Password should be at least 6 characters');
      });
  };

  return user ? (
    <div>
      <h2>You Are Logged In</h2>
    </div>
  ) : (
    <div>
      <h1>Signup or Login with Email</h1>
      <Formik
        initialValues={{ email: '', phoneNumber: '', password: '' }}
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
            const formatedPhone = String('+1').concat(
              String(values.phoneNumber).replace(/[^\d]/g, ''),
            );
            setPhone(formatedPhone);
            // alert(JSON.stringify(values, null, 2));
            console.log(values);
            handleSignUp(values.email, values.password);
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
            {errors.email && touched.email && errors.email}
            <input
              type='text'
              name='phoneNumber'
              placeholder='Phone'
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.phoneNumber}
            />
            {errors.phoneNumber && touched.phoneNumber && errors.phoneNumber}
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

export default SignupForm;
