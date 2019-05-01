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
    margin-left: 5%;
  }
`;

export const ProfileImage = styled.img`
  width: 25%;
  margin-top: 20px;
  height: auto;
  border-radius: 50%;
`;

export const WelcomeUser = styled.h2`
  margin-top: 15px;
  text-align: center;
  font-weight: bold;
`;

export const UpdateAccount = styled.p`
  margin-top: 10px;
  /* margin-left: 2%; */
  color: red;

  @media (min-width: 992px) {
    margin-left: 8%;
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
