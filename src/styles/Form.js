import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  width: 90%;

  input.text,
  input[type='text'],
  input[type='button'],
  input[type='submit'],
  input[type='password'],
  input[type='email'],
  .input-checkbox {
    border-radius: 0;
  }

  input {
    -webkit-appearance: none;
    height: 40px;
    font-size: 1.5rem;
    margin-bottom: 10px;
    border: 1px solid #cecece;
    border-bottom: 3px solid #cecece;
    padding: 5px;
  }

  input:focus {
    outline: none;
    border-bottom: 3px solid #1188e6;
  }

  button {
    height: 40px;
    font-size: 1.4rem;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 10px;
    border: none;
    background: #cecece;

    img {
      height: 90%;
    }
  }

  .sr {
    position: absolute;
    left: -99999px;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
`;
