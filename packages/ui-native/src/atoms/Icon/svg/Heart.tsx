import * as React from "react";
import Svg, { Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgHeart = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Svg
      x={5.46}
      y={5.38}
      viewBox="0 0 8.977 8.45"
      {...props}
    >
      <Path
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.346.816a2.583 2.583 0 0 0-3.464.959C-.428 3.962 2.047 7.869 2.109 7.91"
      />
      <Path
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.314 2.592A2.59 2.59 0 0 1 8.1 6.1C6.795 8.28 2.173 7.948 2.106 7.91M5.434 2.367A2.27 2.27 0 0 0 4.346.816M5.434 2.368a2.24 2.24 0 0 1 1.88.224"
      />
    </Svg>
    <Svg
      x={1.56}
      y={2.17}
      viewBox="0 0 8.364 7.439"
      {...props}
    >
      <Path
        stroke="#171717"
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M7.677 3.786a2.6 2.6 0 0 0 .13-1.518A2.29 2.29 0 0 0 5.132.544a2 2 0 0 0-1.323 1.023 1.99 1.99 0 0 0-1.649-.302 2.277 2.277 0 0 0-1.59 2.75c.39 1.62 2.663 2.55 3.854 2.924"
      />
    </Svg>
  </Svg>
);
export default SvgHeart;
