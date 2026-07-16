import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOrderHotel = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.471 20.148V5.038a.889.889 0 0 0-.888-.89H8.47a.889.889 0 0 0-.888.89v15.11m0-10.666H4.027a.89.89 0 0 0-.889.888v9.778m17.778 0V10.37a.889.889 0 0 0-.889-.888h-3.556m-6.666 7.11h4.444m-.889 0v3.556m-2.666 0v-3.555m-.445-5.778h3.556m-3.556 2.667h3.556m-3.556-5.334h3.556m-8 5.334h1.778m-1.778 3.11h1.778m8.889-3.11h1.777m-1.777 3.11h1.777m3.556 3.556H2.249"
    />
  </Svg>
);
export default SvgOrderHotel;
