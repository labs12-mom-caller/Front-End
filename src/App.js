import React from 'react';
import { Router, Redirect } from '@reach/router';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { firebase, db } from './firebase';
import useDoc from './hooks/useDoc';
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

  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };
  return (
    <div className='Login'>
      <h1>ReCaller!</h1>
      <button onClick={handleSignIn}>Sign in with Google</button>
      {authError && (
        <div>
          <p>Sorry, there was a problem</p>
          <p>
            <i>{authError.message}</i>
          </p>
          <p>Please try again</p>
        </div>
      )}
    </div>
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

function HomePage({ user }) {
  return (
    <>
      <h1>💁‍♂️ {user.displayName}</h1>
      <h3>Data:</h3>
      <ul>
        <li>{user.email}</li>
        <li> uid {user.uid}</li>
        <li> id {user.id}</li>
        <img src={user.photoUrl} alt='user' />
      </ul>
      <h3>Contact:</h3>
      <ul>
        <li>{user.contact.email}</li>
        <li>{user.contact.name}</li>
        <li>{user.contact.phoneNumber}</li>
      </ul>
    </>
  );
}
export default App;
