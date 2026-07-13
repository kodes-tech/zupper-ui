import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgChevronRightDark = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 12 12"
    {...props}
  >
    <Path stroke="#404040" strokeLinecap="round" d="m4 2 4 4-4 4" />
  </Svg>
);
export default SvgChevronRightDark;

