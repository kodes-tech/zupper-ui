import * as React from 'react';
import type { SVGProps } from 'react';
const SvgLock = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#737373"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 16.525v-2.303m0 0a.667.667 0 1 0 0-1.333.667.667 0 0 0 0 1.333M8.444 9.333V7.556a3.557 3.557 0 0 1 6.07-2.515 3.56 3.56 0 0 1 1.042 2.515v1.777m-8 0h8.889c.981 0 1.777.796 1.777 1.778v7.111c0 .982-.796 1.778-1.777 1.778h-8.89a1.78 1.78 0 0 1-1.777-1.778v-7.11c0-.983.796-1.779 1.778-1.779"
    />
  </svg>
);
export default SvgLock;

