import styled from 'styled-components';

const Section = styled.section`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  padding: 1%;

  @media (max-width: 992px) {
    width: 80%;
    &:first-child {
      display: none;
    }
  }
`;

export default Section;
