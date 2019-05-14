import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import { styles } from '../styles/styledDefaultComponents';

export const CustomStripeBtn = styled(StripeCheckout)`
  background: linear-gradient(rgb(40, 160, 229), rgb(1, 94, 148));
  @media (min-width: 768px) {
    height: 50px !important;

    span {
      font-size: 2.5rem !important;
      background-image: none !important;
      box-shadow: none !important;
    }
  }
  @media (min-width: 992px) {
    min-height: 50px !important;
    /* width: 50% !important; */
    span {
      font-size: 3.5rem !important;
    }
  }
`;

export const Scheduler = styled.div`
  width: 95%;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  font-family: Roboto, helvetica;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid darkgrey;
  height: 80vh;
  box-shadow: 1px 1px 15px;
  @media (min-width: 768px) {
    width: 80%;
  }
  @media (min-width: 992px) {
    width: 70%;
  }
  .heading {
    font-size: 3rem;
    @media (min-width: 768px) {
      font-size: 3.5rem;
    }
    @media (min-width: 992px) {
      font-size: 4.5rem;
    }
  }
  p {
    margin: 5% auto;
    font-size: 2rem;
    text-align: center;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      font-size: 4.5rem;
    }
  }
  .chooseDayWeek {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.7rem;
    /* border: 1px solid red; */
    width: 80%;
    margin-bottom: 5%;
    margin-top: 10%;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      width: 95%;
      font-size: 3.5rem;
    }
    label {
      margin-right: 10px;
    }
    select {
      font-size: 1.5rem;
      @media (min-width: 768px) {
        font-size: 2rem;
      }
      @media (min-width: 992px) {
        font-size: 3rem;
      }
    }
  }
  .chooseTime {
    /* border: 1px solid purple; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin-bottom: 5%;
    font-size: 1.6rem;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      font-size: 3.5rem;
    }
    label {
      margin-right: 10px;
    }
    select {
      margin-right: 10px;
      font-size: 1.5rem;
      @media (min-width: 768px) {
        font-size: 2rem;
      }
      @media (min-width: 992px) {
        font-size: 3rem;
      }
    }
  }

  .chooseTimezone {
    /* border: 1px solid blue; */
    display: flex;
    align-items: center;
    justify-content: center;
    width: 80%;
    margin-bottom: 10%;
    font-size: 1.6rem;
    text-transform: capitalize;
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      font-size: 3.5rem;
      margin-bottom: 3%;
    }
    label {
      margin-right: 10px;
    }
    select {
      font-size: 1.5rem;
      @media (min-width: 768px) {
        font-size: 2rem;
      }
      @media (min-width: 992px) {
        font-size: 3rem;
        margin-bottom: 2%;
      }
    }
  }
  .submitBtn {
    padding: 1.5%;
    background-color: #3b78c6;
    color: white;
    border-radius: 5px;
    margin-top: 2%;
    font-size: 1.4rem;
    &:hover {
      background: white;
      color: ${styles.colors.mainBlue};
    }
    @media (min-width: 768px) {
      font-size: 2.5rem;
    }
    @media (min-width: 992px) {
      font-size: 3.5rem;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
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
      /* background: ; */
    }
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
