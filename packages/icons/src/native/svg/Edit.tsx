import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgEdit = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G
      stroke="#008C99"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeMiterlimit={10}
      strokeWidth={1.6}
    >
      <Path d="M3.58 5.16h13.84c1.66 0 3 1.34 3 3v3.32" />
      <Path d="M6.74 2 3.58 5.16l3.16 3.16M20.42 18.84H6.58c-1.66 0-3-1.34-3-3v-3.32" />
      <Path d="m17.26 22 3.16-3.16-3.16-3.16" />
    </G>
  </Svg>
);
export default SvgEdit;
