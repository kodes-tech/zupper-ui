import * as React from 'react';
import type { SVGProps } from 'react';
const SvgAvatarDefault = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 40 40"
    {...props}
  >
    <g stroke="#A3A3A3" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}>
      <path d="M20 20a6.667 6.667 0 1 0 0-13.333A6.667 6.667 0 0 0 20 20M31.453 33.333C31.453 28.173 26.32 24 20 24S8.547 28.173 8.547 33.333" />
    </g>
  </svg>
);
export default SvgAvatarDefault;

