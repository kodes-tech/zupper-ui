import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgContentDicaWhite = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 18.167 16.5" {...props}>
    <G stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M14.083 10.75v-5c0-2.357 0-3.536-.732-4.268S11.441.75 9.083.75H5.75c-2.357 0-3.536 0-4.268.732S.75 3.393.75 5.75v5c0 2.357 0 3.536.732 4.268s1.911.732 4.268.732h10M4.083 4.917h6.667M4.083 8.25h6.667M4.083 11.583h3.334" />
      <Path d="M14.083 4.917h.834c1.178 0 1.767 0 2.134.366.366.366.366.955.366 2.134v6.666a1.667 1.667 0 1 1-3.334 0z" />
    </G>
  </Svg>
);
export default SvgContentDicaWhite;
