import React from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { firebase, db } from './firebase';
import Choose from './components/Choose';
import NavBar from './components/NavBar';
import { signup } from './app/utils';
import DashBoard from './pages/DashBoard';

function useAuth() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const currentUser = {
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        };
        setUser(currentUser);
        db.collection('users')
          .doc(currentUser.uid)
          .set(currentUser, { merge: true });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}

function App() {
  const user = useAuth();
  return user ? (
    <>
      {/* <NavBar /> */}
      <Router>
        <DashBoard user={user} path='/user/:userId' />
        <Choose user={user} path='/choose/:userId' />
        <Redirect from='/' to={`user/${user.uid}`} noThrow />
      </Router>
    </>
  ) : (
    <>
      <Login />
    </>
  );
}
function Login() {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authError, setAuthError] = React.useState(null);
  const [hasAccount, setHasAccount] = React.useState(null);
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
        <h2 onClick={() => setHasAccount(true)}>
          Already have an account? Sign in! {'🌋'}
        </h2>
      )}
      {!hasAccount && (
        <>
          <button type='button' onClick={handleSignIn}>
            Sign up with Google
          </button>
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
                <input
                  type='email'
                  name='email'
                  placeholder='Email'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <input
                  type='name'
                  name='displayName'
                  placeholder='displayName'
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.displayName}
                />
                {errors.email && touched.email && errors.email}
                <input
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
        </>
      )}
      {hasAccount && (
        <h2 onClick={() => setHasAccount(null)}>{'🔙'} to sign up page !</h2>
      )}
      {hasAccount && (
        <>
          <button onClick={handleSignIn}>Sign in with Google</button>
          <button
            type='button'
            onClick={() =>
              firebase
                .auth()
                .signInWithEmailAndPassword(email, password)
                .catch(function(error) {
                  console.log(`Error ${error.message}`);
                })
            }
          >
            Sign in {'🎈'}
          </button>
          <input
            type='text'
            onChange={e => setEmail(e.target.value)}
            value={email}
            placeholder='email'
          />
          <input
            type='text'
            onChange={e => setPassword(e.target.value)}
            value={password}
            placeholder='password'
          />
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

export default App;

const Wrapper = styled.div`
  border: 3px dashed black;
  display: flex;
  flex-direction: column;
  button {
    margin: 10px;
    width: 145px;
    height: 45px;
    font-size: 14px;
    border-radius: 5px;
    border: 2px solid black;
    padding: 5px;
  }
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 5px;
  width: 400px;
  height: 400px;
`;
