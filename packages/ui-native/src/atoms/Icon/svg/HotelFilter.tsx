import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHotelFilter = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M7.663 9.966v10.182m0-10.182a2.909 2.909 0 1 1 0-5.817 2.909 2.909 0 0 1 0 5.817m8.728 7.273a2.908 2.908 0 1 1-.001-5.817 2.908 2.908 0 0 1 0 5.817Zm0 0v2.91m0-16v7.272"
    />
  </Svg>
);
export default SvgHotelFilter;

