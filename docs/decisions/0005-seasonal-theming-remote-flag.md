# 0005 — Theming sazonal por flag remota

- **Status:** Proposed
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda

## Context
Objetivo do design system: numa data comemorativa (ex.: Natal), **ligar um tema
sazonal em todos os produtos internos de uma vez** — idealmente sem redeploy de cada
projeto, inclusive no mobile.

## Decision
Separar **valores** de **ativação**:
- **`@zupper/tokens` define múltiplos temas** (`themes = { default, christmas, … }` +
  `getTheme(name)`). Distribuídos por npm.
- **A ativação vem de uma flag remota** (endpoint de config / BFF), lida em runtime por
  cada projeto e aplicada no ThemeProvider. Virar a flag = todos trocam sem redeploy.

## Consequences
- **+** Ativação central e instantânea (web na hora; mobile na hora **se o tema estiver
  embarcado** no app).
- **−** Tema **novo não-embarcado** no mobile exige **OTA (EAS Update)** ou release de loja.
- **−** Cada projeto precisa implementar a leitura da flag + aplicação no ThemeProvider.
- **Regra:** npm compartilha os **valores**; a flag remota compartilha a **ativação**.
- **Ainda não implementado** — `@zupper/tokens` hoje exporta um objeto único.
