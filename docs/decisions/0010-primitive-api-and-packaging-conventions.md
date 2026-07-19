# 0010 — Convenções de API dos primitivos e empacotamento

**Status:** Accepted

## Contexto

O `@kodes-tech/ui-native` nasceu com dois vícios comuns em design systems:

1. **Passthrough**: componentes cujo tipo público **estendia** o do react-native
   (`PressableProps & {...}`) e que **repassavam** props cruas (`{...rest}`). O
   contrato público **era** o contrato do RN → trocar a lib de base quebraria os
   consumidores; a superfície era imprevisível.
2. Dúvidas recorrentes sobre **onde cada coisa mora** (3 pacotes: `tokens`,
   `icons`, `ui-native`) e sobre **em que pacote** vive uma escala com nome de
   domínio (ex.: tamanho de ícone).

## Decisão

### 1. Regra de ouro do wrapper (API própria, sem passthrough)
Todo componente do DS expõe **um contrato próprio** — só as props que decidimos
suportar. **Proibido**: `& <RN>Props` e `{...rest}` cego. A lib (RN) é **detalhe
interno** do primitivo.
- Preferir **props semânticas** a repassar config da lib. Ex.: `Input` tem
  `type: 'email' | 'phone' | …` (mapeia internamente `keyboardType`/`secureTextEntry`),
  não `keyboardType` cru.
- Nomes neutros: `disabled` (não `editable`), `onSubmit` (sem vazar o evento).
- **Exceção — primitivos estruturais**: componentes de layout/estrutura
  (Box/Scroll/Pressable, que vivem no app) podem expor **um** escape hatch de
  estilo (`className`/`style`), pois seu papel é serem compostos. Ainda assim: sem
  `{...rest}` e sem estender o tipo da lib.
- Acréscimo de prop é **sob demanda** e deliberado (superfície controlada), nunca
  "de graça" via spread.

### 2. Empacotamento por *footprint de dependência*
A fronteira entre os 3 pacotes é o **footprint de dependência**, não o nível
atômico:
| Pacote | Depende de | Consumidores |
|---|---|---|
| `tokens` | **nada (zero-dep)** | qualquer stack (RN, React, Angular, Node, tooling) |
| `icons` | react / react-native-svg (peers) + SVG cru | React, RN, e SVG cru p/ outras stacks |
| `ui-native` | tokens (+ icons) | apps RN |

A **propriedade de ouro** é `tokens` ser **zero-dependência** — por isso `icons`
(que carrega renderers) **não** entra no `tokens`, e componentes (RN) **não**
entram no `tokens`/`icons`. Ver [ADR 0002](0002-tokens-shared-components-per-framework.md).

### 3. Escalas numéricas moram no `tokens`
Toda escala de **valor** (numérica/agnóstica) vive no `@kodes-tech/tokens`, **mesmo
quando o nome cita um domínio**. Ex.: `iconSize` é valor (12/16/20/24) → `tokens`,
ao lado de `spacing`/`radii`/`fontSize`. O `Icon` (renderer, em `icons`) só
**consome** o token; não o define (mantém `icons` sem depender de `tokens`).

## Consequências

- Trocar a lib de base (ou o renderer) mexe **só por dentro** do primitivo; o
  contrato e os consumidores não mudam.
- Custo: cada prop nova é declarada à mão (boilerplate) — aceito em troca de
  superfície controlada e trocabilidade.
- `tokens` permanece instalável por **qualquer** produto/stack sem arrastar React/RN.
- Aplicado: todos os atoms + as 6 molecules já estão sem passthrough; organisms
  nunca tiveram. `iconSize` criado e adotado.

## Alternativas rejeitadas

- **Passthrough (estilo MUI/Chakra)** — flexível, mas acopla o contrato ao React
  DOM/RN. Rejeitado por conflitar com o objetivo de DS multi-stack e trocável.
- **Escala de ícone no pacote `icons`** — poluiria com dependência de renderer
  quem só quer o valor. Rejeitado (quebra o zero-dep do `tokens`).
