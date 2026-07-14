import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgEmail = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.027 7.704v8.889a1.777 1.777 0 0 0 1.778 1.777h12.444a1.78 1.78 0 0 0 1.778-1.777v-8.89M4.544 17.85 10 12.392m4.054.006 5.449 5.449M4.027 7.51a1.59 1.59 0 0 0 .695 1.312l5.317 3.603a3.555 3.555 0 0 0 3.989 0l5.304-3.595a1.58 1.58 0 0 0 .695-1.311v-.01a1.583 1.583 0 0 0-1.584-1.583H5.61A1.584 1.584 0 0 0 4.027 7.51"
    />
  </Svg>
);
export default SvgEmail;

