import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgOrderStepDone = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 22 22" {...props}>
    <Path
      fillRule="evenodd"
      clipRule="evenodd"
      fill="currentColor"
      d="M11 1.75C5.89421 1.75 1.75 5.89421 1.75 11C1.75 16.1058 5.89421 20.25 11 20.25C16.1058 20.25 20.25 16.1058 20.25 11C20.25 5.89421 16.1058 1.75 11 1.75ZM0.25 11C0.25 5.06579 5.06579 0.25 11 0.25C16.9342 0.25 21.75 5.06579 21.75 11C21.75 16.9342 16.9342 21.75 11 21.75C5.06579 21.75 0.25 16.9342 0.25 11Z"
    />
    <Path
      d="M7.33289 10.9995L9.77481 13.4415L14.6673 8.55762"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
export default SvgOrderStepDone;
