import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgQuickHospedagens = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 48 48" {...props}>
    <G stroke="#008C99" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M32.888 40V9.778A1.78 1.78 0 0 0 31.111 8H16.888a1.78 1.78 0 0 0-1.777 1.778V40M15.11 18.667H8a1.78 1.78 0 0 0-1.778 1.777V40M41.777 40V20.444A1.777 1.777 0 0 0 40 18.667h-7.11M19.555 32.889h8.889M26.666 32.889V40M21.333 40v-7.111M20.444 21.333h7.111M20.444 26.667h7.111M20.444 16h7.111M11.555 26.667h3.556M11.555 32.889h3.556M32.888 26.667h3.556M32.888 32.889h3.556M43.555 40H4.444" />
    </G>
  </Svg>
);
export default SvgQuickHospedagens;
