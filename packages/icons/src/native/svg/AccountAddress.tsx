import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAccountAddress = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G stroke="#737373" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M15 10a3 3 0 1 0-6 0 3 3 0 0 0 6 0" />
      <Path d="M12 21s-7-5.75-7-11a7 7 0 0 1 14 0c0 5.25-7 11-7 11" />
    </G>
  </Svg>
);
export default SvgAccountAddress;
