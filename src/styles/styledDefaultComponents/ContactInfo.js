import styled from 'styled-components';

export const Card = styled.div`

  transition: box-shadow .3s;
  width: 100%;
  border-radius: 6px;
   background: #fff;
  box-shadow: 0 0 11px rgba(33,33,33,.2); 
  transition: box-shadow 0.5s;

    header {
      width: 100%
      background-color: #C4C4C4;
    }

    main {
      display: flex;
      justify-content: space-around;
    }

  img {
    max-width: 80px;
    border-radius: 100px;
  }

&:hover {
   box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
}
`;
