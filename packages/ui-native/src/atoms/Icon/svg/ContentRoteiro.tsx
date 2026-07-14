import * as React from "react";
import Svg, { G, Path } from "react-native-svg";
import type { SvgProps } from "react-native-svg";
const SvgContentRoteiro = (props: SvgProps) => (
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
      <Path d="m2.398 1.198-.716.415c-.577.334-.865.502-1.024.78C.5 2.67.5 3.01.5 3.687V8.45c0 .89 0 1.335.2 1.583a.87.87 0 0 0 .525.312c.309.055.688-.164 1.445-.604.514-.298 1.01-.608 1.625-.524.28.038.546.171 1.08.436L7.6 10.76c.481.239.486.24 1.02.24h1.213c1.1 0 1.65 0 1.992-.35.342-.348.342-.91.342-2.035V4.683c0-1.124 0-1.686-.342-2.035s-.892-.35-1.992-.35H8.621c-.535 0-.54 0-1.021-.24l-1.943-.966C4.845.688 4.439.487 4.007.5s-.824.241-1.61.697" />
      <Path strokeDasharray="1 3" d="M8.083 2.542v8.166M4 .792v8.166" />
    </G>
  </Svg>
);
export default SvgContentRoteiro;
