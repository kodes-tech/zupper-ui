import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCheckboxChecked = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="#009DAF"
      d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V16C20 18.2091 18.2091 20 16 20H8C5.79086 20 4 18.2091 4 16V8Z"
    />
    <Path stroke="#fff" strokeLinecap="round" strokeLinejoin="round" d="M15.1114 9.86108L10.8335 14.1391L8.88892 12.1945" />
  </Svg>
);
export default SvgCheckboxChecked;
