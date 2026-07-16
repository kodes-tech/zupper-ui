import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFlightReturn = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="#008C99"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M20.044 18.32h-11m8.317-4.337 2.19-2.19-1.29-.645a.83.83 0 0 0-.743 0l-1.291.645-2.653-1.643 3.484-3.324-2.493-.85L10.41 8.47 6.498 6.234a1.662 1.662 0 0 0-1.68 2.869l6.983 4.19c.179.107.377.18.583.214l4.253.709a.83.83 0 0 0 .724-.233"
    />
  </Svg>
);
export default SvgFlightReturn;

