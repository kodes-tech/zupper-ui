import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSuccessCheck = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 44 44" {...props}>
    <Path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22 36.6667C30.0667 36.6667 36.6667 30.0667 36.6667 22C36.6667 13.9333 30.0667 7.33333 22 7.33333C13.9333 7.33333 7.33333 13.9333 7.33333 22C7.33333 30.0667 13.9333 36.6667 22 36.6667Z"
    />
    <Path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.7667 21.9999L19.9173 26.1506L28.2333 17.8492"
    />
  </Svg>
);
export default SvgSuccessCheck;
