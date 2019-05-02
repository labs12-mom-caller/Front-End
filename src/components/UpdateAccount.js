import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { auth, db } from '../firebase';
// displayName: "Michael Checo"
// email: "checomichael2@gmail.com"
// phoneNumber: "+12012503670"
// photoUrl: "https://lh4.googleusercontent.com/-IKpg7va2yR8/AAAAAAAAAAI/AAAAAAAAADo/OoOmhzvtjEc/photo.jpg"
// uid: "1POJa09XbdcZbc2606JeeuprAuu1"
const UpdateAccount = ({ user }) => {
  console.log(user);
  db.doc(`users/${user.uid}`).set({
    ...user,
    displayName: 'LULULEMON',
  });
  const [displayName, setDisplayName] = useState(user.displayName);

  return (
    <form>
      <label htmlFor='displayName'>
        <input
          type='text'
          id='displayName'
          value={displayName}
          onChange={e => setDisplayName(e.target.value)}
          placeholder='name'
        />
      </label>
    </form>
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
