import * as React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFlightPath = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 129.139 6" {...props}>
    <Line x1={0.000488281} y1={2.5} x2={129.139} y2={2.5} stroke="#EFEFEF" />
    <Circle cx={3} cy={3} r={2.5} fill="#fff" stroke="#EFEFEF" />
    <Circle cx={126.139} cy={3} r={2.5} fill="#fff" stroke="#EFEFEF" />
  </Svg>
);
export default SvgFlightPath;
