# 0009 — Fronteira do design system: package = primitivos globais; produto/telas no app; Storybook é ferramenta

- **Status:** Accepted
- **Date:** 2026-07-18
- **Deciders:** Marcos Matsuda

## Context

A missão do `zupper-ui` é ser a **assinatura visual da empresa** — um design único
(tokens + primitivos) que **qualquer** produto/app da empresa possa adotar, não só o
Zupper Super App.

Na prática, o `@kodes-tech/ui-native` acumulou **telas inteiras** (`src/screens/`:
`Feed`, `CommunityProfile`, `PublishContent`, `MyAccount`…) e **organisms de produto**
(`PostCard`, `CommunityCTA`, `TravelPreferencesResultCard`, os `*Sheet` de
report/moderação…). Sintomas concretos:

- O app importa a **tela inteira** do package: `zupper-superapp/.../feed-screen.tsx`
  só mapeia dados e faz `<Feed {...props} />`, enquanto o layout/composição de produto
  mora em `@kodes-tech/ui-native/src/screens/Feed/Feed.tsx`. A dependência está
  **invertida** — a lib é dona da decisão de produto e o app virou um cano de dados.
- Mudança de produto força **release da lib**: o trem `ui-native@0.4.0` foi cortado por
  causa de Feed/ícones do app (ver [ADR 0008](0008-icons-package-dual-renderer.md)).
- Outro adotante da "assinatura" seria forçado a baixar `Feed`/`PostCard` do Zupper
  (e cópia PT-BR de produto) que nunca usaria.

Há também uma confusão conceitual recorrente entre **Storybook** e **package**.

## Decision

### 1. O package publica só o layer global (primitivos)

Os pacotes publicados são a assinatura da empresa e contêm **apenas o agnóstico de
produto**:

- `@kodes-tech/tokens` — valores (cor/spacing/tipografia/radius/elevação). É a
  assinatura de verdade e o que permite temar por produto/marca (ver
  [ADR 0005](0005-seasonal-theming-remote-flag.md)).
- `@kodes-tech/icons` — set de ícones.
- `@kodes-tech/ui-native` — **primitivos** RN: atoms + molecules/organisms **genéricos**
  (reutilizáveis por qualquer produto). Modelo mental: **MUI/Materialize** — a lib
  entrega `Button`, `Input`, `Sheet`, `Avatar`…, nunca a tela do seu produto.

### 2. Produto e telas ficam no app

Componentes que codificam **conceito de produto** (Community/Travel, papéis
`traveler/partner`, fluxos, cópia PT-BR) e **todas as telas** vivem no
`zupper-superapp` (`src/presentation/`). O app **compõe** suas telas a partir dos
primitivos do package. `View`/`Text` cru só para **layout**; tudo com estilo de marca
vem do package.

### 3. Design system não tem `screens/`

DS entrega primitivos e, no máximo, composições **agnósticas de produto**
(`Card`, `EmptyState`, `Sheet`, `PageHeader`). A linha **não é tamanho, é reutilização
agnóstica**. Tela inteira de produto nunca entra no package.

**Teste decisivo** (aplicar a cada componente novo): *"um produto totalmente diferente
da empresa (um admin interno, outro app) usaria isso **como está**?"* — **Sim** → global
(package); **Não** (codifica conceito Zupper) → app.

### 4. Storybook ≠ package

- **Package** = o **entregável** (o que os apps instalam e importam).
- **Storybook** = **ferramenta** de desenvolvimento isolado + documentação viva + teste
  visual. Não é entregável; não "forma" o package (as `*.stories` são inclusive
  excluídas do build publicado — Storybook é sempre uma camada *em volta* do código,
  no repo onde o código vive).

### 5. Dois Storybooks, dois públicos

Separar o package do produto **não** tira as telas do Storybook — elas continuam
visíveis e demonstráveis; muda só **onde** o Storybook mora. Teremos **dois**:

| Storybook | Repo | Mostra | Público / uso |
|---|---|---|---|
| **DS (assinatura)** | `zupper-ui` | tokens, ícones, **primitivos** | outras equipes adotarem a "cara" da empresa |
| **App (demo)** | `zupper-superapp` | **telas + produto** compostos com os primitivos | **demonstração ao cliente** + bancada dos devs do app |

- O Storybook do **app** importa os primitivos do package (`@kodes-tech/ui-native`) e
  renderiza as telas — é literalmente "componentes usando os primitivos", roda no
  navegador (`react-native-web`, sem simulador/backend, dados via args). **É o que se
  mostra ao cliente.**
- O Storybook do **DS** é a vitrine neutra da assinatura — não mostra telas do Zupper.

**Implicação para publicação (KSA-163):** os dois motivos de "publicar no ar" ficam
separados — *demo ao cliente* → publicar o Storybook do **app** (telas); *assinatura
para adoção* → publicar o Storybook do **DS** (primitivos). São dois alvos de publish,
com o mesmo mecanismo de gate, podendo ter públicos/gates distintos.

## Consequences

- **+** Release do produto **desacoplado** da lib: mudar uma tela do Zupper não força
  bump de `ui-native`; o app evolui suas telas sem esperar release.
- **+** Adotantes puxam só a assinatura (sem produto/idioma do Zupper); a vitrine
  publicada parece um **sistema neutro**, não o app Zupper — o que sustenta a adoção
  por outros times.
- **+** Fronteira alinhada com o que o [ADR 0002](0002-tokens-shared-components-per-framework.md)
  ("tokens compartilhados; componentes por framework") e o
  [ADR 0003](0003-atomic-design.md) já apontavam.
- **−** Migração de código: mover `src/screens/` e os organisms de produto para o
  `zupper-superapp`, reescrevendo imports; essas telas saem do Storybook do DS (vão pro
  Storybook do app).
- **Follow-ups:**
  - Migração **em ondas** (épico no KSA), começando pelas `screens/` (100% app).
  - **Lint boundary** no `ui-native` proibindo `src/screens/` e imports de conceito de
    produto no pacote global (mesmo espírito do `eslint-plugin-boundaries` do app).
  - **Reescopar a KSA-163** para o Storybook publicado ser só o layer global.

## Alternatives considered

- **Manter tudo no `ui-native` e só organizar o Storybook por seções** (Foundations /
  Produto) — rejeitado: não desacopla nada; o adotante continua puxando produto e o
  versionamento segue acoplado à churn de produto. Resolve a aparência, não a raiz.
- **Pacote dedicado `@zupper/app-ui`** para o produto — opção válida **se** Community/
  Travel forem reusados por outros apps Zupper. Por ora o dono natural é o **próprio
  app** (mais simples, menos um pacote pra versionar). Revisitar quando surgir um 2º app
  que precise dessas telas. O `CLAUDE.md` já previa a fronteira `ui-native` × `app-ui`.
