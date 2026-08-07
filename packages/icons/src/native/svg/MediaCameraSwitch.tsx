import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMediaCameraSwitch = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#404040"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M16.977 19.5A9 9 0 0 0 10 3.223M20.5 19.5h-3.523V16M7 4.516a9 9 0 0 0 7 16.261M3.5 4.516H7V8"
    />
  </Svg>
);
export default SvgMediaCameraSwitch;

