import React, { Component } from 'react';
import { BrowserRouter } from 'react-router-dom'; // why is this woring
import { navigate } from '@reach/router';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavLink,
  MDBCollapse,
  MDBContainer,
  MDBHamburgerToggler,
} from 'mdbreact';
import { logout } from '../app/utils';

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse1: false,
      collapseID: '',
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
        <MDBContainer>
          <MDBNavbar color='transparent' style={{ marginTop: '20px' }} light>
            <MDBContainer>
              <MDBNavbarBrand className='black-text'>ReCaller</MDBNavbarBrand>
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
                      onClick={() => navigate(`/choose/${this.props.user.uid}`)}
                      className='black-text'
                      to='/choose-contact'
                    >
                      Choose Contact
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
      </BrowserRouter>
    );
  }
}

export default NavbarPage;
