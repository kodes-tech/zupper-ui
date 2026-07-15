import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgUpload = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M17.5 16H19c.5304 0 1.0391-.2106 1.4142-.5857S21 14.5304 21 14V5c0-.26264-.0517-.52273-.1522-.76538a2 2 0 0 0-.4336-.65896 2 2 0 0 0-.6489-.4336A2 2 0 0 0 19 3H5c-.53043 0-1.03914.21086-1.41421.58594C3.21068 3.96101 3 4.46957 3 5v9c0 .5304.21068 1.0392.58579 1.4143C3.96086 15.7894 4.46957 16 5 16h1.5M12 15V7M10 9l2-2 2 2M15 12h1.5c.2652 0 .5196.1054.7071.293.1875.1875.2929.4318.2929.697v6c0 .5304-.2107 1.0392-.5858 1.4143C16.5391 20.7894 16.0304 21 15.5 21h-7c-.53043 0-1.03914-.2106-1.41421-.5857C6.71068 20.0392 6.5 19.5304 6.5 19v-6c0-.2652.10535-.5196.29289-.7071.18754-.1875.44189-.293.70711-.293H9"
    />
  </Svg>
);
export default SvgUpload;
