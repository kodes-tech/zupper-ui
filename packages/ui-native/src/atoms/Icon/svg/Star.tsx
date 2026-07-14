import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgStar = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Path
      fill="#FFCE00"
      d="M12.028 4.483 14.5 9.53l5.527.813-3.999 3.926.944 5.545-4.945-2.62-4.945 2.62.944-5.545-3.999-3.926 5.527-.813z"
    />
  </Svg>
);
export default SvgStar;

