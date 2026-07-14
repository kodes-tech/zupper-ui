import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSearch = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 18.167 18.167"
    {...props}
  >
    <G stroke="white" strokeLinejoin="round" strokeWidth={1.5}>
      <Path strokeLinecap="round" d="m4.5 13.667-3.75 3.75" />
      <Path d="M2.417 8.25a7.5 7.5 0 1 1 15 0 7.5 7.5 0 0 1-15 0Z" />
    </G>
  </Svg>
);
export default SvgSearch;
