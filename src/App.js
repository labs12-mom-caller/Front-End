import React from 'react';
import { Router, Redirect } from '@reach/router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import styled from 'styled-components';
import { firebase, db } from './firebase';
import useDoc from './hooks/useDoc';
import HomePage from './components/HomePage';

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
// import CSSReset from './styles/CSSReset';
// import Global from './styles/Global';
// import SignUp from './pages/SignUp';
// import Home from './pages/Home';
// import ChooseYourContact from './pages/ChooseYourContact';

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
      <Router>
        <Choose user={user} path='/user/:userId' />
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
  const [authError, setAuthError] = React.useState(null);
  const [hasAccount, setHasAccount] = React.useState(null);
  console.log(hasAccount);
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      const credential = firebase.auth.EmailAuthProvider.credential(
        'checomichael2@gmail.com',
        'MikeCheco45',
      );
      firebase
        .auth()
        .currentUser.linkAndRetrieveDataWithCredential(credential)
        .then(
          function(usercred) {
            const { user } = usercred;
            console.log('Account linking success', user);
          },
          function(error) {
            console.log('Account linking error', error);
          },
        );
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
      {hasAccount && (
        <h2 onClick={() => setHasAccount(null)}>{'🔙'} to sign up page !</h2>
      )}
      {hasAccount && (
        <>
          <button onClick={handleSignIn}>Sign in with Google</button>
          <button
            onClick={() =>
              firebase
                .auth()
                .signInWithEmailAndPassword(
                  'checomichael2@gmail.com',
                  'MikeCheco45',
                )
                .catch(function(error) {
                  const errorCode = error.code;
                  const errorMessage = error.message;
                  console.log(errorMessage, 'Error');
                })
            }
          >
            Sign in {'🎈'}
          </button>
        </>
      )}
      {!hasAccount && (
        <>
          <button onClick={handleSignIn}>Sign up with Google</button>
          <button onClick={handleSubmit}>Sign up {'🐠'}</button>
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
  console.log(user, 'user');
  return (
    <>
      <div>Hello {user.displayName} </div>
      <div className='app'>
        <h1>Choose Your Loved One</h1>
        <button
          type='button'
          onClick={() => {
            firebase.auth().signOut();
          }}
        >
          log out
        </button>

        <Formik
          initialValues={{ email: '', name: '', phoneNumber: '' }}
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

const handleSubmit = async event => {
  event.preventDefault();

  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword('bobross@bob.com', '123456');

    user.updateProfile({ displayName: 'Bob Ross' });
  } catch (error) {
    alert(error);
  }
};
export default App;
