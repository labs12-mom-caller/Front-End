import React from 'react';
import SignupForm from '../components/SigninForm';
import SignInWithGoogle from '../components/SignInWithGoogle';

const SignUp = () => {
  return (
    <>
      <SignInWithGoogle />
      <SignupForm />
    </>
  );
};

export default SignUp;
