import styled from 'styled-components';

const Button = styled.button`
  cursor: pointer;
  height: 40px;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 300;
  margin: 10px 0;
  border: none;
  width: 50%;
  background-color: #636578;
  color: white;
  border-radius: 2px;
  transition: all 0.4s ease;

  &:hover {
    background-color: #ffffff;
    color: #636578;
    border: 1px solid #636578;
  }

  &:disabled {
    cursor: default;
    user-select: none;
    color: #a4a5b2;
  }
`;

export default Button;
