import styled from 'styled-components';

export const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 60%;
  max-width: 800px;
  margin: 0 auto;
  font-family: 'Roboto', sans-serif;

  @media (max-width: 410px) {
    width: 100%;
  }

  h1 {
    font-family: 'Pacifico', cursive;
    font-size: 3rem;
    margin-top: 30px;
    color: #636578;
  }

  p {
    text-align: center;
    font-size: 1.5rem;
    font-weight: 300;
    line-height: 1.3;
    margin-top: 20px;
  }
  input {
  width: 60%;
  border-radius: 4px;
  outline: 0;
  color: #999999;
  margin: 5px 0;
  padding-left: 10px;
  padding: 9px
  font-size: 16px;
  background-color: rgba(0, 0, 0, 0.0001);
  border: 1px solid #999999;
  &::placeholder {
    color: #999999;
    font-size: 18px;

    @media (max-width: 400px) {
      font-size: 1.4rem;
    }
  }
  }

`;
