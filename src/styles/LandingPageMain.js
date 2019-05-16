import styled from 'styled-components';
import bg from '../assets/images/womanOnPhone2.jpg';
import arrow from '../assets/svg/arrow.svg';

export const LandingPageWrapper = styled.div`

*:focus {
    outline: none;
}

button {
  background-color: #FF6F61;
  border: none;
  height: 43px;
  border-radius: 5px;
  color: #ffffff;
  font-size: 20px;
  transition: all 0.4s ease;
  cursor: pointer;
  padding: 1.5rem 4rem;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
font-family: Roboto, Arial, Helvetica;
  &:hover {
    background-color: #ffffff;
    color: #FF6F61;
    transition: all 0.4s ease;
  }
}

@keyframes opacityReveal {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes headerBgReveal {
  to {
    background-color: rgba(39, 31, 31, 0.685);
    opacity: 1;
  }
}

.button {
  padding: 1.5rem 4rem;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  background-color: #FF6F61;
  color: #fcfcfc;
  border-radius: 3px;
  text-decoration: none;
  font-family: Roboto, Arial, Helvetica;
}
.button:hover {
  animation-name: bgChangeLighter;
  animation-duration: 0.5s;
  animation-fill-mode: forwards;
  z-index: 2;
}

footer {
  font-size: 1.2rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  text-align: center;
  background-color: white;
  color: #636578
  margin-top: 4rem;
  padding: 1rem;
}

#header {
  width: 100%;
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  z-index: 10;

  @media (max-width: 465px) {
    justify-content: space-evenly;
  }
}

#header h1 {
  opacity: 0;
  margin: 2rem;
  align-self: flex-start;
  border: none;
}

#header h1 div {
  border: none;
  color: #ffffff;
  padding: 1.5rem 4rem;
  font-size: 1.4rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
  font-family: Roboto, Arial, Helvetica;
  font-size: 2rem;
  background: none;

  @media (max-width: 465px) {
    padding: 1.5rem 0;
  }

  &:hover {
    color: #FF6F61;
    transition: all 0.4s ease;
  }
}

#header .headerButtons {
  display: none;
  justify-content: space-around;
  opacity: 0;
  margin: 1rem;
  width: 25%;

  @media (max-width: 465px) {
    justify-content: space-evenly;
  }
  
  @media (max-width: 737px) {
    width: 46%;
  }



  button {
    background: none;
    border: none;
    padding: 1rem;

    ${'' /* @media (max-width: 465px) {
      padding: 5px;
    } */}
  }

  .headerSignup {
    background-color: #FF6F61;
    border: none;
    height: 43px;
    border-radius: 5px;
    color: #ffffff;
    font-size: 20px;
    transition: all 0.4s ease;
    cursor: pointer;
    padding: 1.5rem 2rem;
    font-size: 1.4rem;
    font-weight: 300;
    letter-spacing: 2px;
    text-transform: uppercase;
    font-family: Roboto, Arial, Helvetica;
  &:hover {
    background-color: #ffffff;
    color: #FF6F61;
    transition: all 0.4s ease;
  }

  @media (max-width: 670px) {
    padding: 0.3rem 1rem;
  }
  }
}

#header nav {
  margin: 1rem;
  z-index: 10;
  position: relative;
  animation-name: opacityReveal;
  animation-duration: 5s;
  animation-fill-mode: initial;
}

#header .headerReveal {
  animation-name: opacityReveal;
  animation-duration: 1s;
  animation-fill-mode: forwards;
  display: flex;
  cursor: pointer;
}

.headerBgReveal {
  animation-name: headerBgReveal;
  animation-duration: 2s;
  animation-fill-mode: forwards;
}

#banner {
  z-index: 2;
  width: 100%;
  height: 100vh;
  background: linear-gradient(rgba(99, 101, 120, 0.2), rgba(99, 101, 120, 0.2)),
    url(${bg});
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  animation-name: opacityReveal;
  animation-duration: 1s;
  animation-fill-mode: initial;
}
@media (max-width: 500px) {
  #banner {
    background-attachment: scroll;
  }
}

#banner .innerWords {
  margin-bottom: 10rem;
}

#banner .inner {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  margin-top: 4rem;
  z-index: 2;
}
#banner h2 {
  color: #fcfcfc;
  font-size: 6rem;
  font-family: Pacifico, Arial, "Helvetica Neue", Helvetica, sans-serif;
  letter-spacing: 3.6px;
  padding: 2rem 3rem;
  margin-top: 1rem;
  margin-bottom: 3rem;
  z-index: 2;
  animation-name: opacityReveal;
  animation-duration: 5s;
  animation-fill-mode: initial;
}
@media (min-width: 1400px) {
  #banner h2 {
    font-size: 5rem;
  }
}
#banner p {
  color: #fcfcfc;
  font-size: 1.8rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 400;
  letter-spacing: 3.6px;
  line-height: 1.3;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 5rem;
  z-index: 2;
  animation-name: opacityReveal;
  animation-duration: 5s;
  animation-fill-mode: initial;
}
#banner .spacer {
  width: 100%;
  margin-top: 4rem;
  margin-bottom: 5rem;
  padding-top: 3rem;
  padding-bottom: 7rem;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 0;
}
#banner .more {
  animation-name: opacityReveal;
  animation-duration: 5s;
  animation-fill-mode: initial;
  text-decoration: none;
  color: #000;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  text-transform: uppercase;
  border: none;
  bottom: 0;
  font-size: 1.6rem;
  letter-spacing: 0.225rem;
  opacity: 1;
  outline: 0;
  padding-left: 0.225em;
  padding-bottom: 1.2rem;
  text-align: center;
  width: 16em;
  z-index: 0;
  color: #fcfcfc;
  cursor: pointer;
}
#banner .more::after {
  background-image: url(${arrow});
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  bottom: 4em;
  content: '';
  display: block;
  height: 1.5em;
  margin: 0.5rem 0 0 -0.75em;
  position: relative;
  width: 1.5em;
  left: 50%;
  top: 1rem;
}
#banner .more:hover {
  text-decoration: underline;
}

#one .inner {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  flex-wrap: wrap;
}

.style1 {
  width: 100%;
  background-color: white;
  color: #083D77;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.style1 h2 {
  color: #083D77;
  font-size: 3rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 800;
  letter-spacing: 3.6px;
  text-transform: uppercase;
  padding: 2rem 3rem;
  margin-bottom: 3rem;
  font-size: 2.4rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #083D77;
  margin: 0 auto;
}
.style1 p {
  color: #627D89;
  font-size: 3rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 800;
  letter-spacing: 1.5px;
  ${'' /* text-transform: uppercase; */}
  padding: 2rem 3rem;
  font-size: 1.6rem;
  font-weight: normal;
  text-align: left;
  max-width: 60rem;
}
.style1 .sectionImg {
  width: 45%;
  margin: 0 auto;
}
.style1 img {
  width: 100%;
  text-align: center;
  margin: 0 auto;
}

#two .inner {
  display: flex;
  flex-direction: row-reverse;
  justify-content: space-around;
  flex-wrap: wrap;
}

.style2 {
  width: 100%;
  background-color: white;
  color: #083D77;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.style2 h2 {
  color: #083D77;
  font-size: 3rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 800;
  letter-spacing: 3.6px;
  text-transform: uppercase;
  padding: 2rem 3rem;
  margin-bottom: 3rem;
  font-size: 2.4rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #2e3842;
  margin: 0 auto;


}
.style2 p {
  color: #627D89;
  font-size: 3rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 800;
  letter-spacing: 1.5px;
  padding: 2rem 3rem;
  font-size: 1.6rem;
  font-weight: normal;
  text-align: left;
  max-width: 60rem;
}
.style2 .sectionImg {
  width: 45%;
  margin: 0 auto;
}
.style2 img {
  width: 100%;
  text-align: center;
  margin: 0 auto;
  border-radius: 10px;
}

#three .inner {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  flex-wrap: wrap;
  margin-bottom: 3rem;

  button {
    &:hover {
      border: 1px solid #FF6F61; 
    }
  }
}

.style3 {
  width: 100%;
  background-color: white;
  color: #627D89;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  margin-bottom: 10rem;
}
.style3 h2 {
  color: #FF6F61;
  font-size: 3rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 800;
  letter-spacing: 3.6px;
  text-transform: uppercase;
  padding: 2rem 3rem;
  margin-bottom: 3rem;
  font-size: 2.4rem;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #FDCEC6;
  margin: 0 auto;
  padding-bottom: 4rem;


}
.style3 p {
  color: #627D89;
  font-size: 3rem;
  font-family: Roboto, Arial, "Helvetica Neue", Helvetica, sans-serif;
  font-weight: 800;
  letter-spacing: 1.5px;
  padding: 2rem 3rem;
  margin-bottom: 3rem;
  font-size: 1.6rem;
  font-weight: normal;
  text-align: left;
  max-width: 60rem;
}
.style3 .button {
  margin-top: 2rem;
}
.style3 .sectionImg {
  width: 45%;
  margin: 0 auto;
}
.style3 img {
  width: 100%;
  text-align: center;
  margin: 4rem auto;
}

.wrapper {
  padding-top: 10rem;
  z-index: 0;
  text-align: flex-start;
  margin-bottom: 4rem;
}
.wrapper .major {
  display: flex;
  justify-content: center;
  flex-direction: column;

  button {
    align-self: center;
  }
}
.wrapper h2 {
  font-size: 3rem;
  padding-bottom: 5rem;
  width: 100%;
}
.wrapper p {
  line-height: 1.5;
}
`;
