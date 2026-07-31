import * as React from 'react';
import type { SVGProps } from 'react';
const SvgRemoveCircle = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 18.167 18.167"
    {...props}
  >
    <g stroke="white" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12.417 9.083H5.75" />
      <path d="M17.417 9.083a8.333 8.333 0 1 0-16.667 0 8.333 8.333 0 0 0 16.667 0Z" />
    </g>
  </svg>
);
export default SvgRemoveCircle;

