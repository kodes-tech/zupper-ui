import * as React from 'react';
import Svg, { Defs, G, LinearGradient, Path, Stop } from 'react-native-svg';
import type { SvgProps } from 'react-native-svg';

/**
 * Ilustração do estado vazio de Pedidos (recibo com selo "+"). Cores próprias
 * da arte (não tintável) — portada de `OrderEmpty` do zupper-app.
 */
const SvgOrderEmpty = (props: SvgProps) => (
  <Svg fill="none" viewBox="0 0 128 219" {...props}>
    <G opacity={0.9}>
      <Path
        fill="#E5E7EB"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M105.896 54.62a1.378 1.378 0 1 1 2.756 0v19.974a1.378 1.378 0 1 1-2.756 0V54.619ZM14.244 36.209a.774.774 0 0 1 1.548 0v5.934a.774.774 0 1 1-1.548 0V36.21ZM14.187 50.007a.873.873 0 1 1 1.746 0v11.278a.873.873 0 0 1-1.746 0V50.007ZM14.215 67.546a.83.83 0 1 1 1.661 0v11.476a.83.83 0 0 1-1.66 0V67.546Z"
      />
      <Path
        fill="#fff"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M15.119 22.705c0-6.627 5.372-12 12-12h68.264c6.628 0 12 5.373 12 12V186.22c0 6.628-5.372 12-12 12H27.12c-6.628 0-12-5.372-12-12V22.705Z"
      />
      <Path
        fill="#E5E7EB"
        fillRule="evenodd"
        clipRule="evenodd"
        d="M52.352 17.612c0-.722.586-1.307 1.308-1.307h10.27a1.308 1.308 0 0 1 0 2.615H53.66a1.308 1.308 0 0 1-1.307-1.308ZM68.667 19.097a1.484 1.484 0 1 0 0-2.97 1.484 1.484 0 0 0 0 2.97Z"
      />
    </G>
    <Path
      fill="#fff"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M94.358 15.59H83.796v1.28a6.034 6.034 0 0 1-6.034 6.032H44.088a6.035 6.035 0 0 1-6.035-6.032v-1.28h-9.909a7.327 7.327 0 0 0-7.327 7.328V186.01a7.327 7.327 0 0 0 7.327 7.327h66.214a7.326 7.326 0 0 0 7.327-7.327V22.918a7.327 7.327 0 0 0-7.327-7.327Z"
    />
    <Path
      fill="#D6D8E0"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M49.744 38.782H94.88v2.49H49.744v-2.49ZM49.845 54.035H77.24v2.49H49.845v-2.49ZM49.845 58.394h45.137v2.49H49.845v-2.49Z"
    />
    <G fill="#D4D4D4" fillRule="evenodd" clipRule="evenodd">
      <Path d="M49.743 30.065h27.394v2.49H49.743v-2.49ZM49.743 34.424H94.88v2.49H49.743v-2.49ZM49.845 62.749H94.98v2.49H49.845v-2.49ZM49.946 78.002H77.34v2.49H49.946v-2.49ZM49.946 82.36h45.137v2.49H49.946v-2.49ZM49.946 86.719h45.137v2.49H49.946v-2.49ZM50.046 101.972H77.44v2.49H50.046v-2.49ZM50.046 106.33h45.137v2.49H50.046v-2.49ZM50.046 110.688h45.137v2.49H50.046v-2.49ZM50.145 125.94H77.54v2.491H50.145v-2.491ZM50.145 130.299h45.137v2.49H50.146v-2.49ZM50.145 134.657h45.137v2.49H50.146v-2.49ZM50.245 149.91H77.64v2.49H50.245v-2.49ZM50.245 154.269h45.137v2.49H50.245v-2.49ZM50.245 158.627h45.137v2.49H50.245v-2.49ZM50.345 173.88h27.393v2.49H50.345v-2.49ZM50.345 178.238H95.48v2.49H50.345v-2.49ZM50.345 182.596H95.48v2.49H50.345v-2.49Z" />
    </G>
    <Path
      fill="#D4D4D4"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M33.857 138.082a6.538 6.538 0 1 0 0-13.075 6.538 6.538 0 0 0 0 13.075ZM33.857 89.471a6.537 6.537 0 1 0 0-13.075 6.537 6.537 0 0 0 0 13.075ZM33.857 162.052a6.538 6.538 0 1 0 0-13.075 6.538 6.538 0 0 0 0 13.075ZM33.857 186.02a6.537 6.537 0 1 0 0-13.075 6.537 6.537 0 0 0 0 13.075ZM33.857 114.236a6.537 6.537 0 1 0 0-13.075 6.537 6.537 0 0 0 0 13.075ZM33.857 66.175a6.537 6.537 0 1 0 0-13.074 6.537 6.537 0 0 0 0 13.075ZM33.857 42.207a6.538 6.538 0 1 0 0-13.075 6.538 6.538 0 0 0 0 13.075Z"
    />
    <G fill="#D4D4D4" fillRule="evenodd" clipRule="evenodd">
      <Path d="M34.663 44.807h27.394v2.49H34.663v-2.49ZM34.663 49.165H79.8v2.49H34.663v-2.49ZM34.663 53.523H79.8v2.49H34.663v-2.49Z" />
    </G>
    <Path
      fill="#009DAF"
      fillOpacity={0.102}
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.886 50.24a8.5 8.5 0 1 1 17 0 8.5 8.5 0 0 1-17 0Z"
    />
    <Path
      fill="#4CBAC7"
      fillRule="evenodd"
      clipRule="evenodd"
      d="m24.549 50.501-.908-.445a2.398 2.398 0 0 0-1.067-.244l-1.74.008-5.446-3.772-.759.057 2.94 3.672-2.191-.14-1.258-1.202-.228-.045a.151.151 0 0 0-.174.191l.322 1.097a2.148 2.148 0 0 0 1.911 1.536l2.867.2 2.547 3.1.45.015-.14-3.106 2.09-.063c.32-.01.617-.169.803-.43l.066-.092a.228.228 0 0 0-.085-.337Z"
    />
    <Path
      fill="url(#orderEmptyGradient)"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M107.917 143.866c11.007 0 19.929 8.923 19.929 19.929 0 11.007-8.922 19.929-19.929 19.929-11.006 0-19.929-8.922-19.929-19.929 0-11.006 8.923-19.929 19.929-19.929Z"
    />
    <Path
      fill="#fff"
      d="M102.165 162.942h4.577v-4.577h2.346v4.577h4.577v2.346h-4.577v4.6h-2.346v-4.6h-4.577v-2.346Z"
    />
    <Defs>
      <LinearGradient
        id="orderEmptyGradient"
        x1={87.988}
        x2={127.846}
        y1={163.795}
        y2={163.795}
        gradientUnits="userSpaceOnUse"
      >
        <Stop stopColor="#009DAF" />
        <Stop offset={1} stopColor="#4CBAC7" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default SvgOrderEmpty;
