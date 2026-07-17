import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgStatusRemoved = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 72 72" {...props}>
    <Path fill="#FEE2E2" d="M36 72c19.8 0 36-16.2 36-36S55.8 0 36 0 0 16.2 0 36s16.2 36 36 36" />
    <Path
      fill="#EF4444"
      d="M59 36c0-12.696-10.304-23-23-23S13 23.304 13 36s10.304 23 23 23 23-10.304 23-23m2 0c0 13.8-11.2 25-25 25S11 49.8 11 36s11.2-25 25-25 25 11.2 25 25"
    />
    <Path
      fill="#EF4444"
      d="M41.768 29.172a.99.99 0 0 1 1.36 0 .96.96 0 0 1 0 1.06l-5.767 5.767 5.767 5.767a.96.96 0 0 1 0 1.06.97.97 0 0 1-1.06.05l-.058-.05L36 37.06l-5.768 5.768a.96.96 0 0 1-1.36 0 .96.96 0 0 1 0-1.06l5.767-5.768-5.767-5.767a.96.96 0 0 1 0-1.06.96.96 0 0 1 1.36 0L36 34.938z"
    />
  </Svg>
);
export default SvgStatusRemoved;
