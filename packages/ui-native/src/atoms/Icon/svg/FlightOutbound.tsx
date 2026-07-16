import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFlightOutbound = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="#008C99"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.01 18.32h11m-8.317-4.337-2.19-2.19 1.29-.645a.83.83 0 0 1 .743 0l1.291.645 2.653-1.643-3.484-3.324 2.493-.85 4.155 2.493 3.912-2.235a1.662 1.662 0 0 1 1.681 2.87l-6.984 4.19a1.7 1.7 0 0 1-.583.213l-4.253.709a.83.83 0 0 1-.724-.233"
    />
  </Svg>
);
export default SvgFlightOutbound;

