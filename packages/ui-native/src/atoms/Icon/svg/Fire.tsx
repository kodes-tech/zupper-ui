import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgFire = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="#EA580C"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M8.8 10.222a.05.05 0 0 1-.03 0 .05.05 0 0 1-.026-.018 5.85 5.85 0 0 1-.817-2.781.14.14 0 0 0-.08-.116.145.145 0 0 0-.14.005 7.45 7.45 0 0 0 4.297 13.87A7.797 7.797 0 0 0 20 13.402c0-5.39-3.854-8.971-7.286-10.591a.123.123 0 0 0-.176.128c.444 2.905-.166 6.065-3.738 7.283"
    />
  </Svg>
);
export default SvgFire;
