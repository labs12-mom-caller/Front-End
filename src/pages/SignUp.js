import React from 'react';
import SignupForm from '../components/SigninForm';
import SignInWithGoogle from '../components/SignInWithGoogle';
import LoginForm from '../components/LoginForm';

const SignUp = () => {
  return (
    <>
      <SignInWithGoogle />
      <SignupForm />
      <LoginForm />
    </>
  );
};

export default SignUp;
