/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import styled from 'styled-components';
import { logout } from '../app/utils';

class NavbarPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapseID: '',
    };
  }

  toggleCollapse = collapseID => () => {
    this.setState(prevState => ({
      collapseID: prevState.collapseID !== collapseID ? collapseID : '',
    }));
  };

  logoutHandler = e => {
    e.preventDefault();
    logout();
  };

  render() {
    const { collapseID } = this.state;
    return (
      <div>
        <Navbar className={collapseID ? 'Navbar__ToggleShow' : null}>
          <div className='NavbarLink NavbarLink-brand'>ReCaller</div>
          {/* <nav
          className={
            this.state.collapseID
              ? 'Navbar__Items Navbar__ToggleShow'
              : 'Navbar__Items'
          }
        >
          <div className='NavbarLink'>Link</div>
          <div className='NavbarLink'>Link</div>
          <div className='NavbarLink'>Link</div>
        </nav> */}
          <nav
            className={
              collapseID
                ? 'Navbar__Items Navbar__ToggleShow'
                : 'Navbar__Items Navbar__Items--right'
            }
          >
            {/* <div className='NavbarLink'>Dashboard</div> */}
            <li
              className='NavbarLink'
              style={{ color: '#6B6D76', listStyle: 'none' }}
            >
              <a style={{ color: '#083D77', padding: '5px' }} href='/'>
                Dashboard
              </a>
            </li>
            <li
              className='NavbarLink'
              style={{ color: '#6B6D76', listStyle: 'none' }}
            >
              <a style={{ color: '#083D77', padding: '5px' }} href='/'>
                Add New Call
              </a>
            </li>
            <li
              className='NavbarLink'
              style={{ color: '#6B6D76', listStyle: 'none' }}
            >
              <a style={{ color: '#083D77', padding: '5px' }} href='/'>
                Review Calls
              </a>
            </li>
            <li
              className='NavbarLink'
              style={{ color: '#6B6D76', listStyle: 'none' }}
            >
              <a style={{ color: '#083D77', padding: '5px' }} href='/'>
                Previous Calls
              </a>
            </li>
            <li
              className='NavbarLink'
              style={{ color: '#6B6D76', listStyle: 'none' }}
            >
              <a style={{ color: '#083D77', padding: '5px' }} href='/choose'>
                Choose Contact
              </a>
            </li>
            <li
              className='NavbarLink'
              style={{ color: '#6B6D76', listStyle: 'none' }}
            >
              <a
                style={{ color: '#083D77', padding: '5px' }}
                href='/'
                onClick={this.logoutHandler}
              >
                Sign Out
              </a>
            </li>
          </nav>
          <div
            onClick={this.toggleCollapse('navbarCollapse1')}
            id='navbarCollapse1'
            isOpen={collapseID}
            className='NavbarLink NavbarLink-toggle'
          >
            <i className='fas fa-bars' />
          </div>
          <Hr className='hr-underline' />
        </Navbar>
      </div>
    );
  }
}

export default NavbarPage;

const Navbar = styled.div`
  background-color: transparent;
  display: flex;
  padding: 16px;
  justify-content: space-between;
  font-family: sans-serif;
  color: white;
  .NavbarLink {
    padding-right: 8px;
    font-size: 1.2rem;
  }
  .NavbarLink-brand {
    color: #083d77;
    font-size: 4rem;
    font-family: pacifico;
    margin-left: 2.5%;
    @media only screen and (max-width: 768px) {
      font-size: 2.5rem;
      align-self: center;
    }
  }
  .Navbar__Items {
    display: flex;
  }
  .Navbar__Items--right {
    margin-left: auto;
    align-self: center;
  }
  .NavbarLink-toggle {
    display: none;
  }
  @media only screen and (max-width: 768px) {
    .Navbar__Items,
    .Navbar {
      flex-direction: column;
    }
    .Navbar__Items {
      display: none;
    }
    .Navbar__Items--right {
      margin-left: 0;
    }
    .Navbar__ToggleShow {
      display: flex;
    }
    .NavbarLink-toggle {
      align-self: flex-end;
      color: #083d77;
      display: initial;
      align-self: center;
      font-size: 2.5rem;
      cursor: pointer;
    }
  }
`;

const Hr = styled.hr`
  border-color: #083d77;
  width: 70%;
  margin-left: 30%;
  position: absolute;
  top: 75px;

  @media only screen and (max-width: 768px) {
    display: none;
  }
`;
