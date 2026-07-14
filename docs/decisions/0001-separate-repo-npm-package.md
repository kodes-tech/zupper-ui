# 0001 — Design system em repo separado, publicado como npm privado

- **Status:** Accepted
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda

## Context
O design system (Community, hoje) será reusado por múltiplos produtos da empresa:
o **Zupper App (RN)** agora, um **painel admin (Next)** no futuro, e outros sistemas.
Uma lib interna no monorepo `zupper-app` só serviria o próprio app.

## Decision
Criar um **repo separado** (`kodes-tech/zupper-ui`) e publicar **pacotes npm privados**
(`@zupper/tokens`, `@zupper/ui-native`, futuro `@zupper/ui-web`), consumidos por qualquer
projeto via `npm install`.

## Consequences
- **+** Reuso entre repos diferentes; boundary claro; versionamento independente.
- **+** Registry privado já existe no ecossistema (Verdaccio) como opção.
- **−** Reintroduz atrito de publish/versionamento vs. monorepo. Mitigação: **yalc** no
  dev (consumir local sem publicar) e publicar só versões estáveis.
- **−** Gestão de peerDependencies/módulos nativos por conta do consumidor (ver ADR 0004).
- A `libs/community/ui` criada dentro do `zupper-app` fica redundante — os componentes
  vivem aqui; o app mantém só a feature `libs/community` consumindo via npm.
