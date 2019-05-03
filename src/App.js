import React from 'react';
import { Router, Redirect } from '@reach/router';
import ChooseYourContact from './components/ChooseYourContact';
import { firebase, db } from './firebase';
import Login from './components/Login';
import DashBoard from './components/DashBoard';
import ScheduleFreeCall from './components/ScheduleFreeCall';
import SchedulePaidCall from './components/SchedulePaidCall';
import ChooseCallPlan from './components/ChooseCallPlan';
import CallConfirmation from './components/CallConfirmation';
import AboutUs from './components/AboutUs';
import PreviousCalls from './components/dashboard/PreviousCalls';
import NavBar from './components/NavBar';

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
  const user = useAuth();
  console.log(user, 'USERRRRR');
  return user ? (
    <>
      <NavBar user={user} />
      <Router>
        <Redirect from='/' to={`user/${user.uid}`} noThrow />
        <DashBoard user={user} path='/user/:userId' />
        <ChooseYourContact user={user} path='/choose/:userId' />
        <ChooseCallPlan path='/choose/:userId/:contactId/call-plan' />
        <ScheduleFreeCall path='/choose/:userId/:contactId/:frequency/schedule-free' />
        <SchedulePaidCall path='/choose/:userId/:contactId/:frequency/schedule' />
        <CallConfirmation path='/confirmation/:contactId' />
        <PreviousCalls path='prev-calls/:userId' />
        <AboutUs path='/about-us' />
        <UpdateAccount user={user} path='/account/:userId' />
      </Router>
    </>
  ) : (
    <>
      <Login />
    </>
  );
}

export default App;
