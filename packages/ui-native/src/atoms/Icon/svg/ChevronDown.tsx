import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgChevronDown = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path stroke="currentColor" strokeLinecap="round" d="m4.027 8.15 8 7.998 8-8" />
  </Svg>
);
export default SvgChevronDown;

