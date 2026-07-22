import * as React from 'react';
import type { SVGProps } from 'react';
const SvgWarningTriangle = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 44 44" {...props}>
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M22.001 35.794h-8.889c-5.09 0-7.217-3.638-4.753-8.082l4.577-8.244 4.313-7.745c2.61-4.709 6.894-4.709 9.505 0l4.313 7.76 4.576 8.244c2.465 4.444.323 8.082-4.753 8.082h-8.889zM22.001 17.59v7.335M21.994 29.326h.013"
    />
  </svg>
);
export default SvgWarningTriangle;

