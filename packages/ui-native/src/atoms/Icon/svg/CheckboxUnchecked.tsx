import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCheckboxUnchecked = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#D4D4D4"
      d="M8 4.5H16C17.933 4.5 19.5 6.067 19.5 8V16C19.5 17.933 17.933 19.5 16 19.5H8C6.067 19.5 4.5 17.933 4.5 16V8C4.5 6.067 6.067 4.5 8 4.5Z"
    />
  </Svg>
);
export default SvgCheckboxUnchecked;
