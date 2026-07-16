import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgInfoCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 20C16.4 20 20 16.4 20 12C20 7.6 16.4 4 12 4C7.6 4 4 7.6 4 12C4 16.4 7.6 20 12 20Z"
    />
    <Path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M12 8.8V12.8" />
    <Path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" d="M11.9957 15.2H12.0029" />
  </Svg>
);
export default SvgInfoCircle;
