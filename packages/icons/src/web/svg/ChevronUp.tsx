import * as React from 'react';
import type { SVGProps } from 'react';
const SvgChevronUp = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      stroke="#A3A3A3"
      strokeLinecap="round"
      strokeWidth={1.5}
      d="m20 15.998-8-7.997-8 7.998"
    />
  </svg>
);
export default SvgChevronUp;

