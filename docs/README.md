# Docs — zupper-ui

Harness de documentação que a IA/dev segue ao trabalhar neste repo.

## Índice

- **`conventions/`** — as regras (a IA deve seguir):
  - [`components.md`](conventions/components.md) — como criar um componente (Atomic Design, 4 arquivos, presentacional).
  - [`tokens.md`](conventions/tokens.md) — como funcionam os tokens (do Figma, agnósticos, theming).
  - [`testing.md`](conventions/testing.md) — jest, testing-library, Storybook.
- **`architecture/`**:
  - [`overview.md`](architecture/overview.md) — monorepo, pacotes, como os consumidores usam.
- **`decisions/`** — ADRs (decisões arquiteturais registradas). Use o [`_adr-template.md`](decisions/_adr-template.md) para novas.
- [`local-development.md`](local-development.md) — rodar, testar, consumir no app (yalc).
- [`known-issues.md`](known-issues.md) — pendências e armadilhas conhecidas.

## Como manter
- Mudou uma convenção? Atualize `conventions/`.
- Tomou uma decisão arquitetural? Crie um ADR novo em `decisions/` (não edite os antigos; crie um que supersede).
