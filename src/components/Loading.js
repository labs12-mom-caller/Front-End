import React from 'react';
import Loader from 'react-loader-spinner';
import styled from 'styled-components';

const Loading = () => {
  return (
    <Container>
      <Loader type='Oval' color='#ff6f61' height='150' width='150' />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  height: 100%;
  width: 100%;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
`;

export default Loading;
