import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgEye = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m14.128 9.282-4.895 4.895a3.46 3.46 0 1 1 4.895-4.895"
    />
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.31 5.703c-1.692-1.277-3.627-1.973-5.63-1.973-3.414 0-6.597 2.012-8.812 5.494-.87 1.364-.87 3.657 0 5.021.764 1.2 1.654 2.235 2.622 3.066M8.217 19.014a8.9 8.9 0 0 0 3.463.716c3.415 0 6.598-2.012 8.813-5.494.87-1.365.87-3.657 0-5.021-.32-.503-.668-.977-1.026-1.422"
    />
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M15.076 12.407a3.45 3.45 0 0 1-2.728 2.728"
    />
  </Svg>
);
export default SvgEye;

