import React from 'react';
import styled from 'styled-components';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import PropTypes from 'prop-types';
import { styles } from 'ansi-colors';

const Footer = ({ user }) => {
  return (
    <FooterWrap>
      <SectionLeft className='sectionLeft' style={{}}>
        <p style={{ color: 'white' }}>ReCaller</p>
        <div>
          <FaFacebook className='icon facebook' />
          <FaLinkedin className='icon linkedin' />
          <FaTwitter className='icon twitter' />
        </div>
        <span style={{ color: 'white' }}>
          &copy; {new Date().getFullYear()}
          <a href='/' style={{ color: 'white' }}>
            {' '}
            ReCaller{' '}
          </a>
        </span>{' '}
      </SectionLeft>
      <SectionRight>
        <ul>
          <li className='list'>
            <a href='/'>Dashboard</a>
          </li>
          <li className='list'>
            <a href={`/choose/${user.uid}`}>Add New Call</a>
          </li>
          <li className='list'>
            <a href='#!'>Review Calls</a>
          </li>
          <li className='list'>
            <a href={`/prev-calls/${user.uid}`}>Previous Calls</a>
          </li>
          <li className='list'>
            <a href='/about-us'>Our Team</a>
          </li>
        </ul>
      </SectionRight>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.footer`
  display: flex;
  justify-content: space-between;
  background-color: #636578;
  height: 15vh;
  width: 100%;
  /* margin-top: 25px; */
  @media (max-width: 992px) {
    /* margin-left: 6%; */
  }
`;
const SectionLeft = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  margin-left: 3%;
  width: 48%;
  @media (min-width: 992px) {
    margin-left: 5%;
  }
  div {
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    /* border: 1px solid red; */
    width: 50%;
    margin-left: -6%;
    @media (min-width: 992px) {
      margin-left: -7%;
    }
    .icon {
      font-size: 1.5rem;
      transition: all 1s ease-in-out;
    }
    .facebook {
      &:hover {
        color: #3b5998;
      }
    }
    .twitter {
      &:hover {
        color: #1da1f2;
      }
    }
    .linkedin {
      &:hover {
        color: #0077b5;
      }
    }
  }
  p {
    font-size: 1rem;
    margin-top: 5%;
    @media (min-width: 992px) {
      font-size: 1rem;
      margin-top: 1%;
    }
  }
  span {
    margin-bottom: 5%;
    @media (min-width: 992px) {
      font-size: 1rem;
      margin-bottom: 1%;
    }
  }
`;
const SectionRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  margin-right: 5%;
  font-weight: bold;
  line-height: 1.5;
  @media (min-width: 992px) {
    margin-right: 7%;
  }
  ul {
    li {
      list-style: none;
      color: white;
      @media (min-width: 992px) {
        font-size: 1rem;
      }
    }
  }
  a {
    color: white;
  }
`;

Footer.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};
