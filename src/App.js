import React from 'react';
import { Router } from '@reach/router';
import CSSReset from './styles/CSSReset';
import Global from './styles/Global';
import SignUp from './pages/SignUp';
import Home from './pages/Home';

const App = () => {
  return (
    <React.Fragment>
      <CSSReset />
      <Global />
      <Router>
        <SignUp path='/' />
        <Home path='/home' />
      </Router>
    </React.Fragment>
  );
};

export default App;
