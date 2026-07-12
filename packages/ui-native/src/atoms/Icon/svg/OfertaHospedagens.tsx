import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgOfertaHospedagens = (props: SvgProps) => (
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
      <Path d="M10.963 13.333V3.26a.593.593 0 0 0-.593-.592H5.63a.593.593 0 0 0-.593.592v10.074M5.037 6.222h-2.37a.593.593 0 0 0-.593.593v6.518M13.926 13.333V6.815a.593.593 0 0 0-.593-.593h-2.37M6.518 10.963h2.963M8.889 10.963v2.37M7.111 13.333v-2.37M6.815 7.111h2.37M6.815 8.889h2.37M6.815 5.333h2.37M3.852 8.889h1.185M3.852 10.963h1.185M10.963 8.889h1.185M10.963 10.963h1.185M14.519 13.333H1.48" />
    </G>
  </Svg>
);
export default SvgOfertaHospedagens;
