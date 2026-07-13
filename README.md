# zupper-ui

Design system do Zupper, publicado via **GitHub Packages** (scope `@kodes-tech`, grátis). **Monorepo** (npm/yarn workspaces).

## Pacotes

| Pacote | Papel | Consumidores |
|---|---|---|
| **`@kodes-tech/tokens`** | valores agnósticos (cores, spacing, tipografia, radius, elevação) | todos (RN, React web, Angular…) |
| **`@kodes-tech/ui-native`** | componentes **React Native** | Zupper App (agora) + apps RN futuros |
| `@kodes-tech/ui-web` *(futuro)* | componentes **React/Next** | painel admin, web |

> Regra de ouro: **tokens são compartilhados; componentes são por framework.** Não existe "um componente para RN + React + Angular".

## Estrutura

```
zupper-ui/
├── package.json            (workspaces)
├── tsconfig.base.json
└── packages/
    ├── tokens/             → @kodes-tech/tokens
    └── ui-native/          → @kodes-tech/ui-native  (contém o Badge de exemplo)
```

## Desenvolvimento

```bash
npm install --legacy-peer-deps   # react-native-web@0.19 ainda pede React 18 (temos 19)
npm run build                    # builda todos os pacotes
npm run typecheck
npm test -w @zupper/ui-native
```

### Consumir no Zupper App durante o dev (sem publicar a cada mudança)
Use **yalc** para iterar rápido:
```bash
# no zupper-ui
npx yalc publish
# no zupper-app
npx yalc add @kodes-tech/ui-native && npm install
```
Assim o app usa a versão local; só publique no npm versões estáveis.

## Publicação

Registry: **GitHub Packages**, escopo `@kodes-tech` (grátis — vinculado à org dona deste repo).

1. Bump de `version` (mesmo semver) em `packages/tokens/package.json` e `packages/ui-native/package.json`.
2. Commit + `git tag vX.Y.Z` + `git push --tags`.
3. O workflow [`.github/workflows/publish.yml`](.github/workflows/publish.yml) builda e publica os dois pacotes automaticamente.

### Consumindo em outro projeto (fora deste monorepo)

```
# .npmrc do projeto consumidor
@kodes-tech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```
```bash
npm install @kodes-tech/ui-native
```

`GITHUB_PACKAGES_TOKEN` é um Personal Access Token (classic) com escopo `read:packages`, exportado como env var local ou secret de CI — o GitHub Packages exige autenticação para instalar mesmo em repositório público.

## Estilização — NativeWind

Os componentes do `ui-native` usam **NativeWind** (`className`), e os **tokens** são
expostos como **preset Tailwind** em `@zupper/tokens/tailwind` — fonte única da ponte
tokens → utilitários, compartilhada pela lib e pelo `tailwind.config.js` do app.

> A lib publica `className` como **string** (o bob não transforma). Quem resolve é o
> pipeline NativeWind do **app consumidor** (babel + metro + tailwind). Setup no zupper-app:
> [`docs/nativewind-zupper-app.md`](docs/nativewind-zupper-app.md).

## As 4 blindagens (por que o pacote instala em qualquer app compatível)
1. **peerDependencies permissivas** — react/react-native como peer (`>=0.72`); nativewind (`>=4.1`) e tailwindcss (`>=3.4 <4`) fornecidos pelo app. `styled-components` foi removido (sem componente usando).
2. **Split tokens/native/web** — cada plataforma instala só o que roda nela. Os `@zupper/tokens` compilam em **CJS** (requeríveis por Node/CJS puro, ex.: `tailwind.config.js`).
3. **Build correto** (builder-bob no RN, tsc nos tokens) — publica compilado + tipos.
4. **Semver** — major só quando o consumidor quiser.

## Próximos passos
- [x] `npm install` + `npm run build` + `npm test` — validados (nativewind 4.2.6 + tailwind 3.4 + RN 0.83/React 19; `types` do bob ajustado para `lib/typescript/index.d.ts`)
- [ ] **Validar NativeWind no zupper-app** seguindo [`docs/nativewind-zupper-app.md`](docs/nativewind-zupper-app.md)
- [ ] Preencher os **tokens** com o Figma do Community (ver `TODO(Figma)` em `packages/tokens/src`)
- [ ] Ligar o **Storybook** no `ui-native` (as `*.stories.tsx` já existem)
- [ ] Criar os componentes reais: PostCard, LikeButton, Comment, FeedItem
- [x] Definir **registry** (GitHub Packages, escopo `@kodes-tech`) e o fluxo de publish no CI
