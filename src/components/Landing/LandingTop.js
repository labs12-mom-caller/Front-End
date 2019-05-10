import React, { useState, useEffect } from 'react';
import { Link, navigate } from '@reach/router';
import { FaChevronRight, FaChevronDown } from 'react-icons/fa';

import { LandingTopPage, Header2, Ptag, Button } from '../../styles/Landing';

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
        <Header2>Stay Connected</Header2>
        <Ptag>Never forget to call your loved ones again.</Ptag>
        <Button type='button' onClick={() => navigate('/signup')}>
          Get Started <FaChevronRight />
        </Button>
        <Ptag className='learn-more'>
          Learn More <FaChevronDown />
        </Ptag>
      </main>
    </LandingTopPage>
  );
};

export default LandingTop;
