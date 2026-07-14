import * as React from 'react';
import Svg, { Path, Defs, LinearGradient, Stop } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgHotelStar = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      fill="url(#hotel-star_svg__a)"
      d="M12.028 4.483 14.5 9.53l5.527.813-3.999 3.926.944 5.545-4.945-2.62-4.945 2.62.944-5.545-3.999-3.926 5.527-.813z"
    />
    <Defs>
      <LinearGradient
        id="hotel-star_svg__a"
        x1={4.027}
        x2={20.027}
        y1={12.148}
        y2={12.148}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#FB923C" />
        <Stop offset={1} stopColor="#FFCE00" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgHotelStar;

