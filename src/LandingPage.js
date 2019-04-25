import React from 'react';
import { firebase } from './firebase';

function useAuth() {
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        setUser({
          displayName: firebaseUser.displayName,
          photoUrl: firebaseUser.photoURL,
          uid: firebaseUser.uid,
        });
      } else {
        setUser(null);
      }
    });
  }, []);
  return user;
}
const LandingPage = () => {
  const [authError, setAuthError] = React.useState(null);

  const user = useAuth();
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      setAuthError(error);
    }
  };
  return user ? (
    <div>
      <h2>Welcome {user.displayName} You Are Logged In</h2>
      <p>Recaller</p>
      <button
        type='button'
        onClick={() => {
          firebase.auth().signOut();
        }}
      >
        log out
      </button>
    </div>
  ) : (
    <div>
      <h2>You Are NOT Logged In</h2>
      <p>Recaller</p>
      <button type='button' onClick={handleSignIn}>
        Sign In With Google
      </button>
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
};

export default LandingPage;
