import * as React from 'react';
const SvgClock = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14.333 14.333" {...props}>
    <g stroke="#A3A3A3">
      <circle cx={7.167} cy={7.167} r={6.667} />
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.167 4.5v2.667L8.5 8.5" />
    </g>
  </svg>
);
export default SvgClock;
