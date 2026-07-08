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
| **`@zupper/ui-native`** | componentes **React Native** (Atomic Design) | Zupper App (agora) + apps RN futuros |
| `@zupper/ui-web` *(futuro)* | componentes **React/Next** | painel admin, web |

**Regra de ouro:** tokens são compartilhados; **componentes são por framework**.
Não existe "um componente para RN + React + Angular". Ver
[ADR 0002](docs/decisions/0002-tokens-shared-components-per-framework.md).

## Stack

- **React Native** 0.83 + **React** 19 · **TypeScript** 5 (strict)
- **NativeWind 4** (`className` + preset Tailwind gerado dos tokens) — **única**
  abordagem de estilo, sem styled-components. Ver
  [ADR 0006](docs/decisions/0006-nativewind-styling.md) e
  [ADR 0007](docs/decisions/0007-drop-styled-components.md)
- **Storybook** (web via `react-native-web`) — preview sem simulador/backend
- **jest** + **@testing-library/react-native** (ui-native) · **ts-jest** (tokens)
- Build: **react-native-builder-bob** (ui-native) · **tsc** (tokens)
- Package manager: **npm** (workspaces)

## Estrutura

```
zupper-ui/
├── CLAUDE.md · README.md
├── docs/                     # este harness de documentação
├── tsconfig.base.json
└── packages/
    ├── tokens/     → @zupper/tokens
    └── ui-native/  → @zupper/ui-native  (src/atoms · molecules · organisms)
```

## Regras que a IA/dev DEVE seguir

1. **Componente é apresentacional** — só props (`onLike`, `author`…), **zero chamada
   de API**. Dados entram por props; a integração fica no app consumidor.
2. **Estilo com `className` (NativeWind) + tokens** — classes vindas do preset
   `@zupper/tokens/tailwind` (`bg-primary`, `p-md`, `rounded-pill`…); nunca hardcode
   de cor/spacing; sempre token. Ver `docs/conventions/tokens.md` e ADR 0006.
3. **Atomic Design** — `atoms/` (básicos) · `molecules/` (combinações) · `organisms/`
   (compostos). Ver `docs/conventions/components.md`.
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
npm install                              # raiz (conflitos de peer resolvidos via overrides)
npm run storybook -w @zupper/ui-native   # preview no navegador
npm test -w @zupper/ui-native            # testes RN
npm test -w @zupper/tokens               # testes dos tokens
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
