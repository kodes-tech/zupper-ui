import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUser = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14 5h4a2 2 0 0 1 2 2v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4m5.594 14a3.171 3.171 0 0 0-2.949-2h-1.291a3.17 3.17 0 0 0-2.949 2m5.844-6.75a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0M10.999 2h2a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1"
    />
  </Svg>
);
export default SvgUser;

