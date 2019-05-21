import styled from 'styled-components';

const Button = styled.button`
  background-color: #636578;
  width: 157px;
  height: 43px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
  border: 1px solid #636578;
  transition: all 0.4s ease;
  outline: 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  &:hover {
    background-color: #ffffff;
    color: #636578;
    border: 1px solid #636578;
    cursor: pointer;
    transition: all 0.4s ease;
  }
`;

export default Button;
