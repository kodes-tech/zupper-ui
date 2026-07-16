import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTravelCalendar = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.583 3.704v3.555M8.472 3.704v3.555M4.027 9.926h16M5.805 6.37h12.444c.982 0 1.778.796 1.778 1.778v10.667c0 .982-.796 1.778-1.778 1.778H5.805a1.78 1.78 0 0 1-1.778-1.778V8.148c0-.982.796-1.778 1.778-1.778"
    />
  </Svg>
);
export default SvgTravelCalendar;

