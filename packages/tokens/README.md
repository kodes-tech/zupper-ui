# @kodes-tech/tokens

Design tokens do Zupper — **valores agnósticos de framework**. Podem ser consumidos por React Native, React web, Angular, etc.

```ts
import { colors, spacing, tokens } from '@kodes-tech/tokens';

colors.primary;      // '#009DAF'
spacing.md;          // 16
tokens.typography.size.title; // 18
```

> ⚠️ Os valores atuais são **PLACEHOLDER**. Substituir pelos do Figma do Community (Dev Mode) — ver os `TODO(Figma)` em cada arquivo de `src/`.

Sem `dependencies` e sem `peerDependencies` — é só JS/TS puro.
