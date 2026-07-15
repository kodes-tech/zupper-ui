import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNavPedidos = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M18 2H9a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2" />
      <Path d="M7 6H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h9a2 2 0 0 0 2-2v-1" />
      <Path d="m16.5 13.996-2.974-2.486-3.026 2.486M14.5 16l-.974-.89L12.5 16M13.513 15.11 13.487 9M9.365 6.005h.01M12.115 6.005h.01M14.87 6.005h.01M17.625 6.005h.01" />
    </G>
  </Svg>
);
export default SvgNavPedidos;

