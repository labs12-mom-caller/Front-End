import React, { useEffect, useRef } from 'react';
import { navigate } from '@reach/router';
import useAutoScroll from 'use-autoscroll';
import { LandingPageWrapper } from '../../styles/LandingPageMain';
import girlOnPhone from '../../assets/svg/undrawGirlOnPhone.svg';
import phoneRecording from '../../assets/svg/undrawRecording.svg';
import guyOnPhone from '../../assets/svg/undrawGuyCallingPhone.svg';
import wallet from '../../assets/svg/undrawWallet.svg';

const LandingPageMain = () => {
  const rootNode = useRef(null);
  const header = useRef(null);
  const headerButtons = useRef(null);
  const h1 = useRef(null);

  useEffect(() => {
    const scroll = () => {
      if (
        document.body.scrollTop > 300 ||
        document.documentElement.scrollTop > 300
      ) {
        h1.current.classList.add('headerReveal');
        header.current.classList.add('headerBgReveal');
        headerButtons.current.classList.add('headerReveal');
      } else {
        h1.current.classList.remove('headerReveal');
        headerButtons.current.classList.remove('headerReveal');
        header.current.classList.remove('headerBgReveal');
      }
    };
    document.addEventListener('scroll', scroll);
    return () => document.removeEventListener('scroll', scroll);
  }, []);

  const { scrollNext, scrollBack, position, length } = useAutoScroll(
    rootNode.current,
    '.style1',
  );

  return (
    <LandingPageWrapper ref={rootNode}>
      <div className='pageWrapper'>
        {/* Header */}
        <header ref={header} id='header' className='header'>
          <h1 ref={h1}>
            <div
              onClick={scrollBack}
              onKeyDown={scrollBack}
              role='button'
              tabIndex={0}
            >
              {' '}
              ReCaller{' '}
            </div>
          </h1>
          <div ref={headerButtons} className='headerButtons'>
            <button type='button' onClick={() => navigate(`/about-us`)}>
              About Us
            </button>
            <button type='button' onClick={() => navigate(`/login`)}>
              Login
            </button>
            <button
              type='button'
              className='headerSignup'
              onClick={() => navigate(`/signup`)}
            >
              Sign up
            </button>
          </div>
        </header>

        {/* Banner Section */}
        <section id='banner'>
          <div className='inner'>
            <div className='innerWords'>
              <h2>ReCaller</h2>
              <p>
                Connecting you
                <br />
                With the ones you love most
                <br />
              </p>
            </div>
            <button type='button' onClick={() => navigate(`/signup`)}>
              Sign up
            </button>
          </div>
          <div className='spacer'>
            <div
              onClick={scrollNext}
              onKeyDown={scrollNext}
              className='more'
              role='button'
              tabIndex={0}
            >
              Learn More
            </div>
          </div>
        </section>

        {/* One - What is the app section */}
        <div className='main-section-wrapper'>
          <section id='one' className='wrapper style1'>
            <div className='inner'>
              <header className='major'>
                <h2>
                  An Easier Way For You
                  <br />
                  to Stay Connected
                </h2>
                <p>
                  ReCaller allows you to schedule phone calls with the people
                  you care about.
                </p>
                <p>
                  Call recordings and transcripts enable you to always remember
                  important details.
                </p>
                <p>
                  Let us know who you want to call, tell us when, and stay
                  connected.
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
                <h2>ReCaller Features</h2>
                <p>Create a personal account for secure login</p>
                <p>Unlimited contacts</p>
                <p>Transcripts of all your conversations</p>
                <p>Recordings of all phone calls</p>
                <p>Recurring phone calls monthly/bi-weekly</p>
              </header>
              <ul className='sectionImg'>
                <img src={phoneRecording} alt='phone recording' />
              </ul>
            </div>
          </section>

          {/* Free vs Paid */}
          <section id='one' className='wrapper style1'>
            <div className='inner'>
              <header className='major paidInfo'>
                <div>
                  <h2>Free</h2>
                  <p>
                    Calls last up to 10 minutes and are scheduled randomly
                    within blocks of time that you choose.
                  </p>
                </div>
                <div>
                  <h2>$2.50/month</h2>
                  <p>
                    Calls last up to 30 minutes and you get to choose a specific
                    day and time for phone calls to occur.
                  </p>
                </div>
              </header>
              <div className='sectionImg'>
                <img src={wallet} alt='wallet' />
              </div>
            </div>
          </section>

          {/* Three - Why you should use the app section */}
          <section id='three' className='wrapper style3'>
            <div className='inner'>
              <header className='major'>
                <h2>Stop Wasting Time</h2>
                <p>
                  Spend less time worrying about making phone calls and more
                  time connecting.
                </p>
                <p>
                  Start calling the people you care about and reconnect with the
                  ones you love.
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
                <img src={guyOnPhone} alt='guy on phone' />
              </ul>
            </div>
          </section>
        </div>

        <footer>
          <p> © {new Date().getFullYear()} ReCaller </p>
        </footer>
      </div>
    </LandingPageWrapper>
  );
};

export default LandingPageMain;
