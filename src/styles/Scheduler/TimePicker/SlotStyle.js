import styled from 'styled-components';

const SlotStyle = styled.div`
  cursor: pointer;
  user-select: none;
  text-align: center;
  width: 100%;
  white-space: nowrap;
  font-weight: 400;
  font-size: 1.6rem;
  padding: 5px 0;
  &:first-child {
    padding-top: 10px;
  }
  &:last-child {
    padding-bottom: 10px;
  }
  background: ${props => (!props.selected ? '#fff' : '#ee6352')};
`;

export default SlotStyle;
