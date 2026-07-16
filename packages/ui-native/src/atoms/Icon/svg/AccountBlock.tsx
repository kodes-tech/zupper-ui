import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAccountBlock = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G stroke="#EF4444" strokeWidth={1.5}>
      <Path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M13 22H6.59c-1.545 0-2.774-.752-3.877-1.803-2.26-2.153 1.45-3.873 2.865-4.715a10.67 10.67 0 0 1 7.922-1.187"
      />
      <Path d="M16.5 6.5a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Z" />
      <Path
        strokeLinecap="round"
        d="m16.05 16.05 4.9 4.9M22 18.5a3.5 3.5 0 1 0-7 0 3.5 3.5 0 0 0 7 0Z"
      />
    </G>
  </Svg>
);
export default SvgAccountBlock;
