import styled from 'styled-components';

export const CallPlanView = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Roboto', sans-serif;

  h2 {
    font-weight: 600;
    font-size: 3rem;
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 20px;
  }

  .card-container {
    width: 100%;
    display: flex;
    justify-content: space-evenly;
    margin: 50px 0;

    .card {
      width: 35%;
      padding: 20px;

      p:first-child {
        font-weight: 600;
        font-size: 1.8rem;
      }

      h3 {
        font-size: 1.5rem;
        margin-bottom: 10px;
      }

      h4 {
        font-size: 1.3rem;
      }

      p {
        font-size: 1.2rem;
        font-weight: 500;
      }

      & > button {
        cursor: pointer;
        height: 40px;
        font-size: 1.4rem;
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: 300;
        margin-bottom: 10px;
        border: none;
        width: 75%;
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
          user-select: none;
          color: #a4a5b2;
        }
      }
    }

    .frequency-wrap {
      width: 100%;
      margin: 10px 0;

      .frequency {
        cursor: pointer;
        height: 40px;
        width: 37.5%;
        background-color: #636578;
        color: white;
        border: 1px solid #636578;
        font-size: 1.4rem;
        transition: all 0.4s ease;

        &:first-child {
          border-top-left-radius: 2px;
          border-bottom-left-radius: 2px;
        }

        &:last-child {
          border-top-right-radius: 2px;
          border-bottom-right-radius: 2px;
        }

        &:hover {
          background-color: #ffffff;
          color: #636578;
          border: 1px solid #636578;
        }
      }

      .active {
        background: #ff6f61;
        border: 1px solid #6b6d76;
      }
    }
  }
`;
