import React from 'react';

export default function HomePage({ user }) {
  console.log(user, '🐠');
  return (
    <>
      <h1>💁‍♂️ {user.displayName}</h1>
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
