import React from 'react';
import LandingPage from './LandingPage';

import CSSReset from './styles/CSSReset';
import Global from './styles/Global';

const App = () => (
  <>
    <CSSReset />
    <Global />
    <LandingPage />
    <p> Test</p>
  </>
);

export default App;
