# 0005 — Theming sazonal por flag remota

- **Status:** Proposed
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda

> Arquitetura de theming consolidada (mecanismo + os dois cenários + precedência) em
> [ADR 0011](0011-theming-architecture.md). Este ADR trata só da **ativação sazonal por
> flag remota**.

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

## Status de implementação (2026-07-24)
- **Feito (valores):** `@kodes-tech/tokens` expõe `themes` (`default`, `dark`) +
  `getTheme(name)` + `themeVars`, e gera `@kodes-tech/tokens/theme.css` (CSS variables). O
  preset Tailwind resolve `rgb(var(--color-…) / <alpha-value>)`. O `dark` é **provisório**
  (`TODO(Figma)`).
- **Feito (mecanismo):** `@kodes-tech/ui-native` expõe `ThemeProvider`/`useTheme`. O provider
  aplica `vars(themeVars[theme])` (cross-platform web+native) e o `useTheme()` alimenta os
  consumidores JS (gradientes, `selectionColor`). Providers aninhados = "ilhas" (ex.:
  ConfirmDialog sempre claro). O Storybook tem **toggle de tema** para visualizar.
- **Pendente (ativação):** a leitura da **flag remota** e a montagem do `ThemeProvider` na
  raiz do app são do **app consumidor**. Também pendente: temas sazonais (ex.: Natal) e a
  paleta dark real do Figma.
