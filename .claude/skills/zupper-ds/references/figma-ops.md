# Operações no Figma (Zupper App)

Pré-requisito: **carregue a skill `figma-use` antes de qualquer `use_figma`** (evita erros comuns
de fonte/atomicidade). Use `get_metadata` para estrutura, `get_screenshot` para validar visual,
`search_design_system` para achar componentes/variáveis, e `use_figma` para ler/escrever via Plugin API.

`fileKey` = `CRJYlaF0ep3mKL5fwH3e31`. Componentes e variáveis vivem na página **"⚙️ Componentes"** (`0:1`).
IDs abaixo são referência — **reconfirme** listando páginas / relendo, porque o usuário reorganiza o arquivo.

## Descoberta primeiro
- Listar páginas: `get_metadata` sem `nodeId`.
- Variáveis: `figma.variables.getLocalVariableCollectionsAsync()` → coleções `Primitives` e `Semantics`.
  Resolva aliases (semantic → primitive) para obter o hex final.
- Componentes locais: `page.findAllWithCriteria({types:['COMPONENT_SET','COMPONENT']})`.
- Estilos de texto: `getLocalTextStylesAsync()`.

## Tokens semânticos (nomes canônicos)
`text/primary|secondary|muted|inverse|link|highlight` · `background/background|surface|brand|dark` ·
`border/default|selected|highlight` · `icon/primary|secondary|muted|highlight|inverse` ·
`action/primary|primary-hover` · `feedback/{success|danger|warning|info}[-bg|-text]`.
Espaçamento: `spacing/4|8|12|16|24|32|48|64|80|96`. Estilos de texto locais: `heading`, `body lg`,
`body md`, `body sm`, `caption` (Satoshi). Gradientes: paint styles `Gradients/Button` e `Gradients/Destaques`.

## Vincular cores hardcoded a tokens (role-aware)
Padrão que funciona (usado para 957 vínculos):
1. Construa `hexToVars`: resolva TODAS as variáveis de cor locais para hex; agrupe por hex; prefira `Semantics`.
2. Para cada paint SOLID **sem** `boundVariables.color`, escolha o token pelo papel do nó:
   - `TEXT` → prefixos `['text/','icon/']`
   - `VECTOR`/`BOOLEAN_OPERATION` → `['icon/','text/']`
   - stroke → `['border/']`
   - demais fills → `['background/','action/','feedback/','color/']`
3. Match exato primeiro; para "próximos" óbvios, use um mapa de alias curto (ex.: `#009daf→#008c99`,
   `#464646→#404040`, `#1c1c1a→#262626`). Deixe cores fora da paleta como estão e **reporte-as**.
4. Aplique com `figma.variables.setBoundVariableForPaint(paint,'color',variable)` (retorna um **novo**
   paint — capture e reatribua o array; fills são read-only).
5. Nas telas do fluxo, **não desça em instâncias** (a cor vem do master — corrija no componente).
   Rode nos componentes (propaga) E nos elementos soltos das telas.

## Estilos de texto remotos (ZUKO) → locais
Estilos `App/...` são remotos (biblioteca externa) e devem virar locais. Para cada TEXT com
`textStyleId` cujo estilo é `remote` e nome começa com `App/`, aplique o local equivalente com
`await node.setTextStyleIdAsync(localId)` (carregue as fontes Satoshi antes). Mapa usado:
`App/H1|H2 → heading` · `App/H4|Botão LG → body lg` · `App/Botão MD|Paragrafo LG → body md` ·
`App/Botão SM|Links SM → caption`. Restam estilos presos **dentro de componentes ZUKO externos**
(ex.: `Avatar`) que só mudam detachando — não vale; documente e siga.

## Criar/editar componentes e variantes
- Texto: `loadFontAsync` (da fonte atual do nó) → `await` → mutar `characters`/fonte/etc. → retornar IDs.
- Cores 0–1 (`{r,g,b}`, sem `a`; opacidade no paint). `resize()` antes de setar sizing modes.
- Auto-layout: `figma.createAutoLayout()`; filhos só recebem `FILL`/`HUG` depois de `appendChild`.
- Variantes: nomeie os componentes `prop=valor` e `figma.combineAsVariants([...], page)`; renomeie o set.
- **Propriedades** (`addComponentProperty` no SET): BOOLEAN (liga/desliga camada via
  `node.componentPropertyReferences = { visible: propId }`), TEXT (`{ characters: propId }`),
  INSTANCE_SWAP. Para "oculto por padrão", a camada fica `visible=false` (o boolean espelha isso).
- **Descrição de uso:** `set.description = "..."`. Padrão que usamos: *o que é · Quando usar ·
  Variante(s) · Anatomia/Regras · Estilo (tokens) · Código (nome no Storybook) · Não fazer*.
- Sempre **retorne os IDs** criados/mutados e **valide com screenshot** (`await node.screenshot()`).

## Renomear componentes (kebab-case, alinhado ao código)
Renomear o `COMPONENT_SET`/`COMPONENT` **não quebra instâncias**. Mapa aplicado no arquivo:
`tag comunidade→role-badge` · `tag content→tag-content` · `likes→like-button` · `cta-categoria→filter-chip` ·
`cta→button` · `float button→float-button` · `dropdown→select-field` · `card content→post-card` ·
`card-destino→destination-card` · `card-oferta→offer-card` · `card-roteiro→roteiro-card` (+ `roteiro-card-edit`) ·
`tabs-conteudo→content-tabs` (código ainda `ProfileTabs` — recomendar `ContentTabs`) ·
`card boas vindas→community-cta` · `atalho-aquisicao→quick-action` · `greeting→greeting-header`.
Ao renomear, **atualize os dois docs** (ver `docs-and-naming.md`).

## Exemplos já aplicados (padrões concretos)
- **Propriedade toggle (componente `input`):** ganhou `Mostrar label`/`Mostrar apoio` (BOOLEAN, default
  **off**) + `Label`/`Texto de apoio` (TEXT). Label = Satoshi Bold 14; apoio = Regular 12; gap `spacing/4`;
  na variante `Error` o apoio é `feedback/danger-text`. Defaults off ⇒ instâncias antigas não mudam.
  É o **exemplo canônico** do padrão boolean-visibility + text-prop.
- **Variante de feedback (componente `search-field`):** ganhou a variante `Sem resultado` (a busca só
  aceita destino existente; sem correspondência mostra esse estado).
- **Botão com ícone + fullWidth (`button`):** props `variant` (primary/secondary/ghost) + booleans
  `Ícone esquerda`/`Ícone direita`/`Rótulo`; `fullWidth` é layout (largura Fill), não vira propriedade.
- **Re-linkar instâncias detachadas:** frame solto que tem componente equivalente → substitua por
  `component.createInstance()`, insira no mesmo índice/parent, e reponha os overrides (texto/variante).
  Ex.: selos `role-badge` (viajante/parceiro) que estavam soltos no fluxo.
- **Código → Figma (Button na página "Ajustes"):** ver `reconciliation.md`.

## Validação
Depois de escrever: `get_metadata` para estrutura, `get_screenshot`/`node.screenshot()` para visual.
Cheque texto cortado, sobreposição, contraste. Em erro de `use_figma`: PARE, leia, corrija, repita.
