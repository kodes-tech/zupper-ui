import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUserCircle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 32 32" {...props}>
    <Circle cx={16} cy={16} r={16} fill="#fff" />
    <Path
      fill="#404040"
      fillRule="evenodd"
      d="M16 10.204a2.093 2.093 0 1 1 0 4.186 2.093 2.093 0 0 1 0-4.186m0 5.185a3.093 3.093 0 1 0 0-6.186 3.093 3.093 0 0 0 0 6.186m3.836 3.168c1.022.596 1.59 1.384 1.59 2.258v.74a.24.24 0 0 1-.24.242h-10.37a.243.243 0 0 1-.242-.242v-.74c0-.875.568-1.663 1.59-2.258 1.018-.592 2.41-.94 3.836-.94s2.818.348 3.836.94m2.226 3.876c.233-.232.364-.549.364-.878v-.74c0-1.366-.896-2.428-2.087-3.122-1.196-.696-2.767-1.076-4.34-1.076-1.57 0-3.142.38-4.338 1.076-1.191.694-2.087 1.756-2.087 3.122v.74a1.24 1.24 0 0 0 1.241 1.242h10.37c.33 0 .645-.131.877-.364"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgUserCircle;

