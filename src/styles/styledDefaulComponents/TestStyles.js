import React from 'react';
import { styles } from './index';
import {
  DefaultButtonRed,
  DefaultButtonBlue,
  DefaultButtonRedBG,
} from './Button';

export const TestStyles = props => {
  return (
    <div>
      <p>don't close my div</p>
      <DefaultButtonRed>log in</DefaultButtonRed>
      <DefaultButtonBlue>log in</DefaultButtonBlue>
      <DefaultButtonRedBG>log in</DefaultButtonRedBG>
    </div>
  );
};
