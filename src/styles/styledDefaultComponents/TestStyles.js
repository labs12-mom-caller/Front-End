import React from 'react';
import { styles } from './index';
import {
  DefaultButtonRed,
  DefaultButtonBlue,
  DefaultButtonRedBG,
  DefaultButtonBlueBG,
} from './Button';
import { Section, Title } from './index';

export const TestStyles = props => {
  return (
    <>
      <Section>
        <Title title='Recaller' message='welcome to' />
        <p>don't close my div</p>
        <DefaultButtonRed>log in</DefaultButtonRed>
        <DefaultButtonBlue>log in</DefaultButtonBlue>
        <DefaultButtonRedBG>log in</DefaultButtonRedBG>
        <DefaultButtonBlueBG>log in</DefaultButtonBlueBG>
      </Section>
      <Section>
        <Title title='loved ones' message='stay connected with your' />
      </Section>
    </>
  );
};
