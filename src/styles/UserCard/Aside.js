import styled from 'styled-components';

const Aside = styled.aside`
  grid-row: 2 / -1;
  grid-column: 1;

  @media (max-width: 1025px) {
    grid-area: aside;
  }
`;

export default Aside;
