import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAddDay = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 18.167 18.167" {...props}>
    <G stroke="#008C99" strokeWidth={1.5}>
      <Path strokeLinecap="round" strokeLinejoin="round" d="M9.083 5.75v6.667m3.334-3.334H5.75" />
      <Path d="M17.417 9.083a8.333 8.333 0 1 0-16.667 0 8.333 8.333 0 0 0 16.667 0Z" />
    </G>
  </Svg>
);
export default SvgAddDay;
