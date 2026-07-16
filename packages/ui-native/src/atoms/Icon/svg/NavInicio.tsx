import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';
const SvgNavInicio = (props: SvgProps) => (
  <Svg
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="m9.616 4.669-4.312 3.36C4.584 8.589 4 9.781 4 10.685v5.928a3.38 3.38 0 0 0 3.368 3.376h9.264A3.38 3.38 0 0 0 20 16.621v-5.824c0-.968-.648-2.208-1.44-2.76l-4.944-3.464c-1.12-.784-2.92-.744-4 .096"
    />
  </Svg>
);
export default SvgNavInicio;

