import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHeart = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 16 16" {...props}>
    <G stroke="#171717" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M9.806 6.196a2.583 2.583 0 0 0-3.464.959c-1.31 2.187 1.165 6.094 1.227 6.135" />
      <Path d="M12.774 7.972a2.59 2.59 0 0 1 .786 3.508c-1.305 2.18-5.927 1.848-5.994 1.81M10.894 7.747a2.27 2.27 0 0 0-1.088-1.551M10.894 7.748a2.24 2.24 0 0 1 1.88.224" />
    </G>
    <Path
      stroke="#171717"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9.237 5.956a2.6 2.6 0 0 0 .13-1.518 2.29 2.29 0 0 0-2.675-1.724 2 2 0 0 0-1.323 1.023 1.99 1.99 0 0 0-1.649-.302 2.277 2.277 0 0 0-1.59 2.75c.39 1.62 2.663 2.55 3.854 2.924"
    />
  </Svg>
);
export default SvgHeart;
