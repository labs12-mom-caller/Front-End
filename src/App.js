import React from 'react';
import { Router, Redirect, navigate } from '@reach/router';
import ChooseYourContact from './components/ChooseYourContact';
import { firebase, db } from './firebase';
import Login from './components/Auth/Login';
import DashBoard from './components/DashBoard';
import ScheduleFreeCall from './components/ScheduleFreeCall';
import SchedulePaidCall from './components/SchedulePaidCall';
import ChooseCallPlan from './components/ChooseCallPlan';
import CallConfirmation from './components/CallConfirmation';
import AboutUs from './components/AboutUs';
import PreviousCalls from './components/dashboard/PreviousCalls';
import NavBar from './components/NavBar';
import SignUp from './components/Auth/SignUp';
import MobileLandingPage from './components/MobileLandingPage';

import UpdateAccount from './components/UpdateAccount';
import { fetchUser } from './app/utils';

function useAuth() {
  const [user, setUser] = React.useState(
    JSON.parse(window.localStorage.getItem('user') || null),
  );
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        const updatedUser = await fetchUser(firebaseUser.uid);
        if (updatedUser) {
          const currentUser = {
            ...updatedUser,
          };
          setUser(currentUser);
          window.localStorage.setItem('user', JSON.stringify(currentUser));
          db.collection('users')
            .doc(currentUser.uid)
            .set(currentUser, { merge: true });
        } else if (firebaseUser) {
          const newUser = {
            displayName: firebaseUser.displayName,
            photoUrl: firebaseUser.photoURL,
            uid: firebaseUser.uid,
            email: firebaseUser.email,
          };
          setUser(newUser);
          window.localStorage.setItem('user', JSON.stringify(newUser));
          db.collection('users')
            .doc(newUser.uid)
            .set(newUser, { merge: true });
        }
      } else {
        setUser(null);
      }
    });
  }, []);
  console.log(user);
  return user;
}

function App() {
  const result = firebase.auth().onAuthStateChanged(user => {
    if (user) {
      navigate(`/user/${user.uid}`);
    } else {
      navigate('/');
    }
  });

  return (
    <>
      {/* <NavBar user={user} /> */}
      <Router>
        {/* <Redirect from='/' to={`user/${user.uid}`} noThrow /> */}
        <DashBoard user={result.user} path='/user/:userId' />
        <ChooseYourContact user={result.user} path='/choose/:userId' />
        <ChooseCallPlan path='/choose/:userId/:contactId/call-plan' />
        <ScheduleFreeCall path='/choose/:userId/:contactId/:frequency/schedule-free' />
        <SchedulePaidCall path='/choose/:userId/:contactId/:frequency/schedule' />
        <CallConfirmation path='/confirmation/:contactId' />
        <PreviousCalls path='prev-calls/:userId' />
        <AboutUs path='/about-us' />
        <UpdateAccount user={result.user} path='/account/:userId' />
        <Login path='/login' />
        <SignUp path='/signup' />
        <MobileLandingPage path='/' exact />
      </Router>
    </>
  );
}

export default App;
