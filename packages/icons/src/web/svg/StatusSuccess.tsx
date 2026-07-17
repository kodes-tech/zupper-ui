import * as React from 'react';
const SvgStatusSuccess = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 72 72" {...props}>
    <path fill="#D5EDDD" d="M36 72c19.8 0 36-16.2 36-36S55.8 0 36 0 0 16.2 0 36s16.2 36 36 36" />
    <path
      fill="#44BA68"
      d="M59 36c0-12.696-10.304-23-23-23S13 23.304 13 36s10.304 23 23 23 23-10.304 23-23m2 0c0 13.8-11.2 25-25 25S11 49.8 11 36s11.2-25 25-25 25 11.2 25 25"
    />
    <path
      stroke="#44BA68"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m27.2 36 5.86 5.86 11.742-11.72"
    />
  </svg>
);
export default SvgStatusSuccess;
