import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCheckboxCheck = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      fill="#008C99"
      fillRule="evenodd"
      d="M4.027 8.388a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4h-8a4 4 0 0 1-4-4z"
      clipRule="evenodd"
    />
    <Path
      stroke="#FFF"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m15.139 10.25-4.278 4.277-1.945-1.944"
    />
  </Svg>
);
export default SvgCheckboxCheck;

