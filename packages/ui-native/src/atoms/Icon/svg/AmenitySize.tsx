import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAmenitySize = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M7.55579 19.9999H4V16.4442M20 16.4442V20H16.4442M19.6586 19.6576L4.34137 4.3403M19.6586 4.3403L4.34137 19.6576M16.4442 4H20V7.55579M4 7.55573V3.99994H7.55579"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgAmenitySize;
