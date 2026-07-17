import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgDropdownArrow = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path stroke="#A3A3A3" strokeLinecap="round" strokeWidth={1.5} d="m4 8.002 8 7.997 8-7.998" />
  </Svg>
);
export default SvgDropdownArrow;
