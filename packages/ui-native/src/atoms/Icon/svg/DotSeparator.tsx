import * as React from "react";
import Svg, { Circle } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgDotSeparator = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 8 8"
    {...props}
  >
    <Circle cx={4} cy={4} r={4} fill="#008C99" />
  </Svg>
);
export default SvgDotSeparator;
