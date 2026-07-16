import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgLock = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="#404040"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.027 16.674V14.37m0 0a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M8.472 9.482V7.704a3.557 3.557 0 0 1 6.07-2.515 3.56 3.56 0 0 1 1.04 2.515v1.778m-8 0h8.89c.981 0 1.777.796 1.777 1.777v7.111c0 .982-.796 1.778-1.777 1.778h-8.89a1.78 1.78 0 0 1-1.777-1.778v-7.11c0-.982.796-1.778 1.778-1.778Z"
    />
  </Svg>
);
export default SvgLock;

