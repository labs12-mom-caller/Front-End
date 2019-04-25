import React from 'react';
import { firebase } from './firebase';

const LandingPage = () => {
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
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    await firebase.auth().signInWithPopup(provider);
  };
  return user ? (
    <div>
      <h2>Welcome {user.displayName} You Are Logged In</h2>
      <p>Recaller</p>
    </div>
  ) : (
    <div>
      <h2>You Are NOT Logged In</h2>
      <p>Recaller</p>
      <button type='button' onClick={handleSignIn}>
        Sign In With Google
      </button>
    </div>
  );
};

export default LandingPage;
