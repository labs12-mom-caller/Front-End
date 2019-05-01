import styled from 'styled-components';

export const CardContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  margin-bottom: 50px;

  @media (max-width: 500px) {
    flex-direction: column;
    align-self: center;
  }
`;
