import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgTabDicasActive = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 14.333 13"
    {...props}
  >
    <G
      stroke="#008C99"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M11.167 8.5v-4c0-1.886 0-2.828-.586-3.414S9.052.5 7.167.5H4.5c-1.886 0-2.828 0-3.414.586S.5 2.614.5 4.5v4c0 1.886 0 2.828.586 3.414s1.528.586 3.414.586h8M3.167 3.833H8.5M3.167 6.5H8.5M3.167 9.167h2.666" />
      <Path d="M11.167 3.833h.666c.943 0 1.415 0 1.707.293s.293.765.293 1.707v5.334a1.333 1.333 0 0 1-2.666 0z" />
    </G>
  </Svg>
);
export default SvgTabDicasActive;
