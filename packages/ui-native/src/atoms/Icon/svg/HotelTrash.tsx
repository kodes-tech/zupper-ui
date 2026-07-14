import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHotelTrash = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.129 7.337h13.796m-.985 0v10.84a1.97 1.97 0 0 1-1.971 1.971H8.085a1.97 1.97 0 0 1-1.97-1.97V7.336m8.868-3.189H9.071m4.798 11.437-3.683-3.683m0 3.683 3.683-3.683"
    />
  </Svg>
);
export default SvgHotelTrash;

