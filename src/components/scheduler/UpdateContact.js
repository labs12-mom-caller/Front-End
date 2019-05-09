import React from 'react';
import PropTypes from 'prop-types';

import UpdateFreeCall from './UpdateFreeCall';
import UpdatePaidCall from './UpdatePaidCall';

const UpdateContact = ({ location, user }) => {
  const contact = !location.state ? null : location.state.contact;

  if (!contact || contact.user1.uid !== user.uid)
    return (
      <h2>
        Please contact the person who scheduled this contact to update
        information
      </h2>
    );

  return contact.call_type === 'paid' ? (
    <UpdatePaidCall contact={contact} user={user} />
  ) : (
    <UpdateFreeCall contact={contact} user={user} />
  );
};

UpdateContact.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
  location: PropTypes.object,
};

export default UpdateContact;
