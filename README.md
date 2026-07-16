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

## Fluxo de branches e release

Só duas branches de longa vida:

- **`develop`** — onde todo trabalho entra (features, fixes, PRs do Dependabot).
  É a branch default de trabalho.
- **`main`** — só recebe **releases**, via PR `develop → main`. Nunca commite
  nem abra PR de trabalho direto na `main`.

> ⚠️ **Apps consumidores instalam versões publicadas (tags cortadas da `main`),
> nunca a `develop`.** Publicar a partir da `develop` entrega trabalho não
> aprovado. Por isso as tags saem **só da `main`**.

## Publicação (release)

Registry: **GitHub Packages**, escopo `@kodes-tech` (grátis — vinculado à org dona deste repo).

1. Abra um PR **`develop → main`** e mergeie quando o CI passar (isso é o "aprovar").
2. Na `main` atualizada: bump de `version` (mesmo semver) em
   `packages/tokens/package.json` **e** `packages/ui-native/package.json` (via PR,
   pois `main` é protegida). Garanta que a tag vai bater com esse número.
3. **Na `main`**: `git tag vX.Y.Z` + `git push origin vX.Y.Z`.
4. O workflow [`.github/workflows/publish.yml`](.github/workflows/publish.yml)
   (dispara em tags `v*.*.*`) builda e publica os dois pacotes automaticamente.
5. Back-merge `main → develop` para a `develop` não ficar atrás do bump de versão.

## Dependabot — só segurança

O Dependabot é um bot do GitHub para dependências. Ele tem **duas partes
independentes**, e aqui a escolha é deliberada:

- **Version updates** (PRs semanais "modernizando" libs, via `.github/dependabot.yml`):
  **DESLIGADO** — não existe mais o `dependabot.yml`. Para um time pequeno e em
  ritmo de entrega, o ganho não paga o ruído (e já nos custou tempo real: um bump
  automático de TypeScript 7 quebrou o `ts-jest`). **Atualização de versão aqui é
  manual e deliberada** — quando alguém encosta no repo e decide subir.
- **Security updates** (PRs **só quando há uma vulnerabilidade real/CVE** numa
  dependência): **LIGADO** (setting do repo `dependabot_security_updates`). É a
  parte de valor alto e ruído quase zero — uma rede de proteção que só toca quando
  há um problema de verdade.

**Se um dia quiser reativar os version-updates**, recrie o `.github/dependabot.yml`
com `target-branch: develop` (nunca `main` — ver fluxo de release acima) e
`ignore` para bumps major.

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
