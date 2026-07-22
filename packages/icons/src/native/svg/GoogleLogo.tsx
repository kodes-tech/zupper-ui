import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGoogleLogo = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#FFC107"
      d="M19.844 10.432H19.2V10.4H12v3.2h4.52a4.8 4.8 0 1 1-1.32-5.2l2.264-2.264A8 8 0 1 0 20 12a8 8 0 0 0-.156-1.568"
    />
    <Path
      fill="#FF3D00"
      d="m4.924 8.276 2.628 1.928A4.8 4.8 0 0 1 15.2 8.4l2.264-2.264a8 8 0 0 0-12.54 2.14"
    />
    <Path
      fill="#4CAF50"
      d="M12 20c1.984 0 3.897-.74 5.364-2.076l-2.476-2.096a4.8 4.8 0 0 1-7.4-2.208l-2.608 2A8 8 0 0 0 12 20"
    />
    <Path
      fill="#1976D2"
      d="M19.844 10.432H19.2V10.4H12v3.2h4.52a4.8 4.8 0 0 1-1.632 2.228l2.476 2.096A7.75 7.75 0 0 0 20 12a8 8 0 0 0-.156-1.568"
    />
  </Svg>
);
export default SvgGoogleLogo;

