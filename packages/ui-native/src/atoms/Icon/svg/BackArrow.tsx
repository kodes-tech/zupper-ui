import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgBackArrow = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#404040"
      strokeLinecap="round"
      d="m15.998 4-7.997 8 7.998 8"
    />
  </Svg>
);
export default SvgBackArrow;
