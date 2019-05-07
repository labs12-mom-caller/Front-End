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
              Home
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

  return <Div />;
};
const Div = styled.div`
  background-color: #636578;
  border: 1px solid black;
  height: 15vh;
`;
export default Footer;
