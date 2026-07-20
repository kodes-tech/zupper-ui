import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgClose = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 32 32" {...props}>
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m12.981 19.019 6.038-6.038m0 6.038L12.98 12.98M16 26.667c5.867 0 10.667-4.8 10.667-10.667S21.867 5.333 16 5.333 5.333 10.133 5.333 16 10.133 26.667 16 26.667"
    />
  </Svg>
);
export default SvgClose;

