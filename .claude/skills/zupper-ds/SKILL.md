---
name: zupper-ds
description: >-
  Workflow do Design System do Zupper — mantém em sincronia o Figma "Zupper App"
  (fileKey CRJYlaF0ep3mKL5fwH3e31) e o repositório de código `zupper-ui` (Storybook,
  @kodes-tech/tokens e @kodes-tech/ui-native). Use sempre que a tarefa tocar o design system
  da Comunidade Zupper, por exemplo: editar tokens/variáveis ou componentes no Figma Zupper App;
  vincular cores/estilos a tokens ou trocar estilos do ZUKO pelos locais; criar, renomear ou
  escrever a descrição de um componente; rodar ou revisar o Storybook do zupper-ui; revisar PRs
  desse repo; atualizar o PRD ou o DS doc da Comunidade; ou reconciliar nomes/tokens entre Figma e
  código. Dispare mesmo sem a pessoa dizer "design system" — basta mencionar Zupper App, zupper-ui,
  kodes-tech, a comunidade Zupper, os tokens/variáveis do arquivo, ou as páginas "Componentes" /
  "Fluxo completo MVP" / "Ajustes". NÃO use para trabalho de Figma, Storybook, tokens ou React Native
  sem relação com o Zupper (outro cliente/arquivo/repo), nem para perguntas conceituais genéricas.
---

# Zupper Design System — Figma ↔ código

Este skill carrega o contexto e o método para manter o design system do Zupper coerente entre
**duas fontes que precisam andar juntas**: o arquivo Figma "Zupper App" (design) e o monorepo
`zupper-ui` (código + Storybook). A maior parte do trabalho é **ler uma, agir na outra, e manter
os documentos e a nomenclatura em sincronia** — sem quebrar o que já existe.

Antes de agir, confirme os fatos-chave abaixo no ambiente atual (IDs mudam quando o usuário
reorganiza o arquivo — sempre **liste as páginas / releia** em vez de confiar cegamente nos IDs).

## Fatos-chave

**Figma — arquivo "Zupper App"** · `fileKey CRJYlaF0ep3mKL5fwH3e31`
- Página **"⚙️ Componentes"** (`0:1`) — componentes-mestre + coleções de variáveis `Primitives` e
  `Semantics` + text styles canônicos. É a fonte dos componentes/tokens.
- Página **"✅ Fluxo completo MVP"** (`377:24625`) — as telas do fluxo, em seções.
- Página **"✅ Protótipo MVP"** — versão navegável.
- Página **"Ajustes"** (`484:5874`) — usada para levar componentes do código → Figma e reconciliar divergências (ex.: o `button` foi recriado aqui a partir do Storybook).
- Acesso via o Figma MCP (server que expõe `use_figma`, `get_metadata`, `get_screenshot`,
  `search_design_system`). **Sempre carregue a skill `figma-use` antes de chamar `use_figma`.**

**Código — `github.com/kodes-tech/zupper-ui`** (monorepo npm workspaces)
- `packages/tokens` → `@kodes-tech/tokens` (cores, radii, spacing, tipografia — agnóstico).
- `packages/ui-native` → `@kodes-tech/ui-native` (componentes React Native, NativeWind, Atomic Design + Storybook).
- Branch **`develop`** = design system completo (é onde está tudo). **`main` = só o scaffold** — não use `main` para ver componentes.

**Documentos** — versionados neste repo (`zupper-ui`) em **`docs/design/`**:
- `docs/design/PRD-Comunidade-Zupper.md` — produto: escopo, régua de permissão, navegação, telas, decisões, épicos.
- `docs/design/DS-Comunidade-Zupper-Tokens-e-Componentes.md` — tokens + inventário de componentes + dívida técnica.

## Governança (regra de ouro)

1. **Zupper App é a fonte única de verdade** de componentes e tokens. Em divergência, o Figma manda.
2. **ZUKO está descontinuado** como fonte — mantenha apenas os **ícones** do ZUKO; **cores e estilos
   de texto devem ser os tokens/estilos locais do próprio arquivo**.
3. **Nomenclatura:** Figma em **kebab-case**, código em **PascalCase**, ambos organizados por
   **Atomic Design** (atoms/molecules/organisms/screens). O nome-base deve bater 1:1
   (`post-card` ↔ `PostCard`) para o handoff/Code Connect ser trivial.
4. **Nunca hardcode** cor/tipografia/spacing — vincule a variáveis (`text/*`, `background/*`,
   `border/*`, `action/*`, `feedback/*`, `spacing/*`) e estilos de texto.
5. **Confirme antes de agir em arquivo compartilhado.** Renomear/editar afeta muitas instâncias e
   colegas — para mudanças amplas, faça 1 caso de referência, valide por screenshot, depois replique.

## Onde ler para cada tarefa

Leia o arquivo de referência correspondente **antes** de executar — cada um tem os passos, os IDs
úteis e os erros já conhecidos daquela frente:

| Tarefa | Leia |
|---|---|
| Editar Figma: vincular tokens, criar/renomear componentes, descrições, variantes, propriedades | `references/figma-ops.md` |
| Rodar o Storybook, revisar PRs do `zupper-ui`, verificar builds | `references/storybook-and-prs.md` |
| Manter o PRD/DS doc e aplicar a nomenclatura | `references/docs-and-naming.md` |
| Reconciliar tokens/nomes Figma ↔ código, Code Connect, página "Ajustes" | `references/reconciliation.md` |

## Gotchas que já custaram retrabalho (leia sempre)

- **`use_figma` é atômico e o estado não persiste entre chamadas.** Se um script falha, nada é
  aplicado — leia o erro, corrija, e só então repita. Trabalhe em passos pequenos e valide (screenshot).
- **Edição de texto no Figma:** carregue a fonte do nó (via `getStyledTextSegments(['fontName'])`) →
  `await` → mutar → **retorne os IDs afetados**. Pular o load quebra com "unloaded font".
- **Binding de cor role-aware:** um mesmo hex mapeia para vários tokens (ex.: teal = `action/primary`
  E `text/highlight` E `icon/highlight`). Escolha pelo papel do nó: TEXT→`text/*`, VECTOR→`icon/*`,
  fill de frame→`background|action|feedback/*`, stroke→`border/*`. Prefira `Semantics` a `Primitives`.
- **Cuidado com regex em nomes de token:** `\bcta\b` já transformou `community-cta` em
  `community-button` (o "-" conta como fronteira de palavra). Ancore substituições e verifique depois.
- **Boolean de visibilidade espelha o `visible` do master:** para um item "oculto por padrão mas
  controlado por boolean", a camada precisa ficar `visible=false` no componente-mestre (isso É o
  estado boolean=false). Não é bug.
- **Renomear componente NÃO quebra instâncias** (o vínculo é por ID). Pode renomear à vontade.
- **Storybook das PRs:** para verificar se uma branch compila, faça **build limpo por branch**
  (`storybook build`), **nunca** alterne branches num servidor `storybook dev` já "quente" — o
  watcher do webpack não registra os SVGs novos e gera **falsos "Can't resolve './Icon'"**.
- **Se o `gh` (GitHub CLI) não estiver disponível**, use a **API do GitHub via `curl`** para PRs.

## Postura

O objetivo do skill é manter o ciclo saudável: **design e código evoluindo juntos, docs em dia,
nomes e tokens reconciliados.** Seja honesto sobre divergências e lacunas (ex.: Code Connect ainda
não configurado; variáveis do Figma ainda não reconciliadas 1:1 com `@kodes-tech/tokens`) — apontá-las
é parte do valor. Quando encontrar uma divergência ao reproduzir algo, registre-a (na descrição do
componente, no DS doc, ou na página "Ajustes") em vez de silenciá-la.
