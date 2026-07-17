import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgCommunity = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <G stroke="#008C99" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M19.362 12.978a2.023 2.023 0 1 0 0-4.046 2.023 2.023 0 0 0 0 4.046M12 11.23A3.115 3.115 0 1 0 12 5a3.115 3.115 0 0 0 0 6.23M4.638 12.978a2.023 2.023 0 1 0 0-4.046 2.023 2.023 0 0 0 0 4.046M23 19v-1.1a2.5 2.5 0 0 0-2.5-2.5h-.8M1 19v-1.1a2.5 2.5 0 0 1 2.5-2.5h.8M17.339 19v-1.6a3.5 3.5 0 0 0-3.5-3.5H10.16a3.5 3.5 0 0 0-3.5 3.5V19" />
    </G>
  </Svg>
);
export default SvgCommunity;
