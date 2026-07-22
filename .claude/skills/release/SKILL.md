---
name: release
description: >-
  Corta uma versão do zupper-ui e dispara a publicação dos pacotes @kodes-tech e,
  por tabela, o deploy do Storybook. São DOIS trens de release independentes: o
  Fluxo A (tokens+ui-native, tag vX.Y.Z) e o Fluxo B (icons, tag icons-vX.Y.Z) —
  cada um cortável sozinho. Use quando o usuário pedir para "cortar/publicar uma
  release", "subir versão", "publicar o design system", "publicar os ícones",
  "gerar a tag", "fazer o deploy do storybook" ou "mergear develop na main para
  release". Orquestra develop→main, bump, tag e o monitoramento, seguindo
  docs/release.md. Só para o zupper-ui (monorepo do design system).
---

# Cortar uma release do zupper-ui

Fonte da verdade: [`docs/release.md`](../../../docs/release.md). Este skill
**automatiza** aquele runbook — não o substitui. Se este arquivo divergir do
runbook, o runbook vence; avise o usuário da divergência.

## O que este skill faz — e o que NÃO faz

O trabalho manual de um release é: levar código para a `main`, bumpar a versão, e
**cortar a tag**. A publicação dos pacotes e o **deploy do Storybook são efeito
colateral da tag** — os workflows disparam sozinhos no `push` dela.

- **Faz:** abrir a PR `develop → main`, bumpar versão(ões), ajustar faixas de deps
  internas, cortar e enviar a tag, monitorar os workflows e fazer o back-merge
  `main → develop`.
- **NÃO faz:** rodar `gcloud`, mexer em Cloud Run/IAP ou "deployar o Storybook à
  mão" — isso é o `deploy-storybook.yml` reagindo à tag. O skill só **acompanha**.

## Dois trens de release INDEPENDENTES

O DS tem três pacotes em **dois trens que versionam e publicam separadamente**:

| Fluxo | Pacotes | Tag | Workflow |
|---|---|---|---|
| **A** | `@kodes-tech/tokens` + `@kodes-tech/ui-native` (lockstep, mesmo `X.Y.Z`) | `vX.Y.Z` | `publish.yml` |
| **B** | `@kodes-tech/icons` (versiona sozinho) | `icons-vX.Y.Z` | `publish-icons.yml` |

**Cada fluxo é um release completo e autônomo** (develop→main → bump → tag →
back-merge). Um bump de icons **não** força bump do trem, e vice-versa.

> 🔓 **Independência é regra dura.** Precisa subir **só o `icons`** e o
> `tokens`/`ui-native` não mudaram? **Rode o Fluxo B e pronto** — o Fluxo A
> simplesmente não é cortado. Nada em A pode bloquear B (e vice-versa): se o Fluxo A
> for avaliado, ele aborta **sozinho** na Análise (trem A sem mudança), sem impedir o
> Fluxo B. Nunca condicione o release de um trem à situação do outro — o único elo é
> a **ordem** do Acoplamento 1, que faz B vir *antes* de A quando necessário, não que
> um dependa do release do outro.

- **Pergunte / detecte qual fluxo** o usuário quer antes de começar. "Publicar os
  ícones" → Fluxo B. "Soltar uma versão do DS / dos primitivos" → Fluxo A.
- **Acoplamento 1 (ordem):** o `ui-native` depende de `@kodes-tech/icons`. Se o
  release do Fluxo A passou a exigir uma **faixa nova** de icons, o Fluxo B daquela
  faixa precisa ter sido publicado **antes** — senão o guard do `publish.yml` derruba
  o trem. O Fluxo A **detecta** isso e **manda rodar o Fluxo B primeiro**; ele
  **não** corta icons por conta própria.
- **Acoplamento 2 (promoção `develop→main` é compartilhada):** ao cortar B e A em
  sequência do mesmo `develop`, a promoção `develop→main` acontece **uma vez** — o
  primeiro fluxo já leva todo o conteúdo da `develop` pra `main`. Se o passo 1 de um
  fluxo encontrar o guard 3 sem diff (`develop` == `main`), a promoção **já foi
  feita**: **pule o passo 1** e vá direto ao bump+tag na `main` daquele trem.

## Modo de operação (automático até a tag)

Vale para os dois fluxos: uma **única confirmação humana** no início, com o plano à
vista. Depois executa sozinho até o fim — **mas aborta imediatamente** se qualquer
*guard* falhar. Automático quando é seguro; freio de mão quando um guard dispara.

> ⚠️ **Confirmar = aprovar o release.** No runbook, o merge da PR em `main` é o gate
> humano; no modo automático esse gate é a confirmação inicial. Publicar é
> **irreversível**: o registry não deixa republicar o mesmo número (runbook: *"nunca
> force republish do mesmo número"*).

## Pré-requisitos

- Rodar a partir da **raiz do `zupper-ui`** (monorepo npm workspaces).
- `gh` autenticado (`gh auth status`) e `git` com push para o remoto.
- **Nunca** forçar branch protection, pular review obrigatório, nem usar
  `--admin`/`--no-verify`. Se um `gh pr merge` bater em proteção, **pare** e avise.

## Guards comuns (ABORTAR se algum falhar — valem para A e B)

Rode **antes** de qualquer ação e re-cheque na hora certa; se falhar, pare e reporte,
não contorne:

1. **`git fetch --all --tags`** primeiro; decida sobre o estado remoto fresco.
2. **Árvore limpa** (`git status` sem pendências).
3. **Há o que publicar NESTE trem (per-train, por *diff*):** avalie pela *Análise do
   release* (abaixo) — o diff dos **paths do próprio trem** desde a **última tag dele**,
   **não** um diff repo-wide `develop vs main`. Cada trem é julgado só pelos seus paths:
   se o `icons` mudou mas `tokens`/`ui-native` não, o Fluxo A não tem release — e isso
   **não** bloqueia o Fluxo B (nem o contrário). Nunca use `git rev-list --count` (um
   commit de back-merge infla a contagem).
4. **A tag alvo NÃO existe** (local nem remoto). Reutilizar número = publish falho e
   irreversível.
5. **`tag == version`:** o número da tag bate exatamente com o `version` do
   `package.json` (na `main`) do(s) pacote(s) daquele trem — o publish sai com o
   número do `package.json`, não da tag.
6. **CI verde** antes de todo merge em `main`. Faça *poll* do status e **recuse**
   mergear com CI vermelho ou pendente.

Número (semver, pré-1.0 `0.x`): **minor** = feature nova retrocompatível; **patch** =
correção; **major** = quebra de API. Ver a tabela no runbook.

## Análise do release (release-worthiness + bump) — ANTES de abrir a PR de versão

Não abra a PR de versão no escuro. Primeiro **varra o que entra desde a última tag
daquele trem** e valide que o bump é legítimo. Isso alimenta o plano da confirmação.

Parametrize por trem:
- **Fluxo A:** `LAST=$(git tag --list 'v*.*.*' --sort=-v:refname | head -1)`;
  `PATHS="packages/tokens packages/ui-native"`.
- **Fluxo B:** `LAST=$(git tag --list 'icons-v*.*.*' --sort=-v:refname | head -1)`;
  `PATHS="packages/icons"`.

1. **Mudou algo *publicável*?** (o pacote não inclui stories/spec/_figma/docs — mudança
   só neles **não** justifica release do trem):
   ```bash
   git diff --name-only "$LAST"..origin/develop -- $PATHS \
     | grep -vE '\.(stories|spec)\.tsx?$|/__tests__/|/_figma/|\.md$'
   ```
   **Saída vazia → ABORTAR *este* fluxo (não a sessão):** nada publicável mudou neste
   trem desde `$LAST`, então o bump seria um release vazio. Isso **não afeta o outro
   trem** — o outro fluxo é avaliado à parte e pode seguir normalmente. A exceção
   legítima é bump **só** de faixa de dep interna (ex.: ui-native apontando pra
   tokens/icons novos) — nesse caso registre isso como o motivo do release.

2. **Bump que os commits *indicam*** (Conventional Commits no intervalo, escopados ao
   trem):
   ```bash
   git log "$LAST"..origin/develop --format='%s%n%b' -- $PATHS
   ```
   `BREAKING CHANGE:` ou `tipo!:` → **major** · algum `feat:` → **minor** · só
   `fix:`/`perf:`/`refactor:` → **patch**.

3. **Varredura das PRs que compõem o release** (pra conferência humana no plano):
   ```bash
   git log "$LAST"..origin/develop --merges --format='%s' | grep -oE '#[0-9]+'
   # e, por PR, o título/labels/arquivos:
   gh pr view <n> --json title,labels,files -q '.title'
   ```

**Regra de decisão (cruza o detectado com o proposto):**
- Detectado **> proposto** (ex.: há `feat`/breaking mas pediram patch): **PARE** e
  exija confirmação explícita — publicar minor/major como patch engana o semver dos
  consumidores. Breaking num `0.x` é minor, mas ainda assim sinalize.
- Detectado **< proposto** (ex.: só fixes mas querem minor): permitido; **registre no
  plano** o porquê (ex.: agrupar trabalho).
- **Nada publicável** (passo 1 vazio) e sem bump de dep: **ABORTAR**.

Leve o resultado (escopo publicável, bump sugerido × proposto, lista de PRs) para a
confirmação — é o que torna o "ok" uma aprovação informada.

---

# Fluxo A — trem `tokens` + `ui-native` (tag `vX.Y.Z`)

## Guards específicos do Fluxo A

- **A1 — ordem do icons (checar, NÃO cortar):** se o `ui-native` passou a pedir uma
  faixa de `@kodes-tech/icons` ainda não publicada, **PARE** e diga ao usuário para
  rodar o **Fluxo B** (icons) primeiro. Este fluxo não corta icons.
  ```bash
  RANGE=$(node -p "require('./packages/ui-native/package.json').dependencies['@kodes-tech/icons']")
  npm view "@kodes-tech/icons@${RANGE}" version   # vazio = ABORTAR: rode o Fluxo B antes
  ```
- **A2 — caret no `0.x`:** ao bumpar o **minor** de um pacote-fonte (ex.: `tokens
  0.3.0 → 0.4.0`), atualize **também** a faixa da dep interna que aponta pra ele
  (`^0.3.0 → ^0.4.0`), senão o consumidor puxa a minor antiga.
  (`^0.3.0` = `>=0.3.0 <0.4.0`; `0.4.0` não satisfaz.)

## Plano + confirmação (o único gate)

Apresente e peça "ok" explícito, usando o resultado da **Análise do release** (escopo
publicável desde a última tag, bump sugerido × proposto, PRs varridas): tipo de bump e
**número `vX.Y.Z`**; faixas de dep a atualizar (caret 0.x); resultado do guard A1
(icons já satisfeito, ou "precisa do Fluxo B antes"); e o aviso de irreversibilidade.

## Passos

```bash
# 1) PR de release develop → main (início do processo). Espere CI verde e mergeie.
gh pr create --base main --head develop \
  --title "release(ui-native): <resumo>" --body "<features/PRs + Refs KSA-XX>"

# 2) Bump na main (via PR curto) — tokens E ui-native no mesmo X.Y.Z (lockstep)
git checkout main && git pull
git checkout -b chore/bump-vX.Y.Z
#   editar "version" em packages/tokens/package.json E packages/ui-native/package.json
#   se um pacote-fonte mudou de minor, atualizar a faixa da dep interna (guard A2)
git commit -am "chore(release): vX.Y.Z"
gh pr create --base main --head chore/bump-vX.Y.Z --title "chore(release): vX.Y.Z"
#   CI verde → merge

# 3) Cortar e enviar a tag (dispara publish.yml + deploy-storybook.yml)
git checkout main && git pull
git tag vX.Y.Z                  # "v" obrigatório (o workflow filtra v*.*.*)
git push origin vX.Y.Z

# 5) Back-merge main → develop
git checkout develop && git pull && git merge main && git push
```

**4) Monitorar:** Actions → **"Publish packages"** e **"Deploy Storybook (DS) — GCP"**
verdes; `@kodes-tech/tokens` e `@kodes-tech/ui-native` em Packages na versão nova.
Use `gh run list` / `gh run watch`.

---

# Fluxo B — trem `icons` (tag `icons-vX.Y.Z`)

Release **autônomo** do `@kodes-tech/icons`. Não toca em tokens/ui-native e não exige
release do Fluxo A. Rode-o por conta própria quando for publicar ícones — ou quando o
guard A1 do Fluxo A pedir que ele venha antes.

## Guards específicos do Fluxo B

- **B1 — `icons:audit`:** o `publish-icons.yml` roda a trava de integridade 1:1 dos
  dois renderers. Garanta `npm run icons:audit -w @kodes-tech/icons` verde antes.
- Guards comuns 4 e 5 valem sobre o **icons**: a tag `icons-vX.Y.Z` não pode existir,
  e `packages/icons/package.json` `version` == `X.Y.Z` da tag.

## Plano + confirmação (o único gate)

Apresente e peça "ok", usando o resultado da **Análise do release** (escopo publicável
de `packages/icons` desde a última tag `icons-v*`, bump sugerido × proposto, PRs
varridas): número `icons-vX.Y.Z`; mudanças de ícones incluídas; e, se este release
habilita uma faixa nova pro `ui-native`, o lembrete de que **o Fluxo A pode ser cortado
depois** deste publicar.

## Passos

```bash
# 1) (se houver código de icons na develop) PR de release develop → main. CI verde → merge.
gh pr create --base main --head develop \
  --title "release(icons): <resumo>" --body "<mudanças de ícones + Refs KSA-XX>"

# 2) Bump na main (via PR curto) — SÓ packages/icons/package.json
git checkout main && git pull
git checkout -b chore/bump-icons-vX.Y.Z
#   editar "version" em packages/icons/package.json
git commit -am "chore(release): icons vX.Y.Z"
gh pr create --base main --head chore/bump-icons-vX.Y.Z --title "chore(release): icons vX.Y.Z"
#   CI verde → merge

# 3) Cortar e enviar a tag (dispara publish-icons.yml + deploy-storybook.yml)
git checkout main && git pull
git tag icons-vX.Y.Z            # prefixo "icons-v" (o workflow filtra icons-v*.*.*)
git push origin icons-vX.Y.Z

# 5) Back-merge main → develop
git checkout develop && git pull && git merge main && git push
```

**4) Monitorar:** Actions → **"Publish @kodes-tech/icons"** e **"Deploy Storybook (DS)
— GCP"** verdes; `@kodes-tech/icons` em Packages na versão nova.

---

## Se algo der errado (ambos os fluxos)

- **Publish falhou (número já existe):** não republique — bumpe para o próximo patch e
  tagueie de novo.
- **Taguei número errado (ainda não publicou):**
  `git tag -d <tag> && git push origin :refs/tags/<tag>`, corrija o bump, tagueie de
  novo. Se **já publicou**, siga para o próximo patch.
- **`gh pr merge` barrou (branch protection / review):** pare e avise — não force.

## Checklist final

- [ ] Workflow do trem verde ("Publish packages" [A] ou "Publish @kodes-tech/icons" [B]).
- [ ] "Deploy Storybook (DS) — GCP" verde.
- [ ] Pacote(s) do trem em Packages na versão nova.
- [ ] `version` no(s) `package.json` (na `main`) == a tag.
- [ ] [A] Faixas de deps internas coerentes (ui-native → `@kodes-tech/tokens@^X.Y.0`).
- [ ] `develop` back-merged.

## Workflows que a tag dispara

O pipeline vive em `.github/workflows/` (na `main` e na `develop`):

- `publish.yml` — tag `v*.*.*` → publica `@kodes-tech/tokens` + `@kodes-tech/ui-native`.
- `publish-icons.yml` — tag `icons-v*.*.*` → publica `@kodes-tech/icons`.
- `deploy-storybook.yml` — **qualquer** uma das tags acima → builda o Storybook do
  source e sobe no Cloud Run (GCP); a vitrine mostra os três pacotes.

Como os workflows disparam a partir do arquivo **no commit taggeado**, a tag precisa
sair de um ponto da `main` que já contenha esses arquivos (é o caso desde o KSA-164).
