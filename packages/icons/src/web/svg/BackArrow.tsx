import * as React from 'react';
const SvgBackArrow = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path stroke="#404040" strokeLinecap="round" d="m15.998 4-7.997 8 7.998 8" />
  </svg>
);
export default SvgBackArrow;
