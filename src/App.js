import React from 'react';
import { Router, Redirect } from '@reach/router';
import { firebase, db } from './firebase';
import Choose from './components/ChooseYourContact';
import NavBar from './components/NavBar';
import Login from './components/Login';

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
      <NavBar />
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

export default App;
