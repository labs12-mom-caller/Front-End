import React from 'react';
import PropTypes from 'prop-types';
// import { Router } from '@reach/router';

// import NavBar from './NavBar';
// import DashMain from './DashMain';
// import Footer from './Footer';

// import ChooseCallPlan from './ChooseCallPlan';
// import ChooseYourContact from './ChooseYourContact';
// import ScheduleFreeCall from './ScheduleFreeCall';
// import SchedulePaidCall from './SchedulePaidCall';
// import CallConfirmation from './CallConfirmation';
// import PreviousCalls from './dashboard/PreviousCalls';
// import AboutUs from './AboutUs';
// import UpdateAccount from './UpdateAccount';

const DashBoard = () => {
  // const user = JSON.parse(localStorage.getItem('user'));
  return <h1>hi</h1>;
};

DashBoard.propTypes = {
  user: PropTypes.object,
};

export default DashBoard;
DashBoard.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
