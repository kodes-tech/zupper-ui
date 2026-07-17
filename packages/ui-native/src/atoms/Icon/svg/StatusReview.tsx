import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgStatusReview = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 72 72" {...props}>
    <Path fill="#FEF9C3" d="M36 72c19.8 0 36-16.2 36-36S55.8 0 36 0 0 16.2 0 36s16.2 36 36 36" />
    <Path
      fill="#FFCE00"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M36 13c12.696 0 23 10.304 23 23S48.696 59 36 59 13 48.696 13 36s10.304-23 23-23m0 48c13.8 0 25-11.2 25-25S49.8 11 36 11 11 22.2 11 36s11.2 25 25 25m-1.642-32.117v7.61c0 .8.273 1.619.665 2.306.392.687.957 1.337 1.642 1.744v.001l5.753 3.432c.474.283 1.088.129 1.371-.345.283-.474.128-1.088-.398-1.371l-5.753-3.433-.003-.002a3.5 3.5 0 0 1-1.297-1.484 3.4 3.4 0 0 1-.365-1.317v-7.61c0-.552-.448-1-1-1-.552 0-1 .448-1 1"
    />
  </Svg>
);
export default SvgStatusReview;
