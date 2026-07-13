# 0002 — Tokens compartilhados; componentes por framework

- **Status:** Accepted
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda

## Context
Queremos "um design pra todos os produtos". Mas os consumidores usam stacks diferentes:
RN (app), React/Next (admin), e há WebViews Angular. Componente de UI é preso ao
framework — um componente RN não roda em React web nem em Angular.

## Decision
Separar em **um pacote de tokens agnóstico** (`@zupper/tokens`) + **pacotes de
componentes por framework** (`ui-native` RN, futuro `ui-web` React). Todos os `ui-*`
consomem os **mesmos tokens**.

## Consequences
- **+** Consistência visual entre plataformas via tokens, mesmo com componentes distintos.
- **+** Cada plataforma instala só o que roda nela (evita puxar módulo nativo no web).
- **−** Componentes são reescritos por framework (não há reuso de componente cross-stack).
- Angular (se algum sistema usar) só consome **tokens**, nunca componentes React/RN.
