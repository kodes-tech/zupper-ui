import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTravelViajantes = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M12.5 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8M19.372 20c0-3.096-3.08-5.6-6.872-5.6S5.628 16.904 5.628 20"
    />
  </Svg>
);
export default SvgTravelViajantes;

