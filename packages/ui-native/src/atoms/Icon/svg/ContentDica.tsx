import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgContentDica = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 12.667 11.5"
    {...props}
  >
    <G
      stroke="#008C99"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M9.833 7.5V4c0-1.65 0-2.475-.512-2.987C8.808.5 7.983.5 6.333.5H4c-1.65 0-2.475 0-2.987.513C.5 1.525.5 2.35.5 4v3.5c0 1.65 0 2.475.513 2.987C1.525 11 2.35 11 4 11h7M2.833 3.417H7.5M2.833 5.75H7.5M2.833 8.083h2.334" />
      <Path d="M9.833 3.417h.584c.825 0 1.237 0 1.493.256.257.256.257.669.257 1.494v4.666a1.167 1.167 0 0 1-2.334 0z" />
    </G>
  </Svg>
);
export default SvgContentDica;
