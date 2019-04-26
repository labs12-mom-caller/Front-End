import React from 'react';

export default function HomePage({ user }) {
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
      <h3>Contact:</h3>
      <ul>
        <li>{user.contact.email}</li>
        <li>{user.contact.name}</li>
        <li>{user.contact.phoneNumber}</li>
      </ul>
    </>
  );
}
