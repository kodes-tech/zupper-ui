import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgPhone = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m18.958 15.902-1.134-1.134a1.45 1.45 0 0 0-2.05 0l-.89.89a.68.68 0 0 1-.758.154 12.52 12.52 0 0 1-6.259-6.25.71.71 0 0 1 .157-.784l.798-.799a1.48 1.48 0 0 0 .082-2.132L7.77 4.714a1.93 1.93 0 0 0-2.733 0l-.63.63a3.09 3.09 0 0 0-.818 2.773 16.32 16.32 0 0 0 11.97 11.97 3.09 3.09 0 0 0 2.773-.819l.63-.629a1.934 1.934 0 0 0-.004-2.737"
    />
  </Svg>
);
export default SvgPhone;

