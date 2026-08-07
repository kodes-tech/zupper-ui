import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMediaCameraSwitch = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 19 19"
    {...props}
  >
    <Path
      stroke="#404040"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M14.477 17A9 9 0 0 0 7.5.723M18 17h-3.523v-3.5M4.5 2.016a9 9 0 0 0 7 16.261M1 2.016h3.5V5.5"
    />
  </Svg>
);
export default SvgMediaCameraSwitch;

