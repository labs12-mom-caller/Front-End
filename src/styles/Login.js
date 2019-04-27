import styled from 'styled-components';

const Wrapper = styled.div`
  border: 3px solid black;
  display: flex;
  flex-direction: column;

  .login-toggle-btn {
    border: none;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 180px;
  }

  button {
    width: 180px;
    padding: 10px;
    font-size: 14px;
    border-radius: 2px;
    border: 2px solid black;
    padding: 5px;
    cursor: pointer;
    margin-bottom: 20px;
  }
  justify-content: center;
  align-items: center;
  padding: 20px;
  margin: 5px;
  width: 400px;
  height: 400px;
`;

export default Wrapper;
