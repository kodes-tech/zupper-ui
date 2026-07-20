import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCloseCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.736 14.264 4.528-4.528m0 4.528L9.736 9.736M12 20c4.4 0 8-3.6 8-8s-3.6-8-8-8-8 3.6-8 8 3.6 8 8 8"
    />
  </Svg>
);
export default SvgCloseCircle;

