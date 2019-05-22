import styled from 'styled-components';

const Container = styled.main`
  padding: 2%;
  width: 90%;
  margin: 0 auto;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #999;
  margin: 2% auto;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  margin-bottom: 15px;
  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 992px) {
    &::first-child {
      display: none;
    }
  }
`;

export default Container;
