import * as React from 'react';
import Svg, { G, Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgMediaGallery = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 34.833 34.833"
    {...props}
  >
    <G stroke="#008C99">
      <Path
        strokeWidth={1.5}
        d="M7.417 27.374c.214 2.18.699 3.649 1.795 4.744 1.965 1.965 5.127 1.965 11.453 1.965s9.488 0 11.453-1.965 1.965-5.128 1.965-11.453c0-6.326 0-9.488-1.965-11.453-1.095-1.096-2.563-1.58-4.744-1.795"
      />
      <Path
        strokeWidth={1.5}
        d="M.75 14.083c0-6.285 0-9.428 1.953-11.38C4.655.75 7.798.75 14.083.75s9.428 0 11.381 1.953c1.953 1.952 1.953 5.095 1.953 11.38s0 9.428-1.953 11.381-5.095 1.953-11.38 1.953-9.429 0-11.381-1.953C.75 23.511.75 20.369.75 14.084Z"
      />
      <Path
        strokeLinejoin="round"
        strokeWidth={1.5}
        d="M.75 15.948a24 24 0 0 1 3.12-.194c4.42-.082 8.731 1.123 12.165 3.4 3.185 2.112 5.423 5.018 6.382 8.263"
      />
      <Path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.083 9.083h.015" />
    </G>
  </Svg>
);
export default SvgMediaGallery;

