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

  console.log(position, length);

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
                Stay Connected
                <br />
                With your loved ones
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
        <section id='one' className='wrapper style1'>
          <div className='inner'>
            <header className='major'>
              <h2>
                An Easier Way For You
                <br />
                to Stay Connected
              </h2>
              <p>
                ReCaller allows you to schedule phone calls with the people you
                care about.
              </p>
              <p>
                Call recordings and transcripts enable you to always remember
                important details.
              </p>
              <p>
                Create an account, tell us who you want to call, let us know
                when, stay connected.
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
              <p>Automatic recurring phone calls monthly/bi-weekly</p>
            </header>
            <ul className='sectionImg'>
              <img src={phoneRecording} alt='phone recording' />
            </ul>
          </div>
        </section>

        {/* Free vs Paid */}
        <section id='one' className='wrapper style1'>
          <div className='inner'>
            <header className='major'>
              <h2>Free or Paid</h2>
              <p>
                Use ReCaller for free and talk up to 10 minutes on randomly
                scheduled phone calls.
              </p>
              <p>
                For a $2.50/month talk up to 30 minutes on a date and time
                specified by you.
              </p>
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
                Spend less time worrying about making phone calls And more time
                connecting.
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

        <footer>
          <p> © {new Date().getFullYear()} ReCaller </p>
        </footer>
      </div>
    </LandingPageWrapper>
  );
};

export default LandingPageMain;
