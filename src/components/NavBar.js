import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; // why is this woring
import PropTypes from 'prop-types';
import { navigate } from '@reach/router';
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
      ...this.state,
      [collapseId]: !this.state[collapseId],
    });
  };

  render() {
    return (
      <BrowserRouter>
        {isMobile ? (
          <MDBContainer>
            <MDBNavbar color='transparent' light>
              <MDBContainer>
                <MDBNavbarBrand
                  style={{ fontFamily: 'pacifico' }}
                  className='black-text'
                >
                  ReCaller
                </MDBNavbarBrand>
                <MDBHamburgerToggler
                  color='black'
                  id='hamburger1'
                  onClick={() => this.toggleSingleCollapse('collapse1')}
                />
                <MDBCollapse isOpen={this.state.collapse1} navbar>
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
                        onClick={() =>
                          navigate(`/choose/${this.props.user.uid}`)
                        }
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
                        to='/choose'
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
              paddingBottom: '5px',
            }}
          >
            <h2
              style={{
                marginLeft: '10.4%',
                fontFamily: 'pacifico',
                alignItems: 'baseline',
              }}
            >
              ReCaller
            </h2>
            <div style={{ width: '65%', paddingRight: '50px' }}>
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
                    onClick={() => navigate(`/choose/${this.props.user.uid}`)}
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
              <hr style={{ borderColor: 'black', width: '100%' }} />
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
