import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHotelCircleCheck = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 22 22" {...props}>
    <Circle cx={11} cy={11} r={10} stroke="currentColor" strokeWidth={1.5} />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="m7.333 10.999 2.442 2.443 4.892-4.884"
    />
  </Svg>
);
export default SvgHotelCircleCheck;

