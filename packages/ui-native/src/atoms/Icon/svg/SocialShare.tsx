import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgSocialShare = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 21.5 20.5"
    {...props}
  >
    <G
      stroke="#2E2E2E"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
    >
      <Path d="m19.143 5.782-1.747-1.517c-1.259-1.093-1.752-1.681-2.434-1.474-.85.26-.57 1.895-.57 2.447-1.321 0-2.695-.101-3.998.11-4.3.7-5.644 3.759-5.644 7.055 1.217-.747 2.433-1.578 3.895-1.924 1.826-.432 3.865-.226 5.747-.226 0 .552-.28 2.188.57 2.447.772.236 1.175-.38 2.434-1.473l1.747-1.517c1.071-.93 1.607-1.396 1.607-1.964s-.536-1.034-1.607-1.964" />
      <Path d="M9.318.75c-3.86.007-5.882.102-7.174 1.39C.75 3.533.75 5.772.75 10.25s0 6.717 1.394 8.109c1.394 1.391 3.638 1.391 8.126 1.391s6.73 0 8.125-1.391c.97-.969 1.265-2.349 1.355-4.609" />
    </G>
  </Svg>
);
export default SvgSocialShare;
