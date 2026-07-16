import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgClose = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.9813 19.0186L19.0186 12.9813M19.0186 19.0186L12.9813 12.9813M16 26.6667C21.8667 26.6667 26.6667 21.8667 26.6667 16C26.6667 10.1333 21.8667 5.33333 16 5.33333C10.1333 5.33333 5.33333 10.1333 5.33333 16C5.33333 21.8667 10.1333 26.6667 16 26.6667Z"
    />
  </Svg>
);
export default SvgClose;
