import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 20px;
  justify-content: center;
  align-items: center;
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
    width: 75%;
    box-shadow: 0.5px 1px 10px;
    font-size: 1.5rem;
    margin-bottom: 10px;
    border: 1px solid #999999;
    border-bottom: 3px solid #cecece;
    padding: 9px;
    padding: 25px;
  }

  input:focus {
    outline: none;
    border-bottom: 3px solid #1188e6;
  }
  .sr {
    position: absolute;
    left: -99999px;
    height: 1px;
    width: 1px;
    overflow: hidden;
  }
`;
