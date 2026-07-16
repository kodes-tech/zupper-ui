import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTravelSwap = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 16 15" {...props}>
    <Path
      fill="currentColor"
      d="M15.35 3.262a.38.38 0 1 0 .538-.539L13.481.315l-.005-.004a.38.38 0 0 0-.534.004l-2.408 2.408a.381.381 0 0 0 .54.539l1.757-1.758v9.626c0 1.054-.85 1.904-1.905 1.904h-2.53a.38.38 0 1 0 0 .762h2.53a2.664 2.664 0 0 0 2.666-2.666V1.505zM7.985.585c0 .21-.17.38-.381.38h-2.53A1.9 1.9 0 0 0 3.17 2.871v9.625l1.757-1.758a.381.381 0 0 1 .539.539L3.062 13.68a.38.38 0 0 1-.547 0L.112 11.277a.381.381 0 0 1 .538-.539l1.758 1.758V2.87A2.664 2.664 0 0 1 5.074.204h2.53c.21 0 .38.17.38.38Z"
    />
  </Svg>
);
export default SvgTravelSwap;

