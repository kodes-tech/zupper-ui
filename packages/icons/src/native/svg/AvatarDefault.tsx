import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAvatarDefault = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <G stroke="#A3A3A3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
      <Path d="M20 20a6.667 6.667 0 1 0 0-13.333A6.667 6.667 0 0 0 20 20M31.453 33.333C31.453 28.173 26.32 24 20 24S8.547 28.173 8.547 33.333" />
    </G>
  </Svg>
);
export default SvgAvatarDefault;

