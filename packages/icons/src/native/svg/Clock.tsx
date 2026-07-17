import * as React from 'react';
import Svg, { Circle, G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgClock = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 14.333 14.333" {...props}>
    <G stroke="#A3A3A3">
      <Circle cx={7.167} cy={7.167} r={6.667} />
      <Path strokeLinecap="round" strokeLinejoin="round" d="M7.167 4.5v2.667L8.5 8.5" />
    </G>
  </Svg>
);
export default SvgClock;
