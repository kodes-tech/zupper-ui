import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPaymentCard = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M4.027 9.482h16M9.868 13.037H7.583m-.89-7.111H17.36a2.667 2.667 0 0 1 2.667 2.667v7.11a2.667 2.667 0 0 1-2.667 2.668H6.694a2.667 2.667 0 0 1-2.667-2.667V8.593a2.667 2.667 0 0 1 2.667-2.667Z"
    />
  </Svg>
);
export default SvgPaymentCard;

