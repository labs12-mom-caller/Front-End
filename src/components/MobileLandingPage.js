import React from 'react';
import styled from 'styled-components';
import { styles, DefaultButtonRedBG } from '../styles/styledDefaultComponents';

const MobileLandingPage = props => {
  return (
    <MobileLandingPageContainer>
      <h1>recaller</h1>
      <h3>stay connected</h3>
      <p>Never forget to call your loved ones again.</p>
      <DefaultButtonRedBG>get started</DefaultButtonRedBG>
    </MobileLandingPageContainer>
  );
};

export default MobileLandingPage;

const MobileLandingPageContainer = styled.main`
  border: 1px solid ${styles.colors.mainBlue};
`;
