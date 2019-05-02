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

import UpdateAccount from './components/UpdateAccount';
import { fetchUser } from './app/utils';
// Updated useAuth
function useAuth() {
  const [user, setUser] = React.useState(
    JSON.parse(window.localStorage.getItem('user') || null),
  );
  React.useEffect(() => {
    return firebase.auth().onAuthStateChanged(async firebaseUser => {
      if (firebaseUser) {
        if (!firebaseUser.phoneNumber && !window.localStorage.getItem('user')) {
          const googleUser = {
            displayName: firebaseUser.displayName,
            email: firebaseUser.email,
            uid: firebaseUser.uid,
            photoUrl:
              firebaseUser.photoURL || `https://placekitten.com/200/200`,
          };
          window.localStorage.setItem('user', JSON.stringify(googleUser));
          setUser(googleUser);
          db.collection('users')
            .doc(googleUser.uid)
            .set(googleUser, { merge: true });
          return;
        }
        const x = await fetchUser(firebaseUser.uid);
        console.log(x);
        if (x) {
          const currentUser = {
            ...x,
          };
          if (!window.localStorage.getItem('user')) {
            window.localStorage.setItem('user', JSON.stringify(currentUser));
            setUser(currentUser);
            db.collection('users')
              .doc(currentUser.uid)
              .set(currentUser, { merge: true });
          }
          if (
            window.localStorage.getItem('user') &&
            x.photoUrl !== 'https://placekitten.com/200/200'
          ) {
            setUser({ ...user, phoneNumber: x.phoneNumber });
            window.localStorage.setItem(
              'user',
              JSON.stringify({ ...user, phoneNumber: x.phoneNumber }),
            );
          }
          if (
            window.localStorage.getItem('user') &&
            (user.displayName !== x.displayName ||
              user.email !== x.email ||
              user.phoneNumber !== x.phoneNumber ||
              user.photoUrl !== x.photoUrl)
          ) {
            setUser({ ...user, ...x });
            window.localStorage.setItem(
              'user',
              JSON.stringify({ ...user, ...x }),
            );
          }
          //     if(window.localStorage.getItem('user') &&
          //     user.displayName != x.displayName ||
          //     user.email != x.email ||
          //     user.phoneNumber != x.phoneNumber ||
          //     user.photoUrl != x.photoUrl ||
          // )) {
          //     setUser({ ...user, ...x  });
          //     window.localStorage.setItem(
          //       'user',
          //       JSON.stringify({ ...user, ...x }),
          //     );
          //   }
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
      <Router>
        <Redirect from='/' to={`user/${user.uid}`} noThrow />
        <DashBoard user={user} path='/user/:userId' />
        <ChooseYourContact user={user} path='/choose' />
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
