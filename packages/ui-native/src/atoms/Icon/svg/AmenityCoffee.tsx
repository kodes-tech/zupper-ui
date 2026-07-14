import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAmenityCoffee = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16.471 12.593h1.778a1.78 1.78 0 0 0 1.778-1.778V9.037a.89.89 0 0 0-.889-.889h-2.667m0 4.445V7.259a1.78 1.78 0 0 0-1.777-1.777h-8.89a1.78 1.78 0 0 0-1.777 1.777v5.334a2.667 2.667 0 0 0 2.667 2.666h7.11a2.667 2.667 0 0 0 2.667-2.666M4.916 18.815h10.667"
    />
  </Svg>
);
export default SvgAmenityCoffee;

