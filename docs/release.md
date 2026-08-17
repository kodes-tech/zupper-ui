# Release & publicação — runbook

> Como cortar uma versão do `zupper-ui` e publicar `@kodes-tech/tokens`,
> `@kodes-tech/icons` e `@kodes-tech/ui-native` no GitHub Packages. Escrito para quem
> **assume o repo** — siga na ordem, é seguro.

## Em uma frase

Trabalho entra na `develop` → o **bump de versão** é feito **na `develop`** (via PR) →
**promove-se `develop → main`** (merge) → **tag `vX.Y.Z` na `main`** → a tag dispara o
workflow que **publica os pacotes**. **Sem back-merge** (a develop já tem o bump).

```
bump na develop ──PR──▶ promove develop→main ──▶ git tag vX.Y.Z (na main) ──push──▶ publish.yml ▶ GitHub Packages
```

## Conceitos que você precisa saber antes

- **Duas branches de vida longa:** `develop` (todo trabalho) e `main` (só
  releases). Apps consumidores instalam **versões publicadas** (tags cortadas da
  `main`), **nunca** a `develop`. Publicar da `develop` = entregar trabalho não
  revisado. Por isso **tags saem só da `main`**.
- **Três pacotes, dois trens de release:**
  - **Trem principal** — `packages/tokens` + `packages/ui-native`, versionados
    **juntos** (mesmo `X.Y.Z`); tag `vX.Y.Z` →
    [`publish.yml`](../.github/workflows/publish.yml). Sempre bumpe os dois.
  - **Isolado** — `packages/icons` versiona **sozinho**; tag `icons-vX.Y.Z` →
    [`publish-icons.yml`](../.github/workflows/publish-icons.yml). Bump de icons não
    força bump do trem e vice-versa (ver [ADR 0008](decisions/0008-icons-package-dual-renderer.md)).
- **⚠️ Ordem entre os trens:** o `ui-native` depende de `@kodes-tech/icons`, então a
  tag `icons-vX.Y.Z` da faixa pedida precisa ser publicada **antes** da tag `vX.Y.Z`
  do trem — senão o guard do `publish.yml` falha o release (o icons ainda não está no
  registry).
- **⚠️ Caret no `0.x` fixa o minor (vale para `tokens` E `icons`):** em semver,
  `^0.5.0` = `>=0.5.0 <0.6.0` — logo `0.6.0` **não** satisfaz `^0.5.0`. Ao bumpar um
  pacote-fonte de minor (`tokens` **ou** `icons`), atualize **também** a faixa da dep
  interna do `ui-native` (ex.: `^0.5.0` → `^0.6.0`). No monorepo isso é **obrigatório
  mesmo que o `ui-native` não use o recurso novo** — o workspace local só linka se a
  faixa casar, senão o `npm install` quebra com 404.
- **A tag é o gatilho:** os workflows disparam em `push` de tag — `v*.*.*` (trem) e
  `icons-v*.*.*` (isolado). Sem tag, nada publica.
- **Registry:** GitHub Packages, escopo `@kodes-tech` (grátis, vinculado à org
  dona do repo). O publish usa o `GITHUB_TOKEN` do próprio Actions — **nenhum
  segredo manual** é necessário no CI.

## Qual número de versão (semver)

`MAJOR.MINOR.PATCH` — decida pelo conteúdo do release:

| Mudou o quê | Bump | Exemplo |
|---|---|---|
| Correção, sem mudar API | **PATCH** | `0.2.0 → 0.2.1` |
| Componente/feature nova, retrocompatível | **MINOR** | `0.2.0 → 0.3.0` |
| Quebra de API (prop removida/renomeada, comportamento) | **MAJOR** | `0.2.0 → 1.0.0` |

Pré-1.0 (`0.x`), tratamos **minor** como "features novas" e **patch** como
correções — é o caso da maioria dos releases hoje.

## Passo a passo

> **Fluxo (a partir da KSA-352): bump na `develop` → promove `develop → main` → tag na
> `main`. SEM back-merge.** A `main` é só um espelho promovido da develop — nunca
> diverge, e a develop nunca fica atrás. (Ver "Por que sem back-merge".)

### 1. Bump de versão (na `develop`, via PR)

```bash
git checkout develop && git pull
git checkout -b chore/bump-vX.Y.Z
# edite "version" em AMBOS: packages/tokens/package.json e packages/ui-native/package.json
# guard "caret 0.x": se tokens OU icons mudou de MINOR, atualize a faixa da dep interna
#   do ui-native (ex.: tokens ^0.8.0 → ^0.9.0; icons ^0.5.0 → ^0.6.0)
npm install --legacy-peer-deps   # OBRIGATÓRIO: sincroniza o package-lock (senão o npm ci do publish quebra)
git commit -am "chore(release): vX.Y.Z"   # inclui os package.json E o package-lock.json
gh pr create --base develop --head chore/bump-vX.Y.Z --title "chore(release): vX.Y.Z"
# CI verde → merge
```

### 2. Promover `develop → main`

```bash
gh pr create --base main --head develop \
  --title "chore(release): promover develop → main para vX.Y.Z" \
  --body "<liste as features/PRs incluídas + Refs KSA-XX>"
# CI verde → merge (MERGE COMMIT — nunca squash na promoção)
```

- O **merge da promoção é a aprovação** do release. Só mergeie com o **CI verde**.

### 3. Cortar e enviar a tag (na `main`)

```bash
git checkout main && git pull      # com a promoção já mergeada
# confira: version de tokens E ui-native na main == X.Y.Z (tag == version)
git tag vX.Y.Z                     # o "v" é obrigatório (o workflow filtra v*.*.*)
git push origin vX.Y.Z
```

### 4. O workflow publica (automático)

O push da tag dispara [`publish.yml`](../.github/workflows/publish.yml): faz
`npm ci`, builda os workspaces e roda `npm publish` de **tokens** e **ui-native**.

- Acompanhe em **Actions → Publish packages**.
- Ao terminar, confira os pacotes em **GitHub → org → Packages** com a versão nova.

> **Sem passo de back-merge:** a develop já tem o bump (passo 1). Ver "Por que sem
> back-merge" no fim.

## Release do `@kodes-tech/icons` (trem isolado)

O `icons` publica sozinho, por tag própria — **não** entra no `vX.Y.Z`. **Mesmo fluxo:**
bump do `icons` **na develop** (via PR, com `npm install`) → promove `develop → main` →
tag `icons-vX.Y.Z` na `main`. Sem back-merge.

```bash
# passo 3, após o bump na develop + a promoção develop→main:
git checkout main && git pull
git tag icons-vX.Y.Z               # prefixo "icons-v" (o workflow filtra icons-v*.*.*)
git push origin icons-vX.Y.Z
```

O push dispara [`publish-icons.yml`](../.github/workflows/publish-icons.yml): `npm ci`,
`icons:audit` (trava de integridade), build e `npm publish` **só do icons**.

- Acompanhe em **Actions → "Publish @kodes-tech/icons"**.
- **Faça isto ANTES do trem `vX.Y.Z`** sempre que o `ui-native` do release passar a
  depender de uma nova faixa de icons — o guard do `publish.yml` valida que a versão
  pedida já existe no registry e **falha o trem** se não existir.

## Verificação (fim do release)

- [ ] Actions "Publish packages" e (se houve icons) "Publish @kodes-tech/icons" **verdes**.
- [ ] `@kodes-tech/tokens` e `@kodes-tech/ui-native` aparecem em Packages na versão `X.Y.Z`.
- [ ] Se houve release de icons: `@kodes-tech/icons` aparece em Packages na versão nova.
- [ ] `version` nos `package.json` (na `main`) == a respectiva tag.
- [ ] `package-lock.json` em sync com o bump (rodou `npm install` no passo 1).
- [ ] Faixas das deps internas coerentes (ui-native → `tokens`/`icons` no `^X.Y.0` certo).
- [ ] `develop` == `main` (o bump nasceu na develop; `git diff origin/main origin/develop` vazio).
- [ ] App consumidor: bump da dependência pra `^X.Y.Z` quando for consumir.

## Se algo der errado

- **Workflow falhou no publish:** leia o log em Actions. Causa comum é a versão já
  existir no registry (não dá pra republicar o mesmo número) → bumpe pro próximo
  patch e tagueie de novo. **Nunca** force republish do mesmo número.
- **Taguei o número errado:** delete a tag local e remota
  (`git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z`), corrija o bump e
  tagueie de novo. Se **já publicou**, não dá pra sobrescrever — parta pro próximo
  patch.
- **Tag != version nos package.json:** o publish sai com o número do `package.json`,
  não da tag. Confira o passo 3 antes de taguear.
- **`npm install` falhou (404) no bump:** o caret de uma dep interna não bate com o
  workspace local após o bump (ex.: `icons` subiu de minor mas o `ui-native` segue
  `^0.5.0`). Suba a faixa (ver "caret no 0.x") e rode `npm install` de novo.
- **`npm ci` quebrou no publish:** o `package-lock.json` ficou fora de sync com o
  `package.json`. Rode `npm install` no bump e commite o lock junto.

## Por que sem back-merge

O repo usa **squash-merge** nas features, então `develop` e `main` divergem de
histórico. Com o fluxo antigo (*bump-na-main + back-merge*), o back-merge por merge
completo **conflitava** (ex.: no `CLAUDE.md`). Bumpando **na develop** e só
**promovendo** para a `main` (merge commit), a `main` nunca ganha commit próprio → não
diverge, e não há back-merge. O conteúdo fica idêntico (`git diff origin/main
origin/develop` vazio) mesmo com históricos diferentes. Se um dia precisar sincronizar
uma develop já divergida, aplique o bump **direto nela** (mesmos valores da main), em
vez de um merge/back-merge completo.

## Consumindo a versão publicada (no app)

`.npmrc` do projeto consumidor:

```ini
@kodes-tech:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_PACKAGES_TOKEN}
```

`GITHUB_PACKAGES_TOKEN` = PAT com `read:packages`, no ambiente (local e CI). Então
`@kodes-tech/ui-native@^X.Y.Z` no `package.json` do app.

## Relacionados

- Fluxo de branches: [`../README.md`](../README.md#fluxo-de-branches-e-release)
- Workflows: [`../.github/workflows/publish.yml`](../.github/workflows/publish.yml) (trem) ·
  [`../.github/workflows/publish-icons.yml`](../.github/workflows/publish-icons.yml) (icons)
- Pacote de ícones com renderer duplo: [ADR 0008](decisions/0008-icons-package-dual-renderer.md)
- Automação do bump por tag (planejado): **KSA-161**
- Dev local / yalc: [`local-development.md`](local-development.md)
