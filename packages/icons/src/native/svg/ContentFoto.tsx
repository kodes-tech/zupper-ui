import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgContentFoto = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 12.083 12.083" {...props}>
    <G stroke="#008C99">
      <Circle cx={3.417} cy={3.417} r={0.875} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M.5 6.042c0-2.613 0-3.919.812-4.73C2.123.5 3.429.5 6.042.5c2.612 0 3.918 0 4.73.812.811.811.811 2.117.811 4.73 0 2.612 0 3.918-.811 4.73-.812.811-2.118.811-4.73.811s-3.919 0-4.73-.811C.5 9.96.5 8.654.5 6.042Z" />
      <Path d="M1.958 11.292c2.55-3.048 5.41-7.068 9.624-4.35" />
    </G>
  </Svg>
);
export default SvgContentFoto;
