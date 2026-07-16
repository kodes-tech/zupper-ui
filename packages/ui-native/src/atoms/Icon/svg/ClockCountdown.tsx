import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgClockCountdown = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M11.774 8.58v4.134l3.25 1.981m-6.06-9.937a8 8 0 1 1 6.127 14.78 8 8 0 0 1-6.127-14.78"
    />
  </Svg>
);
export default SvgClockCountdown;

