# Release & publicação — runbook

> Como cortar uma versão do `zupper-ui` e publicar `@kodes-tech/tokens`,
> `@kodes-tech/icons` e `@kodes-tech/ui-native` no GitHub Packages. Escrito para quem
> **assume o repo** — siga na ordem, é seguro.

## Em uma frase

Trabalho entra na `develop` → abre-se um PR **`develop → main`** → na `main`, um
**bump de versão** + uma **tag `vX.Y.Z`** → a tag dispara o workflow que
**publica os dois pacotes**.

```
develop ──PR──▶ main ──bump version──▶ git tag vX.Y.Z ──push──▶ publish.yml ▶ GitHub Packages
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
- **⚠️ Caret no `0.x` fixa o minor:** em semver, `^0.3.0` = `>=0.3.0 <0.4.0` — logo
  `0.4.0` **não** satisfaz `^0.3.0`. Ao bumpar um pacote-fonte de minor (ex.:
  `tokens 0.3.0 → 0.4.0`), atualize **também** a faixa da dep interna que aponta pra
  ele (`@kodes-tech/tokens` no `ui-native`: `^0.3.0` → `^0.4.0`), senão o consumidor
  continua puxando a minor antiga.
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

### 1. Abrir o PR de release (`develop → main`)

```bash
gh pr create --base main --head develop \
  --title "release(ui-native): <resumo>" \
  --body "<liste as features/PRs incluídas + Refs KSA-XX>"
```

- O **merge do PR é a aprovação** do release. Só mergeie com o **CI verde**.
- Liste no corpo o que entra (facilita as notas da release depois).

### 2. Bump de versão (na `main`, via PR)

A `main` é protegida — o bump vai por um PR curto **base `main`**:

```bash
git checkout main && git pull
git checkout -b chore/bump-vX.Y.Z
# edite "version" em AMBOS: packages/tokens/package.json e packages/ui-native/package.json
# se um pacote-fonte mudou de minor, atualize a faixa da dep interna (ver "caret no 0.x"):
#   ex.: ui-native → dependencies["@kodes-tech/tokens"]: ^0.3.0 → ^0.4.0
git commit -am "chore(release): vX.Y.Z"
gh pr create --base main --head chore/bump-vX.Y.Z --title "chore(release): vX.Y.Z"
# CI verde → merge
```

> ⚠️ **O número aqui tem que bater exatamente com a tag do passo 3.** Divergência
> = publica errado ou falha. (A automação disso é a **KSA-161** — quando entrar, a
> tag vira a fonte única e este passo some.)

### 3. Cortar e enviar a tag (na `main`)

```bash
git checkout main && git pull      # com o bump já mergeado
git tag vX.Y.Z                     # o "v" é obrigatório (o workflow filtra v*.*.*)
git push origin vX.Y.Z
```

### 4. O workflow publica (automático)

O push da tag dispara [`publish.yml`](../.github/workflows/publish.yml): faz
`npm ci`, builda os workspaces e roda `npm publish` de **tokens** e **ui-native**.

- Acompanhe em **Actions → Publish packages**.
- Ao terminar, confira os pacotes em **GitHub → org → Packages** com a versão nova.

### 5. Back-merge `main → develop` (via PR — nunca push direto)

Pra `develop` não ficar atrás do bump de versão. A `develop` é protegida
(ruleset: mudança só por PR) e a regra vale inclusive pro release — não usar
bypass de admin:

```bash
git fetch origin
git push origin origin/main:refs/heads/chore/backmerge-vX.Y.Z
gh pr create --base develop --head chore/backmerge-vX.Y.Z \
  --title "chore(release): back-merge vX.Y.Z para develop" \
  --body "<versões + Refs KSA-XX>"
gh pr merge --merge --delete-branch <n>   # CI verde → merge
```

## Release do `@kodes-tech/icons` (trem isolado)

O `icons` publica sozinho, por tag própria — **não** entra no `vX.Y.Z`. Mesma regra
de sempre: **a tag sai da `main`** (o código já revisado precisa estar lá; garanta o
`develop → main` antes).

```bash
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
- [ ] Faixas das deps internas coerentes (ex.: `ui-native` → `@kodes-tech/tokens@^X.Y.0`).
- [ ] `develop` back-merged (sem ficar atrás da `main`).
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
  não da tag. Confira o passo 2 antes de taguear.

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
