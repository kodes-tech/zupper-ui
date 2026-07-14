import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgNavConta = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G
      stroke="#2E2E2E"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <Path d="M5.93 20a8.7 8.7 0 0 1 12.14-.048M12 14.517a2.99 2.99 0 1 0 0-5.98 2.99 2.99 0 0 0 0 5.98" />
      <Path d="M4.001 17.035a8.97 8.97 0 0 1 8-13.035 8.97 8.97 0 0 1 7.998 13.035" />
    </G>
  </Svg>
);
export default SvgNavConta;
