import styled from 'styled-components';

export const Scheduler = styled.div`
  width: 95%;
  padding: 10px;
  margin: 0 auto;
  margin-bottom: 20px;
  font-family: Roboto, helvetica;

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
      font-size: 24px;
      margin: 10px auto;
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
      background: ;
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
