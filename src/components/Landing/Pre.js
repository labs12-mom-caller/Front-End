import React from 'react';
import { Router } from '@reach/router';

import LandingNav from './LandingNav';
import AboutUs from '../AboutUs';
import SignUp from '../Auth/SignUp';
import Login from '../Auth/Login';

const Pre = () => (
  <>
    <LandingNav />
    <Router>
      <AboutUs path='/about-us' />
      <SignUp path='/signup' />
      <Login path='/login' />
    </Router>
  </>
);

export default Pre;
