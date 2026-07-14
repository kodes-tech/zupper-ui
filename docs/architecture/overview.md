# Arquitetura — Visão geral

## Monorepo de pacotes
`zupper-ui` é um monorepo (npm workspaces) que publica **pacotes npm privados**
independentes. Cada `packages/*` vira um pacote.

```
@zupper/tokens      → valores agnósticos      → todos os consumidores
@zupper/ui-native   → componentes React Native → Zupper App (agora), apps RN futuros
@zupper/ui-web      → componentes React/Next   → painel admin, web (FUTURO)
```

## Princípio: tokens compartilhados, componentes por framework
- **Tokens** são valores → viajam para qualquer stack (RN, React, Angular).
- **Componentes** são código de UI → presos ao framework. Um componente RN não roda em
  React web nem em Angular. Por isso os componentes são pacotes separados por plataforma,
  todos consumindo o **mesmo `@zupper/tokens`**. (ver ADR 0002.)

## Como os consumidores usam
- **Zupper App (RN)** → instala `@zupper/tokens` + `@zupper/ui-native`. Durante o dev,
  consome via **yalc** (sem publicar a cada mudança). A feature `libs/community` do app
  monta as telas usando esses componentes.
- **Admin (Next, futuro)** → `@zupper/tokens` + `@zupper/ui-web`.
- **WebViews Angular do app** → carregam páginas web remotas; **não** consomem este
  pacote (no máximo consumiriam os tokens como CSS vars).

## Fronteira com o design antigo
O app tem o `@zupper/app-ui` (design **antigo**, do Travel, styled-components). Este
repo é o design **novo**, isolado. **Não há import cruzado** entre os dois. Longo prazo,
o Travel pode migrar para cá tela a tela (strangler).

## Build & distribuição
- `ui-native` compila com **react-native-builder-bob** (CJS + ESM + types).
- `tokens` compila com **tsc**.
- Publica com `access: restricted` (privado). Ver ADR 0001 e ADR 0004 (blindagens).
