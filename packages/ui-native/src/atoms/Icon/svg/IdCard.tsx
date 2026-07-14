import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgIdCard = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.027 5.148h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2h-12a2 2 0 0 1-2-2v-13a2 2 0 0 1 2-2h4m5.594 14a3.17 3.17 0 0 0-2.949-2h-1.29a3.17 3.17 0 0 0-2.95 2m5.844-6.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0m-3.25-10.25h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1"
    />
  </Svg>
);
export default SvgIdCard;

