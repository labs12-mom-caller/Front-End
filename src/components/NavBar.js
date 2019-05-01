/* eslint-disable react/no-access-state-in-setstate */
import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { navigate } from '@reach/router';
import PropTypes from 'prop-types';

import {
  MDBNavbar,
  MDBNav,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler,
} from 'mdbreact';
import { logout } from '../app/utils';

const isMobile = window.innerWidth <= 768;

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      collapseID: '',
      mobile: true,
    };
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : '',
    }));
  };

  toggleSingleCollapse = collapseId => {
    this.setState({
      // eslint-disable-next-line react/no-access-state-in-setstate
      ...this.state,
      // eslint-disable-next-line react/destructuring-assignment
      [collapseId]: !this.state[collapseId],
    });
  };

  render() {
    const { collapse1 } = this.state;
    const {
      user: { uid },
    } = this.props;
    return (
      <BrowserRouter>
        {isMobile ? (
          <MDBContainer>
            <MDBNavbar color='transparent' light>
              <MDBContainer>
                <MDBNavbarBrand style={{fontFamily: 'pacifico'}} className='black-text'>ReCaller</MDBNavbarBrand>
                <MDBHamburgerToggler
                  color='black'
                  id='hamburger1'
                  onClick={() => this.toggleSingleCollapse('collapse1')}
                />
                <MDBCollapse isOpen={collapse1} navbar>
                  <MDBNavbarNav left>
                    <MDBNavItem>
                      <MDBNavLink
                        active
                        onClick={() => navigate('/')}
                        className='black-text'
                        to='/'
                      >
                        Dashboard
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink active className='black-text' to=''>
                        Add New Call
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink className='black-text' to=''>
                        Review Calls
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink className='black-text' to=''>
                        Previous Calls
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        onClick={() => navigate(`/choose/${uid}`)}
                        className='black-text'
                        to='#'
                      >
                        Choose Contact
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink
                        onClick={() => navigate(`/about-us`)}
                        className='black-text'
                        to='#'
                      >
                        Our Team
                      </MDBNavLink>
                    </MDBNavItem>
                    <MDBNavItem>
                      <MDBNavLink onClick={logout} className='red-text' to='/'>
                        Sign Out
                      </MDBNavLink>
                    </MDBNavItem>
                  </MDBNavbarNav>
                </MDBCollapse>
              </MDBContainer>
            </MDBNavbar>
          </MDBContainer>
        ) : (
          <div
            style={{
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '15px',
            }}
          >
            <h2 style={{ marginLeft: '11%', fontFamily: "pacifico" }}>ReCaller</h2>
            <div style={{ width: '65%' }}>
              <MDBNav className='nav-pills nav-fill'>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={() => navigate('/')}
                    className='black-text'
                    to='#'
                  >
                    Dashboard
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className='black-text' to='!#'>
                    Add New Call
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className='black-text' to='!#'>
                    Review Calls
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink className='black-text' to='!#'>
                    Previous Calls
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={() => navigate(`/choose/${uid}`)}
                    className='black-text'
                    to='#'
                  >
                    Choose Contact
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink
                    onClick={() => navigate(`/about-us`)}
                    className='black-text'
                    to='#'
                  >
                    Our Team
                  </MDBNavLink>
                </MDBNavItem>
                <MDBNavItem>
                  <MDBNavLink onClick={logout} className='red-text' to='#'>
                    Sign Out
                  </MDBNavLink>
                </MDBNavItem>
              </MDBNav>
            </div>
          </div>
        )}
      </BrowserRouter>
    );
  }
}

export default NavbarPage;

NavbarPage.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string,
    photoUrl: PropTypes.string,
    uid: PropTypes.string,
    phoneNumber: PropTypes.string,
  }),
};
