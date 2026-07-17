import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgGlobe = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 21.5 21.5" {...props}>
    <G stroke="#008C99" strokeWidth={1.5}>
      <Path d="M20.75 10.75c0-5.523-4.477-10-10-10s-10 4.477-10 10 4.477 10 10 10 10-4.477 10-10Z" />
      <Path
        strokeLinejoin="round"
        d="M18.75 4.449c-.935.067-2.132.43-2.962 1.504-1.5 1.94-2.999 2.103-3.999 1.456-1.5-.97-.239-2.543-1.999-3.397C8.643 3.455 8.483 1.94 9.122.75M.75 9.75c.763.662 1.83 1.268 3.089 1.268 2.6 0 3.12.497 3.12 2.484s0 1.987.52 3.477c.338.97.456 1.938-.218 2.771M20.75 12.202c-.887-.51-2-.721-3.127.088-2.155 1.55-3.642.266-4.311 1.549-.985 1.888 2.534 2.482-.562 6.911"
      />
    </G>
  </Svg>
);
export default SvgGlobe;
