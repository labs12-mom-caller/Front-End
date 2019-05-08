import React, { useState } from 'react';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { db, storage, auth } from '../firebase';
import NavbarPage from './NavBar';

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
  const email = useInputValue(user.email);
  const newPassword = useInputValue('');
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

  const update = e => {
    e.preventDefault();
    if (imageInput) {
      fileUpload(e);
    }
    db.doc(`users/${user.uid}`)
      .set({
        ...user,
        displayName: displayName.value,
        phoneNumber: phoneNumber.value,
        email: email.value,
      })
      .then(user => {
        navigate(`/`);
      });
  };

  const passwordUpdate = async () => {
    const userOne = auth().currentUser;
    try {
      await userOne.updatePassword(newPassword.value);
      console.log('successfully updated password');
    } catch (error) {
      console.log('error updating password', error);
    }
  };

  return (
    <Container>
      {/* <NavbarPage user={user} /> */}
      <Wrapper>
        <img src={user.photoUrl} alt={user.displayName} />
        <UpdateForm>
          <label htmlFor='img' style={{ marginLeft: '30%' }}>
            Profile Picture
            <input onChange={uploadFile} type='file' />
          </label>
          <label htmlFor='displayName'>
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
          <label htmlFor='email'>
            Email
            <input
              type='text'
              id='email'
              {...email}
              placeholder='enter your email'
            />
          </label>
          <button className='updateBtn' type='submit' onClick={e => update(e)}>
            update
          </button>
          <label htmlFor='password'>
            password
            <input
              type='password'
              id='password'
              {...newPassword}
              placeholder='enter your password'
            />
          </label>
          <button onClick={passwordUpdate} type='button'>
            {' '}
            Update Password{' '}
          </button>
        </UpdateForm>
      </Wrapper>
    </Container>
  );
};
const Wrapper = styled.div`
  /* border: 2px solid orange; */
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 auto;
  margin-top: 30%;
  img {
    width: 50%;
    border: 1px solid #999999;
    border-radius: 50%;
  }
  @media only screen and (max-width: 850px) {
    margin-top: 40%;
    img {
      width: 60%;
    }
  }
  @media only screen and (max-width: 600px) {
    margin-top: 80%;
    img {
      width: 100%;
      margin-top: 15%;
    }
  }
`;
const Container = styled.div`
  display: grid;
  height: 85vh;
  grid-template-columns: 1fr;
  /* border: 3px solid black; */
  grid-template-rows: 70px 1fr;
`;
const UpdateForm = styled.form`
  border: 2px solid #999999;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 6%;
  /* width: 60%; */
  width: auto;
  label {
    color: black;
    font-weight: bold;
    display: flex;
    flex-direction: column;
  }
  .updateBtn {
    /* margin-left: 37%; */
    margin-bottom: 5%;
  }
  @media only screen and (max-width: 600px) {
    width: auto;
    height: auto;
    margin-top: 20%;
  }
`;

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
