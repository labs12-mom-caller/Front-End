import React from 'react';
import { Router, Redirect } from '@reach/router';
import styled from 'styled-components';
import { firebase, db } from './firebase';
import Choose from './components/Choose';

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
            type='button'
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
          <button type='button' onClick={handleSignIn}>
            Sign up with Google
          </button>
          <button type='button' onClick={handleSubmit}>
            Sign up {'🐠'}
          </button>
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

const handleSubmit = async event => {
  event.preventDefault();
  const userEmail = 'bobros134@bob.com';
  const password = '123456';
  try {
    const { user } = await firebase
      .auth()
      .createUserWithEmailAndPassword(userEmail, password);
    user.updateProfile({ displayName: 'Bob Ross' });
    console.log(user, '$$');
  } catch (error) {
    alert(error);
  }
};

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
