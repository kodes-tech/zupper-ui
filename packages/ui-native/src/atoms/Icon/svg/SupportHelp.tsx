import * as React from 'react';
import Svg, { Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgSupportHelp = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 25 25" {...props}>
    <Circle cx={12.027} cy={15.786} r={0.5} stroke="currentColor" strokeWidth={0.622} />
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12.027 13.218v-.213a1.6 1.6 0 0 1 .866-1.37 1.57 1.57 0 0 0 .847-1.341 1.712 1.712 0 0 0-3.425 0m7.272 4.634 1.589.794A7.99 7.99 0 0 0 6.89 6.024m-.423 3.344L4.88 8.573a7.99 7.99 0 0 0 12.285 9.698"
    />
  </Svg>
);
export default SvgSupportHelp;

