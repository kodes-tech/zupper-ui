import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgWarningTriangle = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 44 44" {...props}>
    <Path
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.0013 35.7943H13.112C8.02195 35.7943 5.89498 32.1564 8.35933 27.7118L12.936 19.468L17.2486 11.7229C19.8596 7.0142 24.1429 7.0142 26.7539 11.7229L31.0665 19.4826L35.6432 27.7265C38.1075 32.1711 35.9659 35.8089 30.8905 35.8089H22.0013V35.7943Z"
    />
    <Path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M22.0013 17.5908V24.9251" />
    <Path stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M21.9935 29.3257H22.0067" />
  </Svg>
);
export default SvgWarningTriangle;
