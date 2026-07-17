import * as React from 'react';
const SvgTrash = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#EF4444"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M5.102 7.189h13.796M17.913 7.189v10.84c0 .523-.208 1.024-.578 1.394-.369.37-.87.577-1.393.577H8.058c-.523 0-1.024-.208-1.394-.577a1.97 1.97 0 0 1-.577-1.394V7.189M14.956 4H9.043M13.841 15.436 10.16 11.754M10.16 15.436l3.682-3.682"
    />
  </svg>
);
export default SvgTrash;
