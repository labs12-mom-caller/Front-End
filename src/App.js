import React from 'react';
import LandingPage from './LandingPage';
import CSSReset from './styles/CSSReset';
import Global from './styles/Global';

const App = () => {
  return (
    <>
      <CSSReset />
      <Global />
      <LandingPage />
    </>
  );
};

export default App;
