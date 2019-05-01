import styled from 'styled-components';

export const Wrapper = styled.div`
  min-width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;

  @media (min-width: 992px) {
    align-items: flex-start;
    margin-left: 2%;
    margin-top: -20px;
  }
`;

export const ProfileImage = styled.img`
  width: 50%;
  height: auto;
  margin-top: 20px;
  border-radius: 50%;
  border: 1.5px solid black;
  align-self: center;
  transition: 0.3s;

  &:hover {
    -webkit-filter: brightness(80%);
  }
`;

export const WelcomeUser = styled.h2`
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
`;

export const UpdateAccount = styled.p`
  margin-top: 10px;
  color: red;

  @media (min-width: 992px) {
  }
`;

export const DashboardButtons = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 50%;
  height: 125px;
  margin-top: 10px;
  justify-content: space-between;
`;
