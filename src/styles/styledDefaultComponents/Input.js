import styled from 'styled-components';
import { styles } from './index';

export const DefaultInput = styled.input`
  width: 70%;
  border-radius: 100px;
  border: 2px solid ${styles.colors.mainBlue};
  margin: 4px auto;
  font-size: 18px;
  padding: 10px;
  text-align: center;
  ::-webkit-input-placeholder {
    color: ${styles.colors.mainBlue};
    text-transform: capitalize;
    letter-spacing: 0.1rem;
    ${styles.logoText};
  }
  ::-moz-placeholder {
    /* Firefox 19+ */
    color: ${styles.colors.mainBlue};
  }
  :-ms-input-placeholder {
    /* IE 10+ */
    color: ${styles.colors.mainBlue};
  }
  :-moz-placeholder {
    /* Firefox 18- */
    color: ${styles.colors.mainBlue};
  }
`;
