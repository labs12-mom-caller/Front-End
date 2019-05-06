/* eslint-disable no-inner-declarations */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Modal from '@material-ui/core/Modal';
import styled from 'styled-components';
// import { DefaultInput } from '../styles/styledDefaultComponents/index';
import { fetchUser } from '../app/utils';
import { db } from '../firebase';

const Div = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 35%;
  left: 24%;
  outline: none;
  background-color: whitesmoke;
  width: 450px;
  height: 250px;
  padding: 20px;
  box-shadow: 0 12px 24px 0 rgba(0, 0, 0, 0.09);
  border-radius: 3px;
`;
const P = styled.p`
  color: #a29db4;
  font-size: 18px;
  /* text-align: center; */
`;
const ModalButton = styled.button`
  width: 200px;
  height: 36px;
  background-color: #ff6f61;
  color: white;
  border-radius: 2px;
  font-size: 13px;
  transition: all 0.4s ease;
  outline: 0;
  &:hover {
    background-color: #ffffff;
    color: #ff6f61;
    border: 1px solid #ff6f61;
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;
const H3 = styled.h3`
  color: #000000;
  /* text-align: center; */
  font-weight: 700;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`;
const Input = styled.input`
  width: 170px;
  border-radius: 4px;
  outline: 0;
  color: #999999;
  padding-left: 12px;
  font-size: 14px;
  background-color: rgba(0, 0, 0, 0.0001);
  border: 1px solid #999999;
  &::placeholder {
    color: #999999;
    /* padding-left: 12px; */
    font-size: 14px;
  }
`;
const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4.2rem;
`;
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
        // console.log(userCheck);
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
        <Modal open={modal} toggle={toggle}>
          <Div>
            <H3>Enter your Phone Number!</H3>
            <P>
              We use your phone number to set up the calls between you and your
              contacts.
            </P>
            <ButtonDiv>
              <Input
                placeholder='Phone Number'
                value={phoneNumber}
                onChange={e => setPhoneNumber(e.target.value)}
              />
              <ModalButton onClick={addPhoneNumber}>SUBMIT</ModalButton>
            </ButtonDiv>
          </Div>
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
