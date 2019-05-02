import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
    const files = e.target.files;
    setImageInput(files[0]);
    console.log(imageInput);
  };

  return (
    <>
      <ProfileImage src={user.photoUrl} alt={user.displayName} />
      <form>
        <label htmlFor='displayName'>
          <button
            type='submit'
            onClick={e => {
              e.preventDefault();
              db.doc(`users/${user.uid}`).set({
                ...user,
                displayName: displayName.value,
                phoneNumber: phoneNumber.value,
              });
            }}
          >
            update
          </button>
          <input
            type='text'
            id='displayName'
            {...displayName}
            placeholder='name'
          />
        </label>
        <label htmlFor='phoneNumber'>
          <input
            type='text'
            id='phoneNumber'
            placeholder='enter your phone number'
            {...phoneNumber}
          />
        </label>
        <label htmlFor='img'>
          <input onChange={uploadFile} type='file' />
        </label>
        <button type='button' onClick={e => fileUpload(e)}>
          {' '}
          upload{' '}
        </button>
      </form>
    </>
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
