import React from 'react';
import { Formik } from 'formik';
import PropTypes from 'prop-types';

const ChooseYourContact = ({ user }) => {
  return (
    <>
      <div>Hello {user.displayName} </div>
    </>
  );
};

export default ChooseYourContact;

ChooseYourContact.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
  }),
};
