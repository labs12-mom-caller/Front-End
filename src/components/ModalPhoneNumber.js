/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import PropTypes from 'prop-types';
import { DefaultInput } from '../styles/styledDefaultComponents/index';
import { fetchUser } from '../app/utils';
import { db } from '../firebase';

const ModalPhoneNumber = ({ user }) => {
  const [modal, setModal] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');

  const toggle = () => {
    setModal(!modal);
  };

  const addPhoneNumber = async () => {
    const formattedPhone = String('+1').concat(
      String(phoneNumber).replace(/[^\d]/g, ''),
    );
    setModal(false);
    await db
      .doc(`users/${user.uid}`)
      .set({ phoneNumber: formattedPhone }, { merge: true });
  };

  useEffect(() => {
    if (user) {
      async function fetchData() {
        const userCheck = await fetchUser(user.uid);
        console.log(userCheck);
        if (!userCheck.phoneNumber) {
          setModal(true);
        }
      }
      setTimeout(() => {
        fetchData();
      }, 5000);
    }
  }, [modal, user]);

  if (user) {
    return (
      <div>
        {/* eslint-disable-next-line react/destructuring-assignment */}
        <Modal isOpen={modal} toggle={toggle}>
          <ModalHeader toggle={toggle}>
            Please enter your phone number.
          </ModalHeader>
          <ModalBody>
            <form>
              <DefaultInput
                type='text'
                onChange={e => setPhoneNumber(e.target.value)}
                value={phoneNumber}
                placeholder='phone number...'
              />
            </form>
          </ModalBody>
          <ModalFooter>
            <Button color='primary' onClick={addPhoneNumber}>
              Submit
            </Button>{' '}
            <Button color='secondary' onClick={toggle}>
              Cancel
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
  return <p> Something went wrong! </p>;
};

export default ModalPhoneNumber;

ModalPhoneNumber.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
Modal.propTypes = {
  // boolean to control the state of the popover
  isOpen: PropTypes.bool,
  autoFocus: PropTypes.bool,
  // if modal should be centered vertically in viewport
  centered: PropTypes.bool,
  // corresponds to bootstrap's modal sizes, ie. 'lg' or 'sm'
  size: PropTypes.string,
  // callback for toggling isOpen in the controlling component
  toggle: PropTypes.func,
  role: PropTypes.string, // defaults to "dialog"
  // used to reference the ID of the title element in the modal
  labelledBy: PropTypes.string,
  keyboard: PropTypes.bool,
  // control backdrop, see http://v4-alpha.getbootstrap.com/components/modal/#options
  backdrop: PropTypes.oneOfType([PropTypes.bool, PropTypes.oneOf(['static'])]),
  // if body of modal should be scrollable when content is long
  scrollable: PropTypes.bool,
  // allows for a node/component to exist next to the modal (outside of it). Useful for external close buttons
  // external: PropTypes.node,
  // called on componentDidMount
  onEnter: PropTypes.func,
  // called on componentWillUnmount
  onExit: PropTypes.func,
  // called when done transitioning in
  onOpened: PropTypes.func,
  // called when done transitioning out
  onClosed: PropTypes.func,
  className: PropTypes.string,
  wrapClassName: PropTypes.string,
  modalClassName: PropTypes.string,
  backdropClassName: PropTypes.string,
  contentClassName: PropTypes.string,
  // boolean to control whether the fade transition occurs (default: true)
  fade: PropTypes.bool,
  cssModule: PropTypes.object,
  // zIndex defaults to 1000.
  zIndex: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  innerRef: PropTypes.object,
  // if modal should be destructed/removed from DOM after closing
  unmountOnClose: PropTypes.bool, // defaults to true
};
