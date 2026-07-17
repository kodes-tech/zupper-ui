import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCalendar = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 13.667 14.333" {...props}>
    <Path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M6.167 7.833H9.5m-5.333 0h.006M7.5 10.5H4.167m5.333 0h-.006M10.833.5v1.333M2.833.5v1.333M.5 7.329c0-2.905 0-4.357.835-5.26.834-.902 2.178-.902 4.865-.902h1.267c2.687 0 4.03 0 4.865.902.835.903.835 2.355.835 5.26v.342c0 2.905 0 4.357-.835 5.26s-2.178.902-4.865.902H6.2c-2.687 0-4.03 0-4.865-.902S.5 10.576.5 7.67zM.833 4.5h12"
    />
  </Svg>
);
export default SvgCalendar;
