import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgQuickVoos = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 48 48" {...props}>
    <G stroke="#008C99" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M7.966 36.344h22M13.332 27.67 8.95 23.29 11.532 22a1.66 1.66 0 0 1 1.486 0l2.582 1.29 5.306-3.286-6.968-6.648 4.986-1.7 8.31 4.985 7.824-4.47a3.325 3.325 0 0 1 3.362 5.739l-13.968 8.38c-.359.215-.754.36-1.166.428l-8.506 1.418a1.66 1.66 0 0 1-1.448-.466" />
    </G>
  </Svg>
);
export default SvgQuickVoos;
