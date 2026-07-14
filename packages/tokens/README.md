# @kodes-tech/tokens

Design tokens do Zupper — **valores agnósticos de framework**. Podem ser consumidos por React Native, React web, Angular, etc.

```ts
import { colors, spacing, tokens } from '@kodes-tech/tokens';

colors.brand.strong;          // '#008C99'
spacing.md;                   // 8
tokens.typography.textVariant.heading; // { fontFamily, fontSize, fontWeight, lineHeight, letterSpacing }
```

Valores extraídos do Figma "Zupper 2.0" (Dev Mode) para o App 2.0 / Comunidade — próprios, não referenciam `@zupper/app-ui`.

Sem `dependencies` e sem `peerDependencies` — é só JS/TS puro.
