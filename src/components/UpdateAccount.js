import React, { useState } from 'react';
import PropTypes from 'prop-types';

const UpdateAccount = ({ user }) => {
  console.log(user);

  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [displayName, setDisplayName] = useState('');
  // const [password, setPassword] = useState('');

  return <p>Hi</p>;
};

export default UpdateAccount;

UpdateAccount.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
