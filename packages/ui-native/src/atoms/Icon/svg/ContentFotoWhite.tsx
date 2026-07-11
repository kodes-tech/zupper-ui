import * as React from "react";
import Svg, { G, Circle, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgContentFotoWhite = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 17.333 17.333"
    {...props}
  >
    <G stroke="white" strokeWidth={1.5}>
      <Circle
        cx={4.917}
        cy={4.917}
        r={1.25}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path d="M.75 8.667c0-3.732 0-5.598 1.16-6.758C3.068.75 4.934.75 8.666.75s5.598 0 6.757 1.16c1.16 1.159 1.16 3.025 1.16 6.757s0 5.598-1.16 6.757c-1.16 1.16-3.025 1.16-6.757 1.16s-5.598 0-6.758-1.16C.75 14.264.75 12.399.75 8.667Z" />
      <Path d="M2.833 16.167c3.644-4.355 7.729-10.097 13.748-6.215" />
    </G>
  </Svg>
);
export default SvgContentFotoWhite;
