import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTabFotosInactive = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 13.667 13.667" {...props}>
    <G stroke="#A3A3A3">
      <Circle cx={3.833} cy={3.833} r={1} strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M.5 6.833c0-2.985 0-4.478.928-5.405C2.355.5 3.848.5 6.833.5s4.479 0 5.406.928c.928.927.928 2.42.928 5.405s0 4.479-.928 5.406c-.927.928-2.42.928-5.406.928s-4.478 0-5.405-.928C.5 11.312.5 9.82.5 6.833Z" />
      <Path d="M2.167 12.833C5.082 9.35 8.349 4.756 13.165 7.862" />
    </G>
  </Svg>
);
export default SvgTabFotosInactive;
