import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSuccessCheck = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 44 44" {...props}>
    <Path
      stroke="#44BA68"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22 36.667c8.067 0 14.667-6.6 14.667-14.667S30.067 7.333 22 7.333 7.333 13.933 7.333 22 13.933 36.667 22 36.667"
    />
    <Path
      stroke="#44BA68"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m15.767 22 4.15 4.15 8.316-8.3"
    />
  </Svg>
);
export default SvgSuccessCheck;

