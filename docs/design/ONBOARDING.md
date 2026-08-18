# Onboarding — Design & DS da Comunidade Zupper

Bem-vindo(a)! Este é o **ponto de partida** para trabalhar no design system e nas telas
da **Comunidade Zupper**, usando o **Claude Code** integrado ao Figma e a este repositório.
Leia isto primeiro — ele **aponta** para tudo (não duplica; os detalhes vivem nas fontes citadas).

## 1. O que é

A Comunidade Zupper é a camada social/de conteúdo (organizada **por destino**) sobre o app
OTA da Zupper, com um design system próprio. O trabalho de design/DS vive em **duas fontes
que andam juntas**:

- **Figma "Zupper App"** — design (componentes-mestre, variáveis/tokens, telas) · `fileKey CRJYlaF0ep3mKL5fwH3e31`
- **Repo `zupper-ui`** — código (tokens + primitivos React Native + Storybook)

> **Regra de ouro:** em divergência, **o Figma manda** (fonte única de componentes/tokens).

## 2. Onde está cada coisa

- **DS doc** → [`docs/design/DS-Comunidade-Zupper-Tokens-e-Componentes.md`](./DS-Comunidade-Zupper-Tokens-e-Componentes.md)
  — tokens, inventário de componentes, dívida técnica e o **changelog das rodadas de
  sincronização** (seções 10.x). Comece lendo a seção 10.x mais recente para saber o estado atual.
- **PRD** → [`docs/design/PRD-Comunidade-Zupper.md`](./PRD-Comunidade-Zupper.md)
  — escopo, régua de permissão, navegação, telas, decisões.
- **Skill do Claude** → [`.claude/skills/zupper-ds/`](../../.claude/skills/zupper-ds/)
  — carrega contexto, governança e método para o Claude. Invoque com `/zupper-ds` (ou só
  mencione "Zupper App" / "zupper-ui"). As `references/` têm o passo a passo de cada frente
  (`figma-ops`, `storybook-and-prs`, `docs-and-naming`, `reconciliation`).
- **Convenções de código** → [`docs/conventions/`](../conventions/) + [`CLAUDE.md`](../../CLAUDE.md) (raiz) + [`docs/known-issues.md`](../known-issues.md).
- **Figma — páginas-chave**: **⚙️ Componentes** (`0:1` — componentes-mestre + coleções
  `Primitives`/`Semantics` + text styles), **Fluxo completo MVP** e as páginas de versões/ajustes.

## 3. Setup (checklist)

1. **Claude Code** instalado; **clonar** `github.com/kodes-tech/zupper-ui` na branch **`develop`**.
2. **MCP do Figma** conectado e **autorizado** — o servidor que expõe o `use_figma` (escrita),
   via `/mcp` numa sessão interativa. É o passo que mais trava (OAuth) — garanta que ele aparece.
3. **Storybook** rodando (preview no navegador, sem simulador):
   ```bash
   npm install --legacy-peer-deps
   npm run storybook -w @zupper/ui-native
   ```
4. Confirmar que a skill **`zupper-ds`** aparece (digite `/` para listar as skills).
5. **Acessos**: edição no Figma "Zupper App"; repo `zupper-ui`; e Notion (board de estratégia
   da Comunidade) / Jira, se for participar.

## 4. Trabalhando com o Claude aqui

- **Invoque a skill `zupper-ds`** no começo da tarefa — ela traz o método e os fatos-chave.
- Fluxo: **ler a `reference` antes de agir** → passos pequenos → **validar por screenshot** →
  **registrar a rodada no DS doc**.
- Gotchas que já custaram retrabalho (estão na skill): `use_figma` é **atômico** (se o script
  falha, nada aplica); **carregue a fonte antes de editar texto**; **binding de cor role-aware**
  (TEXT→`text/*`, VECTOR→`icon/*`, stroke→`border/*`, fill→`background|action|feedback/*`);
  renomear componente **não** quebra instâncias.

## 5. Governança (resumo)

**Nunca hardcode** cor/tipografia/spacing — sempre token semântico; **kebab-case** no Figma /
**PascalCase** no código (Atomic no design, primitivos no código); **confirme antes de mudança
ampla** em arquivo compartilhado (faça 1 caso de referência, valide, depois replique); **ícones
ZUKO mantidos**. Detalhes em `.claude/skills/zupper-ds/SKILL.md`.

## 6. Trabalho integrado (duas pessoas no mesmo Figma)

Combinem **quem mexe em quê**; usem **branch do Figma** para mudanças grandes; **avisem antes de
renomear componentes**; abram **PR no `zupper-ui` (base `develop`)** para código/docs; e mantenham
o **DS doc como changelog vivo** (uma seção por rodada, como vem sendo feito).

## 7. Primeiras tarefas de ambientação

1. Rodar o Storybook e abrir 1 primitivo.
2. Abrir o Figma "Zupper App" e localizar a página **⚙️ Componentes**.
3. Ler a **seção 10.x mais recente** do DS doc (o que foi feito por último).
4. Com o Claude + skill `zupper-ds`, fazer **1 micro-ajuste tokenizado** numa tela e **validar
   por screenshot**.

## Links

- **Figma**: https://www.figma.com/design/CRJYlaF0ep3mKL5fwH3e31/Zupper-App
- **Repo**: https://github.com/kodes-tech/zupper-ui (branch `develop`)
- **Storybook**: ver [`docs/storybook-deploy.md`](../storybook-deploy.md) (publicado com gate/IAP)
- **DS doc**: [`docs/design/DS-Comunidade-Zupper-Tokens-e-Componentes.md`](./DS-Comunidade-Zupper-Tokens-e-Componentes.md)
- **PRD**: [`docs/design/PRD-Comunidade-Zupper.md`](./PRD-Comunidade-Zupper.md)
