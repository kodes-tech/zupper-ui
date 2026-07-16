import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOrderFallbackImage = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 48 48" {...props}>
    <Path
      fill="#C8C8C8"
      d="M44 6H4a2 2 0 0 0-2 2v32a2 2 0 0 0 2 2h40a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2Zm-2 23.1-6.6-6.5a1.9 1.9 0 0 0-2.8 0L26 29.1 15.4 18.6a1.9 1.9 0 0 0-2.8 0L6 25.1V10h36Z"
    />
  </Svg>
);
export default SvgOrderFallbackImage;
