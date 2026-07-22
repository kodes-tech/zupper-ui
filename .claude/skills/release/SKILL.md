---
name: release
description: >-
  Corta uma versão do zupper-ui e dispara a publicação dos pacotes @kodes-tech
  (trem tokens+ui-native e o trem isolado de icons) e, por tabela, o deploy do
  Storybook do design system. Use quando o usuário pedir para "cortar/publicar
  uma release", "subir versão", "publicar o design system", "gerar a tag",
  "fazer o deploy do storybook" ou "mergear develop na main para release".
  Orquestra develop→main, bump de versão, tag e o monitoramento dos workflows,
  seguindo docs/release.md. Só para o zupper-ui (monorepo do design system).
---

# Cortar uma release do zupper-ui

Fonte da verdade: [`docs/release.md`](../../../docs/release.md). Este skill
**automatiza** aquele runbook — não o substitui. Se este arquivo divergir do
runbook, o runbook vence; avise o usuário da divergência.

## O que este skill faz — e o que NÃO faz

O trabalho manual de um release é: levar código para a `main`, bumpar a versão,
e **cortar a tag**. A publicação dos pacotes e o **deploy do Storybook são efeito
colateral da tag** — os workflows disparam sozinhos no `push` dela:

```
develop ─PR→ main ─bump→ tag vX.Y.Z ─push→ publish.yml ──────────→ GitHub Packages
                                     └──────→ deploy-storybook.yml → Cloud Run (Storybook)
```

- **Faz:** abrir a PR `develop → main`, bumpar versão(ões), ajustar faixas de deps
  internas, cortar e enviar a(s) tag(s) na ordem certa, e depois monitorar os
  workflows e fazer o back-merge `main → develop`.
- **NÃO faz:** rodar `gcloud`, mexer em Cloud Run/IAP ou "deployar o Storybook à
  mão" — isso é o `deploy-storybook.yml` reagindo à tag. O skill só **acompanha**.

## Modo de operação (automático até a tag)

Uma **única confirmação humana** no início, com o plano completo à vista. Depois o
skill executa sozinho até o fim — **mas aborta imediatamente** se qualquer *guard*
de preflight falhar (ver abaixo). Automático quando é seguro; freio de mão quando
um guard dispara.

> ⚠️ **Confirmar aqui = aprovar o release.** No runbook, o merge da PR em `main` é
> o gate humano de aprovação; no modo automático esse gate é a confirmação inicial.
> Deixe isso explícito para o usuário. Publicar é **irreversível**: o registry não
> deixa republicar o mesmo número (runbook: *"nunca force republish do mesmo
> número"*).

## Pré-requisitos

- Rodar a partir da **raiz do `zupper-ui`** (monorepo npm workspaces).
- `gh` autenticado (`gh auth status`) e `git` com push para o remoto.
- **Nunca** forçar branch protection, pular review obrigatório, nem usar
  `--admin`/`--no-verify`. Se um `gh pr merge` bater em proteção, **pare** e avise.

## Guards de preflight (ABORTAR se algum falhar)

Rode **antes** de qualquer ação e re-cheque na hora certa. Se qualquer um falhar,
pare e reporte — não tente contornar:

1. **`git fetch --all --tags`** primeiro; decida sobre o estado remoto fresco, não
   sobre refs locais.
2. **Árvore limpa** (`git status` sem pendências).
3. **Há o que publicar:** `develop` está à frente da `main`
   (`git rev-list --count origin/main..origin/develop` > 0).
4. **A(s) tag(s) alvo NÃO existem** (nem local nem remoto). Reutilizar número =
   publish falho e irreversível.
5. **`tag == version`:** o número da tag tem que bater exatamente com o `version`
   dos `package.json` na `main` — o publish sai com o número do `package.json`, não
   da tag.
6. **Ordem dos trens (icons antes):** se o `ui-native` do release passou a depender
   de uma faixa nova de `@kodes-tech/icons`, a tag `icons-vX.Y.Z` dessa faixa tem
   que ser publicada **antes** da `vX.Y.Z` — senão o guard do `publish.yml` derruba
   o trem. Cheque:
   ```bash
   RANGE=$(node -p "require('./packages/ui-native/package.json').dependencies['@kodes-tech/icons']")
   npm view "@kodes-tech/icons@${RANGE}" version   # vazio = precisa publicar icons antes
   ```
7. **Caret no `0.x`:** ao bumpar o **minor** de um pacote-fonte (ex.: `tokens
   0.3.0 → 0.4.0`), atualize **também** a faixa da dep interna que aponta pra ele
   (`^0.3.0 → ^0.4.0`), senão o consumidor continua puxando a minor antiga.
   (`^0.3.0` = `>=0.3.0 <0.4.0`; `0.4.0` não satisfaz.)
8. **CI verde** antes de todo merge em `main`. O skill faz *poll* do status e
   **recusa** mergear com CI vermelho ou pendente.

## Plano + confirmação (o único gate)

Monte e apresente ao usuário, pedindo um "ok" explícito:

- Tipo de bump (major/minor/patch) e o **número resultante** do trem `vX.Y.Z`.
- Se haverá release de **icons** (`icons-vX.Y.Z`) e, portanto, a **ordem**: icons
  primeiro, trem depois.
- Faixas de deps internas que serão atualizadas (caret 0.x).
- Lista das PRs/features que entram (do `git log origin/main..origin/develop`).
- O aviso de irreversibilidade acima.

Escolha do número (pré-1.0, `0.x`): **minor** = feature nova retrocompatível;
**patch** = correção; **major** = quebra de API. Ver a tabela no runbook.

## Execução

### Passo 0 — (se necessário) release do icons primeiro

Só se o guard 6 indicou faixa de icons não publicada. Icons versiona **sozinho**,
tag própria, cortada da `main`:
```bash
git checkout main && git pull
git tag icons-vX.Y.Z          # prefixo "icons-v" (o workflow filtra icons-v*.*.*)
git push origin icons-vX.Y.Z  # dispara publish-icons.yml
```
Aguarde o **Actions "Publish @kodes-tech/icons"** ficar verde antes de seguir — o
trem depende do icons já estar no registry.

### Passo 1 — PR de release `develop → main`

Este é o início do processo. A PR aponta para `main`:
```bash
gh pr create --base main --head develop \
  --title "release(ui-native): <resumo>" \
  --body "<features/PRs incluídas + Refs KSA-XX>"
```
Espere o **CI verde** (guard 8) e então mergeie. O merge é a materialização do
release aprovado na confirmação inicial.

### Passo 2 — bump de versão na `main` (via PR curto)

A `main` é protegida; o bump vai por PR próprio, base `main`:
```bash
git checkout main && git pull
git checkout -b chore/bump-vX.Y.Z
# editar "version" em AMBOS: packages/tokens/package.json e packages/ui-native/package.json (lockstep)
# se um pacote-fonte mudou de minor, atualizar a faixa da dep interna (guard 7)
git commit -am "chore(release): vX.Y.Z"
gh pr create --base main --head chore/bump-vX.Y.Z --title "chore(release): vX.Y.Z"
# CI verde → merge
```
Trem principal = **tokens + ui-native bumpados juntos**, mesmo `X.Y.Z`.

### Passo 3 — cortar e enviar a tag do trem

```bash
git checkout main && git pull   # com o bump já mergeado
git tag vX.Y.Z                  # "v" obrigatório (o workflow filtra v*.*.*)
git push origin vX.Y.Z          # dispara publish.yml + deploy-storybook.yml
```

### Passo 4 — monitorar (automático no CI)

- **Actions → "Publish packages"** deve ficar verde; confira `@kodes-tech/tokens` e
  `@kodes-tech/ui-native` em Packages na versão nova.
- **Actions → "Deploy Storybook (DS) — GCP"** deve ficar verde (o Storybook é
  buildado do source na tag e sobe no Cloud Run).
- Use `gh run list` / `gh run watch` para acompanhar.

### Passo 5 — back-merge `main → develop`

Para a `develop` não ficar atrás do bump:
```bash
git checkout develop && git pull
git merge main
git push
```

## Se algo der errado

- **Publish falhou (número já existe):** não republique — bumpe para o próximo
  patch e tagueie de novo.
- **Taguei número errado (ainda não publicou):**
  `git tag -d vX.Y.Z && git push origin :refs/tags/vX.Y.Z`, corrija o bump, tagueie
  de novo. Se **já publicou**, siga para o próximo patch.
- **`gh pr merge` barrou (branch protection / review):** pare e avise o usuário —
  não force.

## Checklist final (do runbook)

- [ ] "Publish packages" e (se houve) "Publish @kodes-tech/icons" verdes.
- [ ] "Deploy Storybook (DS) — GCP" verde.
- [ ] tokens + ui-native (e icons, se houve) em Packages na versão nova.
- [ ] `version` nos `package.json` (na `main`) == a respectiva tag.
- [ ] Faixas de deps internas coerentes (ui-native → `@kodes-tech/tokens@^X.Y.0`).
- [ ] `develop` back-merged.

## Workflows que a tag dispara

O pipeline vive em `.github/workflows/` (na `main` e na `develop`):

- `publish.yml` — tag `v*.*.*` → publica `@kodes-tech/tokens` + `@kodes-tech/ui-native`.
- `publish-icons.yml` — tag `icons-v*.*.*` → publica `@kodes-tech/icons`.
- `deploy-storybook.yml` — qualquer uma das tags acima → builda o Storybook do source
  e sobe no Cloud Run (GCP).

Como os workflows disparam a partir do arquivo **no commit taggeado**, a tag precisa
sair de um ponto da `main` que já contenha esses arquivos (é o caso desde o KSA-164).
