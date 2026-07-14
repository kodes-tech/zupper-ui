import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgOfertaPacotes = (props: SvgProps) => (
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
      <Path d="M10.667 5.333H5.333c-.589 0-1.066.478-1.066 1.067v5.333c0 .59.477 1.067 1.066 1.067h5.334c.589 0 1.066-.478 1.066-1.067V6.4c0-.59-.477-1.067-1.066-1.067M6.933 6.933h2.134M5.867 12.8v.533M10.133 12.8v.533M10.133 5.333v-1.6a1.067 1.067 0 0 0-1.066-1.066H6.933a1.066 1.066 0 0 0-1.066 1.066v1.6M8 8.533V11.2M5.867 8.533V11.2M10.133 8.533V11.2" />
    </G>
  </Svg>
);
export default SvgOfertaPacotes;
