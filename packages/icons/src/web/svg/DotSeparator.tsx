import * as React from 'react';
const SvgDotSeparator = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 8" {...props}>
    <circle cx={4} cy={4} r={4} fill="#008C99" />
  </svg>
);
export default SvgDotSeparator;
