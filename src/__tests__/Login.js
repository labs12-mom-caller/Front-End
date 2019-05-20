import 'jest-dom/extend-expect';
import React from 'react';
import { navigate } from '@reach/router';
import { render, fireEvent } from 'react-testing-library';
import Login from '../components/Auth/Login';

test('should render inputs properly ', () => {
  const { getByLabelText, debug, getByTestId, rerender } = render(<Login />);
  const email = getByTestId(/email/i);
  const password = getByLabelText(/password/i);
  const SignInButton = getByTestId(/button/i);
  expect(email.value).toBe('');
  fireEvent.change(email, { target: { value: 'checomichael2@gmail.com' } });
  expect(email.value).toBe('checomichael2@gmail.com');
  rerender(<Login />);
  expect(window.localStorage.getItem('email')).toBeTruthy();
});
