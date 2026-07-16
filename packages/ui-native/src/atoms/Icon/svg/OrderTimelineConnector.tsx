import * as React from 'react';
import Svg, { Line } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOrderTimelineConnector = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 2 24" {...props}>
    <Line
      x1={1}
      y1={0}
      x2={1}
      y2={24}
      stroke="currentColor"
      strokeWidth={1}
      strokeDasharray="3 3"
    />
  </Svg>
);
export default SvgOrderTimelineConnector;
