import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgFacebookLogo = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      fill="#0866FF"
      d="M20 12.03a8 8 0 1 0-9.932 7.764v-5.32h-1.65V12.03h1.65v-1.053c0-2.723 1.232-3.985 3.904-3.985.506 0 1.381.1 1.739.199v2.215c-.19-.02-.517-.03-.924-.03-1.312 0-1.819.498-1.819 1.79v.863h2.616l-.448 2.445h-2.167v5.498A8 8 0 0 0 20 12.029"
    />
  </Svg>
);
export default SvgFacebookLogo;

