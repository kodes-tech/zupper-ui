import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgStar = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      d="M12 3.5l2.6 5.27 5.82.85-4.21 4.1.99 5.79L12 16.77l-5.2 2.74.99-5.79-4.21-4.1 5.82-.85z"
      fill="currentColor"
    />
  </Svg>
);
export default SvgStar;
