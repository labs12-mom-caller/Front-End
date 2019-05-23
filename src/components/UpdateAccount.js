import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FaCheck, FaTimes } from 'react-icons/fa';
import { db, storage, auth } from '../firebase';

import { fetchUser } from '../app/utils';

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
  const [uploaded, setUploaded] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState(false);

  async function fileUpload(e) {
    try {
      e.preventDefault();
      const response = await storage
        .ref()
        .child('user-profiles')
        .child(user.uid)
        .child(imageInput.name)
        .put(imageInput);
      const photoURL = await response.ref.getDownloadURL();
      await db.doc(`users/${user.uid}`).update({
        photoUrl: photoURL,
      });
    } catch (err) {
      console.log(err);
    }
  }

  const uploadFile = e => {
    const { files } = e.target;
    setImageInput(files[0]);
    setUploaded(true);
  };

  const update = async e => {
    if (imageInput) {
      await fileUpload(e);
    }
    await db.doc(`users/${user.uid}`).update({
      displayName: displayName.value,
      phoneNumber: phoneNumber.value,
      email: email.value,
    });
    const updatedUser = await fetchUser(user.uid);
    localStorage.setItem('user', JSON.stringify(updatedUser));
    window.open('/', '_self');
  };

  const passwordUpdate = async () => {
    const userOne = auth().currentUser;
    try {
      await userOne.updatePassword(newPassword.value);
      console.log('successfully updated password');
      setUpdated(true);
    } catch (error) {
      console.log('error updating password', error);
      setError(true);
    }
  };

  return (
    <Container>
      <Wrapper>
        <ProfileImage src={user.photoUrl} alt={user.displayName} />
        <UpdateForm>
          <div>
            <InputLabel htmlFor='img' style={{ textAlign: 'center' }}>
              Profile Picture
              <PictureFile onChange={uploadFile} type='file' />
            </InputLabel>
            {uploaded ? (
              <div className='uploaded-info'>
                <FaCheck className='success' />
                <p>
                  Click &quot;Update Profile&quot; button to finish updating
                  profile image
                </p>
              </div>
            ) : null}
            <div>
              <InputLabel htmlFor='displayName' style={{ marginTop: '25px' }}>
                <br />
                Display Name
                <InputEntry
                  type='text'
                  id='displayName'
                  {...displayName}
                  placeholder='Enter your name'
                />
              </InputLabel>

              <InputLabel htmlFor='email'>
                Email
                <InputEntry
                  type='text'
                  id='email'
                  {...email}
                  placeholder='enter your email'
                />
              </InputLabel>

              <InputLabel htmlFor='phoneNumber'>
                Phone Number
                <InputEntry
                  type='text'
                  id='phoneNumber'
                  {...phoneNumber}
                  placeholder='enter your phone number'
                />
              </InputLabel>

              <ButtonGroup>
                <FormButton
                  className='updateBtn'
                  type='submit'
                  onClick={e => update(e)}
                >
                  Update Profile
                </FormButton>
              </ButtonGroup>

              <InputLabel htmlFor='password'>
                Password
                <InputEntry
                  type='password'
                  id='password'
                  {...newPassword}
                  placeholder='enter your password'
                />
              </InputLabel>
              {updated ? (
                <div className='uploaded-info'>
                  <FaCheck className='success' />
                  <p>Updated successfully!</p>
                </div>
              ) : null}
              {error ? (
                <div className='uploaded-info'>
                  <FaTimes className='error' />
                  <p>
                    Error try again! If you signed in with google you cannont
                    update password here.
                  </p>
                </div>
              ) : null}
              <ButtonGroup>
                <FormButton onClick={passwordUpdate} type='button'>
                  {' '}
                  Update Password{' '}
                </FormButton>
              </ButtonGroup>
            </div>
          </div>
        </UpdateForm>
      </Wrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  grid-template-columns: 1fr;
  margin-bottom: 2rem;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  align-self: flex-start;
  width: 40%;
  padding: 15px;
  background: #ffffff;
  background-color: #f7f8fa;
  margin: 0 auto;
  box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.22);

  @media only screen and (max-width: 750px) {
    width: 70%;
  }
  @media only screen and (max-width: 450px) {
    width: 90%;
  }

  .uploaded-info {
    margin-top: 2rem;

    .error {
      color: red;
    }

    .success {
      margin-left: 12rem;
      margin-bottom: 1rem;
      color: green;
      font-size: 2rem;
    }

    p {
      font-size: 1.1rem;
      text-align: center;
    }
  }
`;

const UpdateForm = styled.form`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 90%;
  height: 40%;

  label {
    font-family: "Roboto"
    color: black;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    font-weight: 300;
  }
  .updateBtn {
    margin-bottom: 5%;
    width: 100%;
  }
  @media only screen and (max-width: 600px) {
    width: auto;
  }

`;

const ProfileImage = styled.img`
  width: 30%;
  border-radius: 50%;
  margin: 15px auto;
  box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.22);
  -moz-box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.22);
  -webkit-box-shadow: 0px 0px 25px rgba(0, 0, 0, 0.22);

  @media only screen and (max-width: 750px) {
    width: 50%;
  }
`;

const InputLabel = styled.label`
  /* text-align: center; */
  @media only screen and (max-width: 750px) {
    font-size: 0.9rem;
  }
`;

const InputEntry = styled.input`
  width: 100%;
  border-radius: 4px;
  outline: 0;
  color: #999999;
  margin: 5px 0;
  padding-left: 12px;
  padding: 9px
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.0001);
  border: 1px solid #999999;

  &::placeholder {
    color: #999999;
    /* padding-left: 12px; */
    font-size: 14px;
  }

  @media only screen and (max-width: 750px) {
  width: 100%;
  }
`;

const FormButton = styled.button`
  width: 140px;
  height: 33px;
  background-color: #ff6f61;
  color: white;
  border-radius: 2px;
  font-size: 13px;
  transition: all 0.4s ease;
  outline: 0;
  margin-top: 15px;
  border: 1px solid #ff6f61;
  &:hover {
    background-color: #ffffff;
    color: #ff6f61;
    border: 1px solid #ff6f61;
    cursor: pointer;
    transition: all 0.4s ease;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  }
  @media only screen and (max-width: 750px) {
    /* width: 140px; */
    font-size: 0.7rem;
  }
`;

const PictureFile = styled.input`
  color: red;
  position: relative;
  right: -29px;
  top: 9px;

  ::-webkit-file-upload-button {
    width: 90px;
    height: 33px;
    background-color: #ff6f61;
    color: white;
    border-radius: 2px;
    font-size: 13px;
    border: 1px solid #ff6f61;
    transition: all 0.4s ease;
    outline: 0;
    margin-top: 15px;
    &:hover {
      background-color: #ffffff;
      color: #ff6f61;
      border: 1px solid #ff6f61;
      cursor: pointer;
      transition: all 0.4s ease;
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    }
    @media only screen and (max-width: 750px) {
      /* width: 140px; */
      font-size: 0.7rem;
    }
  }
`;
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  /* border: 1px solid blue; */
  button {
    width: 100%;
    font-size: 1.18rem;
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
