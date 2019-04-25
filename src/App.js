import React from 'react';
import LandingPage from './LandingPage';
import CSSReset from './styles/CSSReset';
import Global from './styles/Global';
import SigninForm from './pages/SigninForm';

const App = () => {
  return (
    <>
      <CSSReset />
      <Global />
      <LandingPage />
      <SigninForm />
    </>
  );
};

export default App;
