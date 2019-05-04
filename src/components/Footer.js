import React from 'react';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterWrap>
      <SectionLeft className='sectionLeft' style={{}}>
        <p style={{ color: 'white' }}>
          We believe in connecting friends and family by offering scheduled
          calls and call transcription. Always remember the things you’ve talked
          about with your loved ones. We are ReCaller.
        </p>
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
          <li className='list' style={{ color: '#6B6D76' }}>
            <a style={{ color: '#FF6F61' }} href='/'>
              Dashboard
            </a>
          </li>
          <li className='list' style={{ color: '#6B6D76' }}>
            <a style={{ color: '#FF6F61' }} href='#!'>
              Add New Call
            </a>
          </li>
          <li className='list' style={{ color: '#6B6D76' }}>
            <a style={{ color: '#FF6F61' }} href='#!'>
              Review Calls
            </a>
          </li>
          <li className='list' style={{ color: '#6B6D76' }}>
            <a style={{ color: '#FF6F61' }} href='#!'>
              Previous Calls
            </a>
          </li>
          <li className='list' style={{ color: '#6B6D76' }}>
            <a style={{ color: '#FF6F61' }} href='/about-us'>
              Our Team
            </a>
          </li>
        </ul>
      </SectionRight>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.div`
  display: flex;
  background-color: #083d77;
  /* height: 250px; */
  height: 17%;
  @media (max-width: 992px) {
    margin-top: 40%;
  }
`;
const SectionLeft = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  padding-left: 2%;
  width: 48%;
  @media (max-width: 992px) {
    p {
      padding: 5px;
      font-size: 12px;
    }
    span {
      text-align: center;
      margin-left: 5%;
    }
  }
`;
const SectionRight = styled.div`
  /* align-self: flex-end; */
  margin-left: 4%;
  margin-top: 2.6%;
  width: 40%;
  font-weight: bold;
  font-size: 18px;
  line-height: 1.5;
  @media (max-width: 992px) {
    padding: 5px;
    margin-top: 8%;
    margin-right: 2%;
    font-size: 15px;
    line-height: 1.5;
  }
`;
