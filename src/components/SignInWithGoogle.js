import React from 'react';
import { navigate } from '@reach/router';
import { firebase, db } from '../firebase';
import ChooseYourContact from '../pages/ChooseYourContact';
import SigninForm from './SigninForm';

function useAuth() {
  const [user, setUser] = React.useState(null);
  React.useEffect(() => {
    // this effect allows us to persist login
    return firebase.auth().onAuthStateChanged(firebaseUser => {
      if (firebaseUser) {
        const currentUser = {
          ...firebaseUser,
        };
        setUser(currentUser);
        db.collection('users')
          .doc(currentUser.uid)
          .set(currentUser, { merge: true }); // merge adds safety
      } else {
        setUser(null);
      }
    });
  }, []);
  console.log(user);
  return user;
}
const SignInWithGoogle = () => {
  const [authError, setAuthError] = React.useState(null);

  const user = useAuth();
  // console.log(user, 'USERRRRRRRR');
  const handleSignIn = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      await firebase.auth().signInWithPopup(provider);
      navigate(`/home`);
    } catch (error) {
      setAuthError(error);
    }
  };

  return user ? (
    <>
      <ChooseYourContact user={user} />
    </>
  ) : (
    <div>
      <h2>You Are NOT Logged In</h2>
      <p>Recaller</p>
      <button type='button' onClick={handleSignIn}>
        Sign In With Google
      </button>
      {/* <SignupForm /> */}
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

export default SignInWithGoogle;
