import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTabRoteirosActive = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 14.333 13" {...props}>
    <G stroke="#008C99" strokeLinecap="round" strokeLinejoin="round">
      <Path d="m2.669 1.297-.819.475c-.658.382-.988.573-1.169.891S.5 3.368.5 4.143v5.443c0 1.017 0 1.525.228 1.809a1 1 0 0 0 .6.357c.354.063.786-.189 1.652-.69.588-.342 1.153-.696 1.857-.6.32.044.625.196 1.235.5l2.542 1.263c.55.274.555.275 1.167.275h1.386c1.257 0 1.885 0 2.276-.4.39-.398.39-1.04.39-2.326V5.281c0-1.285 0-1.927-.39-2.326-.39-.4-1.02-.4-2.276-.4H9.78c-.612 0-.617 0-1.167-.274l-2.22-1.105C5.465.716 5.001.485 4.507.501s-.942.276-1.839.796" />
      <Path strokeDasharray="1 3" d="M9.167 2.833v9.334M4.5.833v9.334" />
    </G>
  </Svg>
);
export default SvgTabRoteirosActive;
