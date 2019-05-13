/* eslint-disable react/no-unescaped-entities */
import React from 'react';
import styled from 'styled-components';
import { MDBIcon } from 'mdbreact';

const AboutUs = () => {
  return (
    <div style={{ width: '100%' }}>
      <Jumbo>
        <Title>ReCaller's Developers</Title>
      </Jumbo>

      <CardContainer>
        {/* Michael */}
        <DevCard>
          <Banner>
            <DevImage
              src='https://avatars0.githubusercontent.com/u/40702969?s=460&v=4'
              alt='Profile'
            />
            <DevInfo>
              <DevInfoTitle>Michael Checo</DevInfoTitle>
              <DevInfoDesc>
                Project Manager & Student at LambdaSchool
              </DevInfoDesc>
            </DevInfo>
            <DevGitBtn
              color='black'
              social='g'
              type='button'
              onClick={() =>
                (window.location.href = 'https://github.com/MichaelCheco')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </DevGitBtn>
          </Banner>
        </DevCard>

        {/* shawn */}
        <DevCard>
          <Banner>
            <DevImage
              src='https://avatars1.githubusercontent.com/u/42783252?s=460&v=4'
              alt='Profile'
            />
            <DevInfo>
              <DevInfoTitle>Shawn Antonucci</DevInfoTitle>
              <DevInfoDesc>
                Teacher Assistant & Student at LambdaSchool
              </DevInfoDesc>
            </DevInfo>
            <DevGitBtn
              color='black'
              social='g'
              type='button'
              onClick={() =>
                (window.location.href = 'https://github.com/shawnantonucci')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </DevGitBtn>
          </Banner>
        </DevCard>

        {/* Kevin */}
        <DevCard>
          <Banner>
            <DevImage
              src='https://avatars1.githubusercontent.com/u/34979828?s=460&v=4'
              alt='Profile'
            />
            <DevInfo>
              <DevInfoTitle>Kevin Smith</DevInfoTitle>
              <DevInfoDesc>Full Stack Web Student At LambdaSchool</DevInfoDesc>
            </DevInfo>
            <DevGitBtn
              color='black'
              social='g'
              type='button'
              onClick={() =>
                (window.location.href = 'https://github.com/keveightysev')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </DevGitBtn>
          </Banner>
        </DevCard>

        {/* Dylan Disler */}
        <DevCard>
          <Banner>
            <DevImage
              src='https://avatars0.githubusercontent.com/u/43049713?s=460&v=4'
              alt='Profile'
            />
            <DevInfo>
              <DevInfoTitle>Dylan Disler</DevInfoTitle>
              <DevInfoDesc>Full Stack Web Student At LambdaSchool</DevInfoDesc>
            </DevInfo>
            <DevGitBtn
              color='black'
              social='g'
              type='button'
              onClick={() =>
                (window.location.href = 'https://github.com/dislersd')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </DevGitBtn>
          </Banner>
        </DevCard>

        {/* Jon */}
        <DevCard>
          <Banner>
            <DevImage
              src='https://avatars0.githubusercontent.com/u/41089389?s=460&v=4'
              alt='Profile'
            />
            <DevInfo>
              <DevInfoTitle>Jonathan Palacio</DevInfoTitle>
              <DevInfoDesc>
                Full Stack Developer currently attending Lambda School
              </DevInfoDesc>
            </DevInfo>
            <DevGitBtn
              color='black'
              social='g'
              type='button'
              onClick={() =>
                (window.location.href = 'https://github.com/bangarangler')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </DevGitBtn>
          </Banner>
        </DevCard>
      </CardContainer>
    </div>
  );
};

export default AboutUs;

const Jumbo = styled.div`
  background-color: #083d77;
  display: flex;
  height: 100px;
  justify-content: center;
  position: absolute;
  top: 60px;
  right: 0;
  left: 0;
`;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin-top: 10%;
`;

const Title = styled.div`
  text-align: center;
  color: white;
  font-family: pacifico;
  align-self: center;
  font-size: 1.6rem;
`;

const DevCard = styled.div`
  display: flex;
  flex-direction: column;
  height: 20%;
  margin-top: 20px;
  padding: 25px;
  align-items: center;
  background-color: white;
`;

const Banner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s;
  width: 300px;
  height: 350px;
  border-radius: 3px;
  background: #fff;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  transition: box-shadow 0.5s;
  justify-content: center;
  ::-webkit-scrollbar {
   width: 0px;  /* Remove scrollbar space */
   background: transparent;  /* Optional: just make scrollbar invisible */
}

  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
  @media (max-width: 650px) {
    /
  }
`;

const DevImage = styled.img`
  width: 170px;
  height: auto;
`;

const DevInfo = styled.div`
  width: 75%;
  height: 60px;
  margin-top: 15px;
`;

const DevInfoTitle = styled.h2`
  text-align: center;
  font-weight: bold;
  font-size: 1.1rem;
`;

const DevInfoDesc = styled.h2`
  text-align: center;
  margin-top: 10px;
`;

const DevGitBtn = styled.button`
  text-transform: capitalize;
  margin-top: 20px;
  background-color: black;
  color: white;
  height: 28px;
  width: 25%;
`;
