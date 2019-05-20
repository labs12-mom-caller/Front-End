import styled from 'styled-components';

const Img = styled.img`
  border-radius: 50%;
  height: auto;
  width: 100%;

  @media (max-width: 1025px) {
    max-width: 300px;
  }
`;

export default Img;
