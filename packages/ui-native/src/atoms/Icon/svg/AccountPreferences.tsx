import * as React from 'react';
import Svg, { G, Circle, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAccountPreferences = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 19 21"
    {...props}
  >
    <G stroke="#737373">
      <Circle cx={9.5} cy={11.5} r={9} strokeLinecap="round" />
      <Path strokeLinecap="round" strokeLinejoin="round" d="M9.5 2V.5M7.5.5h4" />
      <Path d="M12.273 8.757c.733.727-.44 6.636-1.644 6.74-1.01.088-1.325-1.904-1.538-2.536-.21-.623-.443-.847-1.061-1.052-1.57-.519-2.355-.779-2.51-1.19-.412-1.089 5.816-2.89 6.753-1.962Z" />
    </G>
  </Svg>
);
export default SvgAccountPreferences;

