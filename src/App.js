import React from 'react';
import SignUpPage from './SignUpPage';
import CSSReset from './styles/CSSReset';
import Global from './styles/Global';
import SigninForm from './pages/SigninForm';
import LoginForm from './pages/LoginForm';

const App = () => {
  return (
    <>
      <CSSReset />
      <Global />
      <SignUpPage />
      <SigninForm />
      <LoginForm />
    </>
  );
};

export default App;
