import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import { styles } from './styledDefaultComponents';

export const CustomStripeBtn = styled(StripeCheckout)`
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  @media (max-width: 993px) {
    height: 50px !important;

    span {
      font-size: 2.5rem !important;
      background-image: none !important;
      box-shadow: none !important;
    }
  }
  @media (max-width: 992px) {
    max-height: 30px !important;
    font-size: 1.5rem;
    width: 127px;

    span {
      font-size: 1.3rem !important;
    }
  }
  @media (max-width: 400px) {
    max-height: 30px !important;
    width: 95px;
    font-size: 1.1rem;

    span {
      font-size: 1rem !important;
    }
  }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 0% auto;

  @media (max-width: 993px) {
    min-height: 60%;
    flex-direction: row;
  }
  @media (max-width: 600px) {
    min-height: 60%;
  }
`;

export const Scheduler = styled.div`
  width: 70%;
  padding: 2%;
  width: 95%;
  /* padding: 10px; */
  margin: 0 auto;
  margin-bottom: 20px;
  font-family: Roboto, helvetica;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid darkgrey;
  max-height: 80%;
  box-shadow: 0px 0px 12px #00000061;
  margin: 2% auto;

  .heading {
    font-size: 2rem;
    font-weight: 300;

    @media (max-width: 992px) {
      width: 95%;
      font-size: 2rem;
      padding: 5%;
      font-size: 1.8rem;
      font-weight: 400;
    }
  }
  .info {
    font-size: 2rem;
    font-weight: 300;
    text-align: left;
  }
  p {
    margin: 5% auto;
    font-size: 2rem;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      font-size: 3rem;
    }
  }
  .chooseDayWeek {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    width: 80%;
    margin-bottom: 2%;
    margin-top: 2%;

    @media (max-width: 992px) {
      flex-direction: column;
      width: 95%;
      font-size: 2rem;

      label {
        margin-bottom: 3%;
      }
    }
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      font-size: 1.5rem;
      font-weight: 300;

      label {
        margin-bottom: 4%;
      }
    }
    label {
      margin-right: 10px;
    }
    select {
      font-size: 1.5rem;
    }
  }
  .chooseTime {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin-bottom: 2%;
    font-size: 1.6rem;

    @media (max-width: 992px) {
      display: flex;
      flex-direction: row;
      width: 95%;
      font-size: 2rem;
    }
    @media (max-width: 600px) {
      display: flex;
      flex-direction: row;
      font-size: 1.5rem;
      font-weight: 300;
    }
    label {
      margin-right: 10px;
    }
    select {
      font-size: 1.5rem;
      margin-right: 5px;
    }
  }

  .chooseTimezone {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin-bottom: 5%;
    font-size: 1.6rem;
    text-transform: capitalize;

    @media (max-width: 992px) {
      width: 95%;
      font-size: 2rem;
      flex-direction: column;
      label {
        margin-bottom: 3%;
      }
    }
    @media (max-width: 600px) {
      display: flex;
      flex-direction: column;
      font-size: 1.3rem;
      font-weight: 300;

      label {
        margin-bottom: 4%;
        font-size: 2rem;
      }
    }

    label {
      margin-right: 10px;
    }

    select {
      font-size: 1.5rem;

      @media (max-width: 992px) {
        width: 95%;
        font-size: 2rem;

        select {
          font-size: 2rem;
        }
      }
    }
  }
  .submitBtn {
    cursor: pointer;
    background-color: #ff6f61;
    color: white;
    border-radius: 5px;
    margin-top: 2%;
    font-size: 1.4rem;
    height: 30px;
    font-weight: bold;
    text-decoration: none;
    border: 1px solid #ff6f61;
    &:hover {
      background: white;
      color: #ff6f61;
    }
    @media (max-width: 768px) {
      font-size: 1.3rem;
      width: 90px;
    }
    @media (max-width: 992px) {
      width: 128px;
      font-size: 1.3rem;
    }
    @media (max-width: 400px) {
      width: 95px;
      font-size: 1.1rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 90%;
  }

  h2 {
    text-align: center;
    margin-bottom: 5px;
  }

  .header {
    h2 {
      font-size: 2rem;
      margin: 5% auto;
      display: flex;
      justify-content: center;
      align-items: center;

      padding: 20px;
    }

    p {
      margin: 0 auto;
      margin-bottom: 20px;
      font-size: 18px;

      line-height: 1.3;
      border: 1px solid #636578;
      padding: 20px;
      font-weight: 300;
      max-width: 600px;
    }
  }

  .updateForm {
    width: 60%;

    select {
      margin: 1rem auto;
    }
  }

  .updateSelects {
    display: flex;
    width: 59%;
    flex-direction: column;
    align-items: center;
  }

  .updateChooseTime {
  }

  .timezone-select {
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px auto;
    max-width: 300px;
  }

  .slot {
    cursor: pointer;
    user-select: none;
    text-align: center;
    font-weight: 600;
    width: 100%;
    white-space: nowrap;

    font-weight: 400;
    padding: 5px;
  }

  .selected-slot {
    background: #ee6352;
  }

  .days {
    position: relative;
    width: 100%;
    margin: 20px auto;
    padding: 20px;

    @media (max-width: 430px) {
      width: 80%;
    }
  }

  .slick-list {
    width: 100%;
  }

  .slick-track::before {
    width: 95%;
  }

  .slick-arrow::before {
    color: #ee6352;
  }
  .slick-active,
  .slick-current {
    margin: 0 auto;
  }
  .slick-slide {
    width: 95%;
  }

  .slick-slide:focus {
    outline: 0;
  }

  .slick-next {
    right: -10px;
  }

  .slick-right {
    left: -15px;
  }

  .time-slots-container {
    overflow: hidden;
    border: 1px solid grey;
    padding: 10px;
    border-radius: 10px;
    width: 100%;
    // overscroll-behavior-y: none;
    transition: box-shadow 0.3s;
    width: 100%;
    border-radius: 6px;
    background: #fff;
    box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
    transition: box-shadow 0.5s;
  }
`;
