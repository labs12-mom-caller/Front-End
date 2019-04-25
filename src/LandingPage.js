import React from 'react';
import { firebase } from './firebase';

const LandingPage = () => {
  const [user, setUser] = React.useState(null);
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebase.auth().signInWithPopup(provider);
    setUser(result.user);
  };
  return <div>Recaller</div>;
};

export default LandingPage;
