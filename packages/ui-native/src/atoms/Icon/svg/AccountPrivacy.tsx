import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgAccountPrivacy = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="9.5 9.5 24 24"
    {...props}
  >
    <Path
      fill="#737373"
      d="M22.303 12.83c.614 0 1.203.244 1.637.678l2.568 2.568c.434.434.678 1.023.678 1.636V21.5a.5.5 0 1 1-1 0v-3.788c0-.348-.14-.682-.386-.93l-2.567-2.566a1.32 1.32 0 0 0-.93-.386h-6.511c-.727 0-1.315.588-1.315 1.315v12.71c0 .726.588 1.315 1.315 1.316h4.54a.5.5 0 0 1 0 1h-4.54a2.316 2.316 0 0 1-2.315-2.317V15.145a2.315 2.315 0 0 1 2.315-2.315zm-3.787 10.893a.5.5 0 0 1 0 1H16.7a.5.5 0 0 1 0-1zm5.548-2.713a.501.501 0 0 1 0 .98l-.101.01H16.7a.5.5 0 0 1 0-1h7.263zm0-2.723a.501.501 0 0 1 0 .98l-.101.01H16.7a.5.5 0 0 1 0-1h7.263z"
    />
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M25.779 28.158a.908.908 0 1 0 0-1.816.908.908 0 0 0 0 1.816"
      clipRule="evenodd"
    />
    <Path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M22.082 27.444a.41.41 0 0 1 0-.389c.788-1.456 2.242-2.718 3.696-2.718s2.908 1.262 3.695 2.718a.41.41 0 0 1 0 .389c-.787 1.456-2.241 2.718-3.695 2.718s-2.908-1.262-3.696-2.718"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgAccountPrivacy;

