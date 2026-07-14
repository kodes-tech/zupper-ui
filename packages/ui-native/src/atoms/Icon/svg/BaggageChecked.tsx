import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgBaggageChecked = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      d="M10.627 4.923A2.167 2.167 0 0 0 8.459 7.09v.811H6.163c-1.197 0-2.167.97-2.167 2.167v7.085c0 1.197.97 2.167 2.167 2.167h11.669c1.197 0 2.168-.97 2.168-2.167v-7.085c0-1.197-.97-2.167-2.168-2.167h-2.296v-.81a2.167 2.167 0 0 0-2.167-2.168zm5.622 13.397h1.583c.645 0 1.168-.522 1.168-1.167v-7.085c0-.644-.523-1.167-1.168-1.167H16.25v3.585H17a.5.5 0 0 1 .5.5v2.5a.5.5 0 0 1-.5.5h-.75v2.334Zm-.494-3.334h-2.423v-1.5h3.167v1.5zm-.506 1v2.334H8.747V8.901h6.502v3.585H12.83a.5.5 0 0 0-.5.5v2.5a.5.5 0 0 0 .5.5zM6.163 8.901h1.584v9.42H6.163a1.167 1.167 0 0 1-1.167-1.168v-7.085c0-.644.522-1.167 1.167-1.167m8.373-1v-.81a1.167 1.167 0 0 0-1.167-1.168h-2.742A1.167 1.167 0 0 0 9.459 7.09v.811z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgBaggageChecked;

