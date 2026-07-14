import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAccountPosts = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 18 21"
    {...props}
  >
    <G stroke="#737373" strokeLinejoin="round">
      <Path d="M.5 8.5c0-3.771 0-5.657 1.245-6.828S4.993.5 9 .5h.773c3.26 0 4.892 0 6.024.798.324.228.612.5.855.805.848 1.066.848 2.6.848 5.67v2.545c0 2.963 0 4.445-.469 5.628-.754 1.903-2.348 3.403-4.37 4.113-1.257.441-2.83.441-5.98.441-1.798 0-2.698 0-3.416-.252-1.155-.406-2.066-1.263-2.497-2.35C.5 17.222.5 16.375.5 14.682z" />
      <Path
        strokeLinecap="round"
        d="M17.5 10.5a3.333 3.333 0 0 1-3.333 3.333c-.666 0-1.451-.116-2.098.057a1.67 1.67 0 0 0-1.179 1.179c-.173.647-.057 1.432-.057 2.098A3.333 3.333 0 0 1 7.5 20.5M5 5.5h7M5 9.5h3"
      />
    </G>
  </Svg>
);
export default SvgAccountPosts;

