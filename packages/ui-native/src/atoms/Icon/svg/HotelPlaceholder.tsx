import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHotelPlaceholder = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M3 18.5v-11M3 13h18m0 5.5v-7a2 2 0 0 0-2-2H8.5v4M3 13h5.5M21 13V9"
    />
  </Svg>
);
export default SvgHotelPlaceholder;

