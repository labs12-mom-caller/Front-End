import React from 'react';
import styled from 'styled-components';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const AboutUs = () => {
  return (
    <>
      <H2>Our Team</H2>
      <CardContainer>
        {/* Michael */}
        <DevCard>
          <DevImage
            src='https://avatars0.githubusercontent.com/u/40702969?s=460&v=4'
            alt='Profile'
          />
          <DevInfo>
            <DevInfoTitle>Michael Checo</DevInfoTitle>
            <DevInfoDesc>
              Project Manager &amp; Student at LambdaSchool
            </DevInfoDesc>
          </DevInfo>
          <SocialButtons>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://github.com/MichaelCheco', '_blank')
              }
            >
              <FaGithub />
              &nbsp;GitHub
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/michael-checo/',
                  '_blank',
                )
              }
            >
              <FaLinkedin />
              &nbsp;LinkedIn
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://twitter.com/MichaelCheco1', '_blank')
              }
            >
              <FaTwitter />
              &nbsp;Twitter
            </SocialButton>
          </SocialButtons>
        </DevCard>

        {/* shawn */}
        <DevCard>
          <DevImage
            src='https://avatars1.githubusercontent.com/u/42783252?s=460&v=4'
            alt='Profile'
          />
          <DevInfo>
            <DevInfoTitle>Shawn Antonucci</DevInfoTitle>
            <DevInfoDesc>
              Teacher Assistant &amp; Student at LambdaSchool
            </DevInfoDesc>
          </DevInfo>
          <SocialButtons>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://github.com/shawnantonucci', '_blank')
              }
            >
              <FaGithub />
              &nbsp;GitHub
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/shawn-antonucci',
                  '_blank',
                )
              }
            >
              <FaLinkedin />
              &nbsp;LinkedIn
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://twitter.com/Shawn_Antonucci', '_blank')
              }
            >
              <FaTwitter />
              &nbsp;Twitter
            </SocialButton>
          </SocialButtons>
        </DevCard>

        {/* Kevin */}
        <DevCard>
          <DevImage
            src='https://avatars1.githubusercontent.com/u/34979828?s=460&v=4'
            alt='Profile'
          />
          <DevInfo>
            <DevInfoTitle>Kevin Smith</DevInfoTitle>
            <DevInfoDesc>Full Stack JavaScript Software Engineer</DevInfoDesc>
          </DevInfo>
          <SocialButtons>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://github.com/keveightysev', '_blank')
              }
            >
              <FaGithub />
              &nbsp;GitHub
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/keveightysev',
                  '_blank',
                )
              }
            >
              <FaLinkedin />
              &nbsp;LinkedIn
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://twitter.com/keveightysev', '_blank')
              }
            >
              <FaTwitter />
              &nbsp;Twitter
            </SocialButton>
          </SocialButtons>
        </DevCard>

        {/* Dylan Dislers */}
        <DevCard>
          <DevImage
            src='https://avatars0.githubusercontent.com/u/43049713?s=460&v=4'
            alt='Profile'
          />
          <DevInfo>
            <DevInfoTitle>Dylan Dislers</DevInfoTitle>
            <DevInfoDesc>Full Stack Web Student At LambdaSchool</DevInfoDesc>
          </DevInfo>
          <SocialButtons>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://github.com/dislersd', '_blank')
              }
            >
              <FaGithub />
              &nbsp;GitHub
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://www.linkedin.com/in/dislersd/', '_blank')
              }
            >
              <FaLinkedin />
              &nbsp;LinkedIn
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://twitter.com/dislersd', '_blank')
              }
            >
              <FaTwitter />
              &nbsp;Twitter
            </SocialButton>
          </SocialButtons>
        </DevCard>

        {/* Jon */}
        <DevCard>
          <DevImage
            src='https://avatars0.githubusercontent.com/u/41089389?s=460&v=4'
            alt='Profile'
          />
          <DevInfo>
            <DevInfoTitle>Jonathan Palacio</DevInfoTitle>
            <DevInfoDesc>
              Full Stack Developer student at Lambda School
            </DevInfoDesc>
          </DevInfo>
          <SocialButtons>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://github.com/bangarangler', '_blank')
              }
            >
              <FaGithub />
              &nbsp;GitHub
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open(
                  'https://www.linkedin.com/in/jonathan-palacio-401945a3',
                  '_blank',
                )
              }
            >
              <FaLinkedin />
              &nbsp;LinkedIn
            </SocialButton>
            <SocialButton
              type='button'
              onClick={() =>
                window.open('https://twitter.com/bangarangler', '_blank')
              }
            >
              <FaTwitter />
              &nbsp;Twitter
            </SocialButton>
          </SocialButtons>
        </DevCard>
      </CardContainer>
    </>
  );
};

export default AboutUs;

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  width: 90%;
  margin: 0 auto 50px;
`;

const DevCard = styled.div`
  display: flex;
  padding: 25px;
  flex-direction: column;
  align-items: center;
  transition: box-shadow 0.3s;
  width: 300px;
  border-radius: 3px;
  box-shadow: 0 0 11px rgba(33, 33, 33, 0.2);
  margin: 20px;
  &:hover {
    box-shadow: 0px 10px 30px -5px rgba(0, 0, 0, 0.3);
  }
`;

const DevImage = styled.img`
  width: 75%;
  height: auto;
  border-radius: 50%;
`;

const DevInfo = styled.div`
  width: 75%;
  height: 60px;
  margin-top: 15px;
`;

const DevInfoTitle = styled.h2`
  text-align: center;
  font-weight: 600;
  font-size: 2rem;
  color: #636578;
`;

const DevInfoDesc = styled.h2`
  text-align: center;
  margin-top: 10px;
  font-size: 1.6rem;
  font-weight: 300;
`;

const SocialButtons = styled.div`
  width: 100%;
  height: 80px;
  display: flex;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin: 20px 0 0;
`;

const SocialButton = styled.button`
  font-size: 1.6rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 30px;
  width: 100px;
  color: #fff;
  background: #636578;
  border: 1px solid #636578;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    color: #636578;
    background: #fff;
  }
`;

const H2 = styled.h2`
  text-align: center;
  font-size: 3rem;
  color: #636578;
  margin: 20px 0;
`;
