import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSupportWhatsapp = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.848 16.004c-1.481 1.474-3.969.221-5.935-1.744m.002.002C7.95 12.296 6.698 9.81 8.172 8.328l.36-.36a1.08 1.08 0 0 1 1.655.144c.243.351.506.728.8 1.144a1.09 1.09 0 0 1-.115 1.392l-.4.407m-.005-.002a8.7 8.7 0 0 0 1.19 1.463c.443.449.934.848 1.463 1.19m.002.003.406-.4a1.09 1.09 0 0 1 1.393-.116c.416.292.792.557 1.142.8a1.08 1.08 0 0 1 .144 1.656l-.359.36m2.38-10.098A8.72 8.72 0 0 0 4.505 16.427L3.27 20.942l4.62-1.212a8.7 8.7 0 0 0 4.168 1.063 8.719 8.719 0 0 0 6.166-14.88z"
    />
  </Svg>
);
export default SvgSupportWhatsapp;

