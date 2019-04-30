import React from 'react';
import styled from 'styled-components';
import { styles } from './index';

export function Title({ title, message }) {
  return (
    <TitleWrapper>
      <h3 className='message'>{message}</h3>
      <h2 className='title'>{title}</h2>
      <div className='underline' />
    </TitleWrapper>
  );
}

Title.defaultProps = {
  message: 'default message',
  title: 'default title',
};

const TitleWrapper = styled.div`
  text-align: center;
  .message {
    ${styles.logoText};
    ${styles.letterSpacing({ spacing: '.7rem' })};
    font-size: 2rem;
    color: ${styles.colors.mainBlue};
    margin: 2% auto;
  }
  .title {
    ${styles.letterSpacing({ spacing: '.5rem' })};
    font-size: 2rem;
    text-transform: uppercase;
    margin: 2% auto;
  }
  .underline {
    width: 5rem;
    height: 0.2rem;
    background: ${styles.colors.mainBlue};
    margin: 1rem auto;
  }
`;
