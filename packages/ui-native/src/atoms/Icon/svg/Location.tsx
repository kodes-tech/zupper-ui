import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgLocation = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <G
      stroke="#008C99"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M10 6.667a2 2 0 1 0-4 0 2 2 0 0 0 4 0" />
      <Path d="M8 14s-4.667-3.833-4.667-7.333a4.667 4.667 0 0 1 9.334 0C12.667 10.167 8 14 8 14" />
    </G>
  </Svg>
);
export default SvgLocation;
