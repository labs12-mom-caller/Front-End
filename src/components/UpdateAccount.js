import React, { useState } from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { db, storage } from '../firebase';
import { ProfileImage } from '../styles/Dashboard';

const useInputValue = initialValue => {
  const [value, setValue] = React.useState(initialValue);
  return {
    value,
    onChange: e => {
      setValue(e.target.value || e.target.innerText);
    },
  };
};
const UpdateAccount = ({ user }) => {
  const displayName = useInputValue(user.displayName);
  const phoneNumber = useInputValue(user.phoneNumber);
  const [imageInput, setImageInput] = useState(null);

  function fileUpload(e) {
    e.preventDefault();
    storage
      .ref()
      .child('user-profiles')
      .child(user.uid)
      .child(imageInput.name)
      .put(imageInput)
      .then(response => response.ref.getDownloadURL())
      .then(photoURL =>
        db.doc(`users/${user.uid}`).set({
          ...user,
          photoUrl: photoURL,
        }),
      );
  }

  const uploadFile = e => {
    e.preventDefault();
    const { files } = e.target;
    setImageInput(files[0]);
    console.log(imageInput);
  };

  return (
    <div style={{ width: '100%' }}>
      <ProfileImage
        style={{ width: '15%' }}
        src={user.photoUrl}
        alt={user.displayName}
      />
      <UpdateForm
        style={{ display: 'flex', width: '20%', flexDirection: 'column' }}
      >
        <label htmlFor='displayName'>
          <button
            style={{ marginBottom: '25px' }}
            type='submit'
            onClick={e => {
              e.preventDefault();
              db.doc(`users/${user.uid}`)
                .set({
                  ...user,
                  displayName: displayName.value,
                  phoneNumber: phoneNumber.value,
                })
                .then(user => {
                  navigate(`/`);
                });
            }}
          >
            update
          </button>
          <br />
          Display Name
          <input
            type='text'
            id='displayName'
            {...displayName}
            placeholder='Enter your name'
          />
        </label>
        <label htmlFor='phoneNumber'>
          Phone Number
          <input
            type='text'
            id='phoneNumber'
            {...phoneNumber}
            placeholder='enter your phone number'
          />
        </label>
        <label htmlFor='img'>
          Profile Picture
          <input onChange={uploadFile} type='file' />
        </label>
        <button type='button' onClick={e => fileUpload(e)}>
          {' '}
          upload{' '}
        </button>
      </UpdateForm>
    </div>
  );
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

const UpdateForm = styled.form`
  label {
    color: black;
    font-weight: bold;
  }
`;
