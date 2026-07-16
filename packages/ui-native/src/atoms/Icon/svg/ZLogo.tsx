import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgZLogo = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 57 62" {...props}>
    <Path
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M44.945 34.343 17.991 61.718h24.962c7.522 0 13.745-6.916 13.745-13.736 0-7.934-4.494-11.822-11.753-13.639ZM52.379 24.065c8.119-8.119 3.8-23.76-9.655-23.76h-.877L5.212 37.539a13.683 13.683 0 0 0 9.057 24.18h.694c27.48-27.893 32.659-32.817 37.416-37.653ZM11.25 28.033 38.8.28H14.226C6.63.29.46 6.42.401 14.016c0 6.596 4.46 12.36 10.847 14.016h.002Z"
    />
  </Svg>
);
export default SvgZLogo;
