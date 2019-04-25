import React from 'react';
import { firebase } from './firebase';

const LandingPage = () => {
  const [user, setUser] = React.useState(null);
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    setUser(result.user);
  };
  return user ? (
    <div>
      <h2>You Are Logged In</h2>
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