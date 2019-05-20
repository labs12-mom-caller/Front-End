import styled from 'styled-components';

const User = styled.div`
  display: flex;
  flex-direction: column;
  justify-items: center;
  align-items: center;
  padding: 5px;

  a {
    border-radius: 50%;
    display: flex;
    justify-contet: center;
    align-items: center;
    margin-top: 35px;
    width: 80%;

    &:hover {
      box-shadow: 0 0 11px rgba(33, 33, 33, 0.8);
      transition: box-shadow 0.5s;
    }
  }
`;

export default User;
