import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgTicket = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 24 24" {...props}>
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M7.55539 14.6665H5.77764C4.79631 14.6665 3.99988 13.871 3.99988 12.8888V5.77776C3.99988 4.79644 4.79631 4 5.77764 4H12.8887C13.8709 4 14.6664 4.79644 14.6664 5.77776V7.55552M12.8887 18.2221H9.33315C8.35183 18.2221 7.55539 17.4265 7.55539 16.4443V9.33327C7.55539 8.35195 8.35183 7.55552 9.33315 7.55552H16.4442C17.4264 7.55552 18.2219 8.35195 18.2219 9.33327V12.8888M18.2224 16.4443V19.9998M16.4446 18.2221H20.0001"
    />
  </Svg>
);
export default SvgTicket;
