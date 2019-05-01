import React from 'react';
import {
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBCardTitle,
  MDBCardText,
  MDBIcon,
  MDBContainer,
  MDBJumbotron,
} from 'mdbreact';
import NavBar from './NavBar';
import { CardContainer } from '../styles/AboutUs';

const AboutUs = () => {
  return (
    <div>
      <NavBar />

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#6B6D76',
          maxWidth: '95%',
          margin: '5% auto',
        }}
      >
        <MDBJumbotron style={{ backgroundColor: '#083D77' }} fluid>
          <MDBContainer>
            <h2
              className='display-5'
              style={{
                textAlign: 'center',
                color: 'white',
                fontFamily: 'pacifico',
              }}
            >
              Our Awesome Team
            </h2>
          </MDBContainer>
        </MDBJumbotron>
        <CardContainer>
          {/* Michael */}
          <MDBCard
            style={{
              width: '17rem',
              height: '20%',
              marginTop: '20px',
              padding: '20px',
              alignItems: 'center',
              backgroundColor: 'white',
            }}
          >
            <MDBCardImage
              className='img-fluid'
              src='https://avatars0.githubusercontent.com/u/40702969?s=460&v=4'
              waves
              style={{ width: '200px', height: 'auto' }}
            />
            <MDBCardBody>
              <MDBCardTitle style={{ textAlign: 'center' }}>
                Michael Checo
              </MDBCardTitle>
              <MDBCardText style={{ textAlign: 'center' }}>
                Project Manager & Student at LambdaSchool
              </MDBCardText>
            </MDBCardBody>

            <MDBBtn
              color='black'
              social='g'
              style={{ textTransform: 'capitalize' }}
              onClick={() =>
                (window.location.href = 'https://github.com/MichaelCheco')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </MDBBtn>
          </MDBCard>

          {/* Shawn */}
          <MDBCard
            style={{
              width: '17rem',
              height: '20%',
              marginTop: '20px',
              padding: '20px',
              alignItems: 'center',
            }}
          >
            <MDBCardImage
              className='img-fluid'
              src='https://avatars1.githubusercontent.com/u/42783252?s=460&v=4'
              waves
              style={{ width: '200px', height: 'auto' }}
            />
            <MDBCardBody>
              <MDBCardTitle style={{ textAlign: 'center' }}>
                Shawn Antonucci
              </MDBCardTitle>
              <MDBCardText style={{ textAlign: 'center' }}>
                Teacher Assistant and Student at LambdaSchool
              </MDBCardText>
            </MDBCardBody>
            <MDBBtn
              color='black'
              social='g'
              style={{ textTransform: 'capitalize' }}
              onClick={() =>
                (window.location.href = 'https://github.com/shawnantonucci')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </MDBBtn>
          </MDBCard>

          {/* Kevin */}
          <MDBCard
            style={{
              width: '17rem',
              height: '20%',
              marginTop: '20px',
              padding: '20px',
              alignItems: 'center',
            }}
          >
            <MDBCardImage
              className='img-fluid'
              src='https://avatars1.githubusercontent.com/u/34979828?s=460&v=4'
              waves
              style={{ width: '200px', height: 'auto' }}
            />
            <MDBCardBody>
              <MDBCardTitle style={{ textAlign: 'center' }}>
                Kevin Smith
              </MDBCardTitle>
              <MDBCardText style={{ textAlign: 'center' }}>
                Full Stack Web Student At LambdaSchool
              </MDBCardText>
            </MDBCardBody>
            <MDBBtn
              color='black'
              social='g'
              style={{ textTransform: 'capitalize' }}
              onClick={() =>
                (window.location.href = 'https://github.com/keveightysev')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </MDBBtn>
          </MDBCard>

          {/* Jon */}
          <MDBCard
            style={{
              width: '17rem',
              height: '20%',
              marginTop: '20px',
              padding: '20px',
              alignItems: 'center',
            }}
          >
            <MDBCardImage
              className='img-fluid'
              src='https://avatars0.githubusercontent.com/u/41089389?s=460&v=4'
              waves
              style={{ width: '200px', height: 'auto' }}
            />
            <MDBCardBody>
              <MDBCardTitle style={{ textAlign: 'center' }}>
                Jonathan Palacio
              </MDBCardTitle>
              <MDBCardText style={{ textAlign: 'center' }}>
                Full Stack Developer currently attending Lambda School
              </MDBCardText>
            </MDBCardBody>
            <MDBBtn
              color='black'
              social='g'
              style={{ textTransform: 'capitalize' }}
              onClick={() =>
                (window.location.href = 'https://github.com/bangarangler')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </MDBBtn>
          </MDBCard>

          {/* Dylan */}
          <MDBCard
            style={{
              width: '17rem',
              height: '20%',
              marginTop: '20px',
              padding: '20px',
              alignItems: 'center',
            }}
          >
            <MDBCardImage
              className='img-fluid'
              src='https://avatars0.githubusercontent.com/u/43049713?s=460&v=4'
              waves
              style={{ width: '200px', height: 'auto' }}
            />
            <MDBCardBody>
              <MDBCardTitle style={{ textAlign: 'center' }}>
                Dylan Dislers
              </MDBCardTitle>
              <MDBCardText style={{ textAlign: 'center' }}>
                Full Stack Web Student At LambdaSchool
              </MDBCardText>
            </MDBCardBody>
            <MDBBtn
              color='black'
              social='g'
              style={{ textTransform: 'capitalize' }}
              onClick={() =>
                (window.location.href = 'https://github.com/dislersd')
              }
            >
              <MDBIcon fab icon='github' className='pr-1' /> GitHub
            </MDBBtn>
          </MDBCard>
        </CardContainer>
      </div>
    </div>
  );
};

export default AboutUs;
