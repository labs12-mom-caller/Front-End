import styled from 'styled-components';

export const Scheduler = styled.div`
  .slot {
    cursor: pointer;
    user-select: none;
    text-align: center;
    font-weight: 600;
    width: 100%;
  }

  .selected-slot {
    background: #ee6352;
  }

  .days {
    position: relative;
    width: 95%;
    margin: 0 auto;

    @media (max-width: 430px) {
      width: 80%;
    }
  }

  .slick-list {
    width: 95%;
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
    border: 3px solid #ee6352;
    border-radius: 10px;
    width: 100%;
  }
`;
