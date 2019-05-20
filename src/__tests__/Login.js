import 'jest-dom/extend-expect';
import 'react-testing-library/cleanup-after-each';
import React from 'react';
import { render } from 'react-testing-library';
import Login from '../components/Auth/Login';

test('should render inputs properly ', () => {
  const { getByLabelText, debug, getByTestId, getByText } = render(<Login />);
  const email = getByTestId(/email/i);
  const password = getByLabelText(/password/i);
  const SignInButton = getByTestId(/button/i);
  debug(SignInButton);
});
