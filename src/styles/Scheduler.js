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
    left: 10px;
    width: 95%;
    display: flex;
    justify-content: space-between;
  }
`;
