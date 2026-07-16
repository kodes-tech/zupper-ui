import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOrderStepPending = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 22 22" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M11 1.95117C5.89421 1.95117 1.75 6.09539 1.75 11.2012C1.75 16.307 5.89421 20.4512 11 20.4512C16.1058 20.4512 20.25 16.307 20.25 11.2012C20.25 6.09539 16.1058 1.95117 11 1.95117ZM0.25 11.2012C0.25 5.26696 5.06579 0.451172 11 0.451172C16.9342 0.451172 21.75 5.26696 21.75 11.2012C21.75 17.1354 16.9342 21.9512 11 21.9512C5.06579 21.9512 0.25 17.1354 0.25 11.2012Z"
    />
    <Path
      d="M11 12.0198V6.83105"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <Circle cx="11" cy="14.8646" r="0.85" fill="currentColor" />
  </Svg>
);
export default SvgOrderStepPending;
