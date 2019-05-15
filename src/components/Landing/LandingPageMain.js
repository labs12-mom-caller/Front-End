import React, { useEffect, useRef } from 'react';
import { navigate } from '@reach/router';
import useAutoScroll from 'use-autoscroll';
import { LandingPageWrapper } from '../../styles/LandingPageMain';
import girlOnPhone from '../../assets/svg/undrawGirlOnPhone.svg';
import phoneRecording from '../../assets/svg/undrawRecording.svg';
import guyOnPhone from '../../assets/svg/undrawGuyCallingPhone.svg';

const LandingPageMain = () => {
  const rootNode = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        document.querySelector('h1').classList.add('headerReveal');
        document.querySelector('#header').classList.add('headerBgReveal');
      } else {
        document.querySelector('h1').classList.remove('headerReveal');
        document.querySelector('#header').classList.remove('headerBgReveal');
      }
    };
    document.addEventListener('scroll', scroll);
    return () => document.removeEventListener('scroll', scroll);
  }, []);

  const { scrollNext, scrollBack, position, length } = useAutoScroll(
    rootNode.current,
    '.style1',
  );

  console.log(position, length);

  return (
    <LandingPageWrapper ref={rootNode}>
      <div className='pageWrapper'>
        {/* Header */}
        <header id='header' className='header'>
          <h1>
            <div onClick={scrollBack} role='button'>
              {' '}
              ReCaller{' '}
            </div>
          </h1>
        </header>

        {/* Banner Section */}
        <section id='banner'>
          <div className='inner'>
            <div className='innerWords'>
              <h2>ReCaller</h2>
              <p>
                Stay Connected
                <br />
                To your loved ones
                <br />
              </p>
            </div>
            <button type='button' onClick={() => navigate(`/login`)}>
              Get Started
            </button>
          </div>
          <div className='spacer'>
            <div onClick={scrollNext} className='more' role='button'>
              Learn More
            </div>
          </div>
        </section>

        {/* One - What is the app section */}
        <section id='one' className='wrapper style1'>
          <div className='inner'>
            <header className='major'>
              <h2>
                An easier way for you
                <br />
                to stay connected
              </h2>
              <p>
                ReCaller allows you to schedule phone calls with the people you
                care about
              </p>
              <p>
                Call recordings and transcripts allow you to never forget
                important details
              </p>
              <p>
                Create an account, tell us who you want to call, let us know
                when, stay connected
              </p>
            </header>
            <div className='sectionImg'>
              <img src={girlOnPhone} alt='phonecall' />
            </div>
          </div>
        </section>

        {/* Two - App features section */}

        <section id='two' className='wrapper style2'>
          <div className='inner'>
            <header className='major'>
              <h2>App Features</h2>
              <p>create a personal account for secure login</p>
              <p>Unlimited contacts</p>
              <p>Transcripts of all your conversations</p>
              <p>Recordings of all phone calls</p>
            </header>
            <ul className='sectionImg'>
              <img src={phoneRecording} alt='phoneRecording' />
            </ul>
          </div>
        </section>

        {/* Three - Why you should use the app section */}
        <section id='three' className='wrapper style3'>
          <div className='inner'>
            <header className='major'>
              <h2>Stop Wasting Time</h2>
              <p>
                Spend less time worrying about making phone calls And more time
                connecting
              </p>
              <p>
                Start calling the people you care about Reconnect with the ones
                you love
              </p>
              <button
                type='button'
                onClick={() => navigate(`/signup`)}
                className='button primary'
              >
                Sign Up
              </button>
            </header>

            <ul className='sectionImg'>
              <img src={guyOnPhone} alt='' />
            </ul>
          </div>
        </section>

        <footer>
          <p> © 2019 ReCaller </p>
        </footer>
      </div>
    </LandingPageWrapper>
  );
};

export default LandingPageMain;
