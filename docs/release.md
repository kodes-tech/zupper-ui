# Release & publicação — runbook

> Como cortar uma versão do `zupper-ui` e publicar `@kodes-tech/tokens` e
> `@kodes-tech/ui-native` no GitHub Packages. Escrito para quem **assume o repo**
> — siga na ordem, é seguro.

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
- **Dois pacotes, mesma versão:** `packages/tokens` e `packages/ui-native` são
  versionados **juntos** (mesmo `X.Y.Z`). Sempre bumpe os dois.
- **A tag é o gatilho:** o workflow [`.github/workflows/publish.yml`](../.github/workflows/publish.yml)
  dispara em `push` de tags `v*.*.*`. Sem tag, nada publica.
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

### 5. Back-merge `main → develop`

Pra `develop` não ficar atrás do bump de versão:

```bash
git checkout develop && git pull
git merge main
git push
```

## Verificação (fim do release)

- [ ] Actions "Publish packages" **verde**.
- [ ] `@kodes-tech/tokens` e `@kodes-tech/ui-native` aparecem em Packages na versão `X.Y.Z`.
- [ ] `version` nos dois `package.json` (na `main`) == a tag.
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
- Workflow: [`../.github/workflows/publish.yml`](../.github/workflows/publish.yml)
- Automação do bump por tag (planejado): **KSA-161**
- Dev local / yalc: [`local-development.md`](local-development.md)
