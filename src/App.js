import React from 'react';
import CSSReset from './styles/CSSReset';
import Global from './styles/Global';
import SignUp from './pages/SignUp';

const App = () => {
  return (
    <>
      <CSSReset />
      <Global />
      <SignUp />
    </>
  );
};

export default App;
