import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCommentSend = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 17.333 17.333" {...props}>
    <G stroke="#FFFFFF" strokeWidth={1.5}>
      <Path d="M16.206 1.21C14.391-.743.74 4.045.75 5.793c.013 1.983 5.332 2.593 6.806 3.006.887.25 1.124.504 1.328 1.434.926 4.21 1.391 6.304 2.45 6.351 1.69.075 6.644-13.465 4.872-15.372Z" />
      <Path strokeLinecap="round" strokeLinejoin="round" d="m8.25 9.083 2.917-2.916" />
    </G>
  </Svg>
);
export default SvgCommentSend;
