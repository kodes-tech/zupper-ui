import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTravelPinmap = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.027 10.148a3 3 0 1 0-6 0 3 3 0 0 0 6 0"
    />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.027 21.148s-7-5.75-7-11a7 7 0 0 1 14 0c0 5.25-7 11-7 11"
    />
  </Svg>
);
export default SvgTravelPinmap;

