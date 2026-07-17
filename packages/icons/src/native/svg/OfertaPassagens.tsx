import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOfertaPassagens = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 16 16" {...props}>
    <G stroke="#008C99" strokeLinecap="round" strokeLinejoin="round">
      <Path d="M2.655 12.115H9.99M4.444 9.223l-1.46-1.46.86-.43a.55.55 0 0 1 .495 0l.861.43 1.769-1.095-2.323-2.216 1.662-.567 2.77 1.662 2.608-1.49a1.108 1.108 0 0 1 1.12 1.913L8.152 8.763q-.182.108-.389.143l-2.835.473a.55.55 0 0 1-.483-.156" />
    </G>
  </Svg>
);
export default SvgOfertaPassagens;
