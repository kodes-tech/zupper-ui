# zupper-ui

Design system do Zupper, distribuído como **pacotes npm privados** e consumido por
todos os produtos da empresa. Monorepo (npm workspaces).

O objetivo é **uma fonte única de design**: tokens compartilhados por todos os
projetos e componentes reaproveitados entre apps da mesma stack.

> ⚠️ Antes de mexer aqui, leia `docs/conventions/` (as regras que a IA/dev **deve**
> seguir) e `docs/known-issues.md`.

## Pacotes

| Pacote | Papel | Consumidores |
|---|---|---|
| **`@zupper/tokens`** | valores agnósticos de framework (cores, spacing, tipografia, radius, elevação) | todos: RN, React web, Angular… |
| **`@zupper/icons`** | ícones — SVG cru (fonte) + **dois renderers gerados** (react-native-svg e `<svg>` DOM); o bundler escolhe via `exports` | RN (Metro) e React web; SVG cru p/ outras stacks |
| **`@zupper/ui-native`** | **primitivos** React Native (camada única `primitives/`) | Zupper App (agora) + apps RN futuros |
| `@zupper/ui-web` *(futuro)* | componentes **React/Next** | painel admin, web |

**Regra de ouro:** tokens são compartilhados; **componentes são por framework**.
Não existe "um componente para RN + React + Angular". Ver
[ADR 0002](docs/decisions/0002-tokens-shared-components-per-framework.md) e, para
ícones (desenho compartilhado, renderer por plataforma no mesmo pacote),
[ADR 0008](docs/decisions/0008-icons-package-dual-renderer.md).

**Fronteira global × produto:** o package publica só **primitivos agnósticos** (o
"MUI do Zupper"); **telas e componentes de produto ficam no app**, não aqui — DS não
tem `screens/`. Storybook é **ferramenta/vitrine**, não o entregável. Ver
[ADR 0009](docs/decisions/0009-design-system-boundary-and-storybook.md).

## Stack

- **React Native** 0.83 + **React** 19 · **TypeScript** 5 (strict)
- **NativeWind 4** (`className` + preset Tailwind gerado dos tokens) — **única**
  abordagem de estilo, sem styled-components. Ver
  [ADR 0006](docs/decisions/0006-nativewind-styling.md) e
  [ADR 0007](docs/decisions/0007-drop-styled-components.md)
- **Storybook** (web via `react-native-web`) — preview sem simulador/backend
- **jest** + **@testing-library/react-native** (ui-native, icons) · **ts-jest** (tokens)
- Build: **react-native-builder-bob** (ui-native, icons) · **tsc** (tokens)
- Package manager: **npm** (workspaces)

## Estrutura

```
zupper-ui/
├── CLAUDE.md · README.md
├── docs/                     # este harness de documentação
├── tsconfig.base.json
└── packages/
    ├── tokens/     → @zupper/tokens
    ├── icons/      → @zupper/icons      (assets/ SVG cru · src/native · src/web)
    └── ui-native/  → @zupper/ui-native  (src/primitives — camada única, sem Atomic)
```

## Regras que a IA/dev DEVE seguir

1. **Componente é apresentacional** — só props (`onLike`, `author`…), **zero chamada
   de API**. Dados entram por props; a integração fica no app consumidor.
2. **Estilo com `className` (NativeWind) + tokens** — classes vindas do preset
   `@zupper/tokens/tailwind` (`bg-primary`, `p-md`, `rounded-pill`…); nunca hardcode
   de cor/spacing; sempre token. Ver `docs/conventions/tokens.md` e ADR 0006.
3. **Camada única `primitives/`** — o pacote publica só primitivos genéricos
   (ADR 0009), então **não há mais Atomic Design** (atoms/molecules/organisms):
   todo componente mora em `src/primitives/<Nome>/`. Produto e telas ficam no app.
   Ver `docs/conventions/components.md`.
4. **Isolamento** — `ui-native` **não importa** do `@zupper/app-ui` (do app), e
   vice-versa. Compartilhar só o neutro.
5. **Cada componente = 4 arquivos**: `<Nome>.tsx`, `<Nome>.stories.tsx`,
   `<Nome>.spec.tsx`, `index.ts`.
6. **peerDependencies permissivas** — react/react-native/nativewind/tailwindcss como
   `peer` com faixa ampla. Nunca em `dependencies`. Ver
   [ADR 0004](docs/decisions/0004-distribution-safeguards.md).
7. **Nada de segredo no repo**; PT-BR nas strings de UI.

## Comandos

```bash
npm install --legacy-peer-deps           # raiz (react-native-web ainda pede React 18)
npm run storybook -w @zupper/ui-native   # preview no navegador (inclui stories do icons)
npm test -w @zupper/ui-native            # testes RN
npm test -w @zupper/icons                # testes dos ícones (native + web + paridade)
npm test -w @zupper/tokens               # testes dos tokens
npm run icons:audit -w @zupper/icons     # integridade 1:1 dos ícones (2 renderers)
npm run build                            # builda todos os pacotes
```

Ver `docs/local-development.md` (inclui **yalc** para consumir no Zupper App durante o dev).

## Publicação

Pacotes privados (scoped `access: restricted`). Registry **a definir** (npm privado
pago vs GitHub Packages vs Verdaccio). Ver `docs/decisions/0001-separate-repo-npm-package.md`.

## Theming sazonal (objetivo do design system)

`@zupper/tokens` deve evoluir para **múltiplos temas** (`themes` + `getTheme()`), e a
**ativação** (ex.: ligar o tema de Natal em todos os produtos numa data) vem de uma
**flag remota**, não hardcoded. Ver
[ADR 0005](docs/decisions/0005-seasonal-theming-remote-flag.md). *Ainda não implementado.*

## Avisos importantes

- **Repo ainda PÚBLICO** (troca pra privado depende de owner da org).
- **Tokens são placeholder** — preencher do Figma do Community (`TODO(Figma)` em `packages/tokens/src`).
- **NativeWind exige setup no app consumidor** — ver `docs/nativewind-zupper-app.md` (ainda não aplicado no zupper-app).
- Storybook/jest/build **validados** neste repo; gotchas em `docs/known-issues.md`.
- **Storybook do DS publicado com gate** (GCP Cloud Run + IAP direto; CD por tag via
  Workload Identity Federation) — runbook em `docs/storybook-deploy.md` (KSA-164).
