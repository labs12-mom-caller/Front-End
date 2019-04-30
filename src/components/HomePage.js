import React from 'react';
import PropTypes from 'prop-types';

export default function HomePage({ user }) {
  console.log(user, '🐠');
  return (
    <>
      <h1>{user.displayName}</h1>
      <h3>Data:</h3>
      <ul>
        <li>{user.email}</li>
        <li> uid {user.uid}</li>
        <li> id {user.id}</li>
        <img src={user.photoUrl} alt='user' />
      </ul>
    </>
  );
}

HomePage.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
