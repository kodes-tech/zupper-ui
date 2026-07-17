import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgChevronRight = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 12 12" {...props}>
    <Path stroke="#0C4A6E" strokeLinecap="round" d="m4 2 4 4-4 4" />
  </Svg>
);
export default SvgChevronRight;
