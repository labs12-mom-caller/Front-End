import styled from 'styled-components';
import { styles } from './index';

export const DefaultButtonRed = styled.button`
  /* display: flex;
  justify-content: center;
  align-items: center; */
  display: block;
  margin: 1rem auto;
  border: 2px solid ${styles.colors.redOrange};
  width: 70%;
  color: ${styles.colors.redOrange};
  background: 2px solid ${styles.colors.mainWhite};
  font-size: 1rem;
  padding: 0.5rem;
  text-transform: capitalize;
  font-weight: 700;
  border-radius: 20px;
  ${styles.letterSpacing(`.2rem`)};
  ${styles.transitionDefault};
  cursor: pointer;
  &:hover {
    color: ${styles.colors.mainWhite};
    background: ${styles.colors.redOrange};
    border: 2px solid ${styles.colors.mainWhite};
  }
`;

export const DefaultButtonRedBG = styled(DefaultButtonRed)`
  background-color: ${styles.colors.redOrange};
  color: ${styles.colors.mainWhite};
  &:hover {
    color: ${styles.colors.redOrange};
    background: ${styles.colors.mainWhite};
    border: 2px solid ${styles.colors.redOrange};
  }
`;

export const DefaultButtonBlue = styled(DefaultButtonRed)`
  color: ${styles.colors.mainBlue};
  border: 2px solid ${styles.colors.mainBlue};
  &:hover {
    color: ${styles.colors.mainWhite};
    background: ${styles.colors.mainBlue};
    border: ${styles.colors.mainWhite};
  }
`;

export const DefaultButtonBlueBG = styled(DefaultButtonRed)`
  color: ${styles.colors.mainWhite};
  background: ${styles.colors.mainBlue};
  border: 2px solid ${styles.colors.mainWhite};
  &:hover {
    color: ${styles.colors.mainBlue};
    background: ${styles.colors.mainWhite};
    border: 2px solid ${styles.colors.mainBlue};
  }
`;
