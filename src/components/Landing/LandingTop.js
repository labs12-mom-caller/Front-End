import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

import { LandingTopPage } from '../../styles/Landing';

const LandingTop = () => {
  const [height, setHeight] = useState(window.innerHeight);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setHeight(window.innerHeight);
    });
    return window.removeEventListener('resize', () => {});
  }, []);

  return (
    <LandingTopPage correctHeight={height}>
      <header>
        <h1>ReCaller</h1>
        <nav>
          <Link to='/login'>Login</Link>
          <span>|</span>
          <Link to='/signup'>Sign Up</Link>
        </nav>
      </header>
      <main>
        <h2>Stay Connected</h2>
        <p>Never forget to call your loved ones again.</p>
        <button type='button' onClick={() => navigate('/signup')}>
          Get Started <FaChevronRight />
        </button>
        <p className='learn-more'>
          Learn More <FaChevronDown />
        </p>
      </main>
    </LandingTopPage>
  );
};

export default LandingTop;
