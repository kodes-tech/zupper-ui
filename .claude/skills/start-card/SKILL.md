---
name: start-card
description: >-
  Inicia o trabalho numa story do Jira: cria a branch de feature, abre um PR em
  DRAFT já preenchido com os Critérios de Aceite (AC) do card e o Definition of
  Done (DoD) do repo, e linka tudo. Use quando o usuário disser "pegar o card
  KSA-123", "começar/iniciar a KSA-123", "start card KSA-123", "vou trabalhar na
  KSA-123" ou "abrir o draft da story". O dev codifica na branch e, no fim, só
  marca o PR como Ready. Substitui a abertura manual de PR — o PR já nasce
  passando em jira-link e acceptance-criteria, com os AC à vista.
---

# Iniciar uma story (branch + draft PR com AC do Jira e DoD do repo)

Abre o PR **no início do trabalho**, em DRAFT, para os AC ficarem à vista
enquanto o dev codifica. Duas fontes distintas — **não confunda**:

- **Acceptance Criteria (AC):** vêm da **story do Jira** (os `[AC-N]`
  GIVEN/WHEN/THEN, específicos daquela story).
- **Definition of Done (DoD):** vem do **repo** (`docs/conventions/definition-of-done.md`
  e o PR template) — igual para toda story. **Nunca** copie DoD do card.

## Pré-requisitos (se faltar, pare e avise)

- **MCP do Atlassian conectado** (é como buscamos o card). Sem as ferramentas
  `mcp__atlassian__*`, pare e peça para conectar o Atlassian.
- `gh` autenticado; estar na branch de integração (`develop`) com árvore limpa.

## Procedimento

### 1. Chave do Jira
Pegue a chave que o usuário passou (`KSA-123` / `BFF-45`). Se não veio, pergunte.

### 2. Buscar a story (via JQL — NÃO use `getJiraIssue`)
- Resolva o `cloudId` (site `kodestech-jinboo`, via `getAccessibleAtlassianResources`).
- Busque com `searchJiraIssuesUsingJql`: `jql: "key = KSA-123"`,
  `fields: ["summary","description"]`. Use `issues[0].fields`.
  **Não use `getJiraIssue`** (leitura por ID): esse endpoint anda dando timeout
  de 300s; a busca por JQL usa outra rota e responde rápido.
- **Extraia os AC** da descrição: linhas `[AC-N] GIVEN … WHEN … THEN …` (podem
  vir com colchetes escapados, ex.: `\[AC-1\]` — normalize para `[AC-1]`).
- **Guarda:** se a descrição **não tiver** nenhum `[AC-N]`, **não crie nada** —
  avise que o card `KSA-123` está sem critérios de aceite e que eles precisam
  ser adicionados na story primeiro (o AC é fonte no Jira).

### 3. Base (branch de integração — nunca `main`)
```bash
gh api "repos/{owner}/{repo}/branches/develop" >/dev/null 2>&1 && BASE=develop || BASE="$(gh repo view --json defaultBranchRef -q .defaultBranchRef.name)"
```

### 4. Criar a branch de feature + commit scaffold
Nome: `<tipo>/<chave-minúscula>-<slug>` (slug = summary em kebab-case, curto, sem
tags como `[TESTE]`). Tipo do card → `feat`/`fix`/… (default `feat`).
```bash
git checkout "$BASE" && git pull --ff-only
git checkout -b feat/ksa-123-<slug>
git commit --allow-empty -m "chore: start work on KSA-123 (scaffold)"
git push -u origin HEAD
```
(O commit vazio existe só para permitir abrir o PR antes de haver código.)

### 5. Montar o corpo do PR (do template do repo)
Preencha `.github/pull_request_template.md`, sem inventar seções:
- **Summary:** o objetivo (do `summary`/descrição do card) + link do Jira.
- **Acceptance Criteria:** cole os `[AC-N]` do card (texto GIVEN/WHEN/THEN).
- **Test plan:** um checkbox por `[AC-N]`.
- **Definition of Done:** o checklist do template/`definition-of-done.md`.
Strings em **PT-BR**. **Nunca** mencione IA/Claude no título ou corpo.

### 6. Abrir o PR em DRAFT
Título Conventional Commits + chave: `feat(<escopo>): <resumo> (KSA-123)`.
```bash
gh pr create --draft --base "$BASE" --head "$(git rev-parse --abbrev-ref HEAD)" \
  --title "feat(<escopo>): <resumo> (KSA-123)" --body "<corpo>"
```
Devolva o link e diga que é um **draft**: o dev codifica na branch e, ao concluir,
roda a finalização (abaixo).

## Finalizar (quando o trabalho terminar)

1. Garanta commits pushados, testes/lint/typecheck verdes localmente, e **cada
   `[AC-N]` coberto por teste**.
2. Se os AC do card mudaram, atualize a seção Acceptance Criteria do PR.
3. Marque como pronto para review:
   ```bash
   gh pr ready <n>
   ```
   Aí o review automático valida os AC contra o código.

## Guards (pare e avise, não contorne)

| Situação | Ação |
|---|---|
| MCP do Atlassian ausente | Pare — peça para conectar o Atlassian |
| Sem chave do Jira | Pergunte a chave |
| Card sem `[AC-N]` | Não crie branch/PR — peça para adicionar AC na story |
| Não está em `develop` / árvore suja | Peça para ir pra `develop` e limpar antes |

## Notas

- **Busca via JQL, não `getJiraIssue`** — a leitura de issue por ID tem dado
  timeout de 300s; `searchJiraIssuesUsingJql` (`key = KSA-N`) responde rápido.
- PR em **draft** = zero ruído (não parece pronto) e só existe para cards
  realmente em andamento — nada de PRs órfãos de backlog.
- AC do Jira, DoD do repo. Repo-agnóstica: lê template/DoD do próprio repositório.
