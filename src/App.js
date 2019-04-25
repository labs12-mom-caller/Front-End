import React from 'react';
import SignUpPage from './SignUpPage';
import CSSReset from './styles/CSSReset';
import Global from './styles/Global';
import SigninForm from './pages/SigninForm';

const App = () => {
  return (
    <>
      <CSSReset />
      <Global />
      <SignUpPage />
      <div>
        <SigninForm />
      </div>
    </>
  );
};

export default App;
