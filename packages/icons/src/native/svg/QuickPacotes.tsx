import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgQuickPacotes = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 48 48" {...props}>
    <G stroke="#008C99" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}>
      <Path d="M32 16H16a3.2 3.2 0 0 0-3.2 3.2v16a3.2 3.2 0 0 0 3.2 3.2h16a3.2 3.2 0 0 0 3.2-3.2v-16A3.2 3.2 0 0 0 32 16M20.8 20.8h6.4M17.6 38.4V40M30.4 38.4V40M30.4 16v-4.8A3.2 3.2 0 0 0 27.2 8h-6.4a3.2 3.2 0 0 0-3.2 3.2V16M24 25.6v8M17.6 25.6v8M30.4 25.6v8" />
    </G>
  </Svg>
);
export default SvgQuickPacotes;
