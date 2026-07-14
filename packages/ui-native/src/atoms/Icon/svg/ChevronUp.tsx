import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgChevronUp = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path stroke="#009DAF" strokeLinecap="round" d="m20.027 16.146-8-7.997-8 7.999" />
  </Svg>
);
export default SvgChevronUp;

