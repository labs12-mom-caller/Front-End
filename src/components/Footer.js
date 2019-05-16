import React from 'react';
import styled from 'styled-components';
import { Link } from '@reach/router';
import { FaFacebook, FaTwitter, FaLinkedin } from 'react-icons/fa';
import PropTypes from 'prop-types';

const Footer = ({ user }) => {
  return (
    <FooterWrap>
      <SectionLeft>
        <h2>
          <FooterLink to='/'>ReCaller</FooterLink>
        </h2>
        <IconsWrapper>
          <FaFacebook className='icon facebook' />
          <FaLinkedin className='icon linkedin' />
          <FaTwitter className='icon twitter' />
        </IconsWrapper>
        <span>&copy; {new Date().getFullYear()}</span>
      </SectionLeft>
      <FooterNav>
        <FooterLink to='/'>Dashboard</FooterLink>
        <FooterLink to={`/choose/${user.uid}`}>Add New Call</FooterLink>
        <FooterLink to={`/billing/${user.uid}`}>Billing Information</FooterLink>
        <FooterLink to='/about-us'>Our Team</FooterLink>
      </FooterNav>
    </FooterWrap>
  );
};

export default Footer;

const FooterWrap = styled.footer`
  flex-shrink: 0;
  display: flex;
  justify-content: space-between;
  background-color: #636578;
  z-index: 10;
  width: 100%;
  height: 150px;
  padding: 10px 5%;
  font-size: 1.6rem;
  color: white;
`;

const SectionLeft = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;

  h2 {
    font-size: 3rem;
    font-family: 'Pacifico', cursive;
  }
`;

const IconsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 120px;

  .icon {
    font-size: 2rem;
    transition: all 0.3s ease-in-out;
  }
  .facebook:hover {
    color: #3b5998;
  }
  .twitter:hover {
    color: #1da1f2;
  }
  .linkedin:hover {
    color: #0077b5;
  }
`;

const FooterNav = styled.nav`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: flex-end;
`;

const FooterLink = styled(Link)`
  color: white;
  &:hover {
    color: #ff6f61;
  }
`;

Footer.propTypes = {
  user: PropTypes.shape({
    uid: PropTypes.string,
  }),
};
