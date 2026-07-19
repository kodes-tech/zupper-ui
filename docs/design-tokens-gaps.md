# Design tokens — gaps para alinhar com o designer

> Inventário **vivo** das lacunas/inconsistências dos `@kodes-tech/tokens`,
> alimentado conforme (a) migramos as telas tela a tela e (b) auditamos os tokens
> ao construir as foundations no Storybook. Objetivo: fechar uma lista única e
> levar ao designer para oficializar no Figma.
>
> Fonte: [`packages/tokens/src`](../packages/tokens/src). Specimens no Storybook do
> `zupper-ui`: `Typography/`, `Colors/`, `Spacing/`, `Radii/`, `Elevation/`.

## Resumo (o que levar ao designer)

| Token | Estado | Ação |
|---|---|---|
| **typography** | ⚠️ off-scale hardcoded + papéis divergentes | oficializar tamanhos (ver abaixo) |
| **colors** | ⚠️ 3 valores sem Figma (`TODO`) | validar/gerar no Figma |
| **elevation** | ⚠️ placeholder | calibrar sombras no Figma |
| **sizes** | ⚠️ quase vazio (só `control: 44`) | definir dimensões fixas usadas |
| **spacing** | ✅ escala 8pt completa | — (sem gap conhecido) |
| **radii** | ✅ escala completa | — (sem gap conhecido) |

---

## Typography

### Escala atual (tokens)
`fontSize`: **12 · 13 · 14 · 16 · 20 · 24** (xs · sm · md · lg · xl · xxl)
`fontWeight`: 400 (regular) · 500 (medium) · 700 (bold) · `fontFamily`: Satoshi
Presets: `badge` · `caption` · `actionLabel` · `authorName` · `bodyText` ·
`roteiroTitle` · `inputLabel` · `inputError` · `bodyMd` · `cardTitle` ·
`buttonLabel` · `buttonLabelLg` · `sectionTitle` · `heading` · `avatarFallback`.

### Papéis observados (consolidado — atualizar a cada tela)

| Papel | Tamanho(s) | Token? | Onde (componente · tela) | Proposta p/ o designer |
|---|---|---|---|---|
| Título de sheet / seção | **17** e **18** (divergem) | ❌ (16→20) | **17px:** `CommunityCTA` (Feed) · `NotInterestedSheet` (Feed) · `BottomSheet` (base) — **18px:** `ContentRemovedSheet` · `ReportSentSheet` · `ReportReasonsSheet` · `ReportConfirmSheet` · `ContentUnderReviewSheet` · `OwnPostActionsSheet` · `DeleteOwnPostSheet` (moderação — Feed / Detalhe do conteúdo / Perfil) | oficializar **um** valor (add 18 à escala? ou usar 20?) |
| Corpo secundário do sheet | 14 · `leading` **17** vs **18** | tamanho ✔ / lh ❌ | **lh 18:** sheets acima · **lh 17:** `ReportReasonsSheet` | padronizar line-height |
| Label de opção (sheet) | **15** | ❌ | `SheetOption` (usado nos sheets de opções) | usar 14 (md) ou 16 (lg)? |
| Nome da conta (saudação) | **22** | ❌ (20→24) | `AccountGreeting` (Minha conta · Perfil da comunidade) | virar token (`displaySm`?) ou usar 20/24 |
| Título de dia de roteiro | **18** | ❌ | `RoteiroDayCard` · `RoteiroDayForm` (Publicar conteúdo → roteiro) | mesmo destino do "título de sheet" |
| Display / ícone-glifo grande | **32** | ❌ | `TravelPreferencesResultCard` (Resultado de preferências) | ⚠ é glifo decorativo — provável não-texto (confirmar) |
| Inicial de avatar (sm) | **7** | ❌ | `AvatarFallback` (avatares pequenos, vários) | tamanho de avatar pequeno; ok manter fora da escala? |

> **Headline:** o *título de sheet* renderiza **17px em 3 componentes e 18px em
> ~7**, e nenhum existe na escala (que pula 16→20). Precisamos de **um** valor
> oficial. O comum é escala modular ~7–8 passos (12·14·16·**18**·20·24·**30/32**);
> adicionar **18** resolve a maioria.

### Por tela
**Feed (KSA-168 — migrada)** — componentes: `GreetingHeader`, `SearchField`,
`QuickAction`, `DestinationCard`, `CommunityCTA`, `PostCard`, `BottomNav`.
- ✅ maioria usa presets (`text-authorName`, `text-caption`, `text-cardTitle`…).
- ❌ `CommunityCTA` — título `text-[17px]` hardcoded.
- ✅ **título de seção** ("Destinos em alta" / "Comunidade Zupper") — migrado: o
  `feed.tsx` › `SectionTitle` agora usa **`<Text variant="sectionTitle">`** (token
  = **16px**), fim do `text-[18px]` hardcoded. ⚠️ **Mudança visual 18 → 16** ao
  alinhar ao token. **Decisão do designer:** manter 16 ou oficializar 18 — se 18,
  basta bumpar o preset `sectionTitle` no `tokens` (1 lugar) e todos os usos
  acompanham. Ainda candidato a molécula `SectionHeader`.
- ⚠️ smoke do app (`design-system-smoke.stories.tsx`) usa `text-[18px]`.

**ContentDetail (KSA-30 — migrada p/ o app)** — a tela agora usa o primitivo
`<Text variant/color>` (sem `className` de tipografia). Ao migrar, apareceram:
- ⚠️ **título do conteúdo / título de ofertas** eram `text-[18px] font-bold` →
  mapeados para **`variant="sectionTitle"`** (16px). **Mudança visual 18 → 16**
  (mesmo gap do "título de sheet/seção"). `RoteiroDayCard` (componente, migrado p/
  o app) mantém `text-[18px]` fiel.
- ❌ **cor `text-brand-strong`** nos metadados do roteiro ("3 dias · 8 paradas ·
  Família") → **não há `TextColor` de marca** no primitivo `Text` (só
  primary/secondary/muted/inverse/link/heading/body/label/subtle/danger). Mapeado
  para `color="link"` (aproximação). **Decisão:** adicionar `TextColor="brand"`
  (→ `text-brand-strong`) ao primitivo `Text`? (ver Colors abaixo).

**CommunityProfile (KSA-31 — migrada p/ o app)** — idem primitivo `Text`:
- ⚠️ **estado vazio**, linha 1: `text-[16px] leading-[24px]` (subtle) → mapeado p/
  `variant="bodyMd"` (16px, mas `leading` 16, não 24). Linha 2: `text-[22px]
  font-bold leading-[32px]` → `variant="heading"` (24px). **22 → 24** (mesmo gap
  do `AccountGreeting`).

_(próximas telas a preencher: MyAccount, PersonalData, PublishContent, TravelPreferences…)_

### Apêndice — hardcodes catalogados (DS `ui-native`)
`grep -rn "text-\[[0-9]" atoms molecules organisms`:
- **17px** — `NotInterestedSheet`, `CommunityCTA`, `BottomSheet`.
- **18px** — `ContentRemovedSheet`, `ReportSentSheet`, `DeleteOwnPostSheet`,
  `ReportConfirmSheet`, `ReportReasonsSheet`, `ContentUnderReviewSheet`,
  `OwnPostActionsSheet`, `RoteiroDayCard`, `RoteiroDayForm`, `SheetOption` (emoji).
- **15px** — `SheetOption` (label). **22px** — `AccountGreeting`.
- **32px** — `TravelPreferencesResultCard` (glifo ⚠). **7/16px** — `AvatarFallback`.
- `leading` divergente no corpo 14px: `18` (maioria) vs `17` (`ReportReasonsSheet`).

---

## Colors

Marcados como `TODO(Figma)` no próprio `packages/tokens/src/colors.ts` — valores
definidos "pelo time" (sem Figma) ou espelhados do app antigo:

| Token | Valor atual | Onde (componente · tela) | Observação no código |
|---|---|---|---|
| `surface.selection` | `#737373` (neutral-500) | `Input` — seleção de texto/cursor (ex.: Dados pessoais, Endereço) | sem Figma |
| `border.focus` | `#737373` (neutral-500) | `Input` — borda do campo focado (mesmas telas de formulário) | sem Figma |
| `feedback.danger` | `#EF4444` | `Input` (mensagem/borda de erro) · `Button` ghost ("Sair da minha conta" — Minha conta) | "sem estado de erro no Figma novo" — espelhado do `@zupper/app-ui` |

Ação: validar esses 3 no Figma "Zupper 2.0" (foco de input, seleção, erro).

**Cor de texto de marca ausente no primitivo `Text`:** o `TextColor` do átomo
`Text` não expõe a cor de marca (`brand-strong`). Os metadados do roteiro em
`ContentDetail` usam `text-brand-strong`; ao migrar via `<Text>` foi aproximado
para `color="link"`. Ação: adicionar `TextColor="brand"` (→ `text-brand-strong`)
ao `Text`, para telas não precisarem de `className` de cor.

---

## Elevation

`elevation = { none: 0, low: 1, medium: 3, high: 6 }` — valores **placeholder**
(`TODO(Figma): calibrar`). São só "degraus" abstratos; não há sombra oficial
(cor/blur/offset/spread) definida no Figma. **Nenhum componente consome o token
hoje** (0 usos em atoms/molecules/organisms) — sombras, quando existem, são ad-hoc.
Ação: designer definir a receita de sombra de cada degrau e **onde** se aplica
(card `PostCard`/`DestinationCard`, sheet `BottomSheet`, FAB/botão primário…).

---

## Sizes

`sizes = { control: 44 }` — altura de campos de formulário (usado no `Input` via
`h-control`).

- ✅ **`iconSize` criado** (`xs 12 · sm 16 · md 20 · lg 24`, default lg) e **DS
  migrado** — 28 usos em 17 componentes do `ui-native` + o Feed do app agora usam o
  token. Specimen no Storybook: `Icons/Sizes`.
- ⚠️ **Outliers fora da escala** (pendente designer — viram `graphicSize`/novo degrau?):
  - **72** — glifos de status: `ContentRemovedSheet`, `ContentUnderReviewSheet`,
    `PublishedModal`, `TravelPreferencesResultCard`.
  - **48** — `QuickAction` (ícone dos atalhos do Feed) — é UI, maior que `lg`; virar `xl`?
  - **14** — `PostCard` (badge de tipo dica/foto/roteiro).
  - **8** — `PostCard` (separador "·" — decorativo, provável não-ícone).
- ❌ **`Avatar` hardcoda** sm **28** · md **44** · lg **64** px (raio **22** no md)
  — candidatos a tokens de tamanho de avatar.
- Provável faltarem outras dimensões (touch targets, header/bottom-nav). Ação:
  catalogar conforme migramos e tokenizar (evitar novos hardcodes).

---

## Spacing · Radii (sem gap conhecido)

- **spacing** — grid 8pt completo (`none…xxxl` + `screenMargin: 20`).
- **radii** — `none/xs/sm/md/lg/xl/xxl/pill` cobrindo os casos vistos.

Manter observação: se uma tela nova precisar de um passo fora dessas escalas,
registrar aqui antes de hardcodar.

---

## Auditoria de hardcode nos primitivos (2026-07)

Varredura de `packages/ui-native/src/primitives` por valores arbitrários
(`text-[..]`, `p-[..]`, `rounded-[..]`, `style={{..}}`, hex/rgba, `size={n}`).

### ✅ Corrigido (usava/vira token existente — sem mudança visual)
- **Avatar · AvatarFallback**: `rounded-[14/22/32px]` (metade do lado = círculo) → **`rounded-pill`**.
- **RoleBadge**: `text-[12px] leading-[16px]` → **`text-badge`** (preset já existente).
- **StatusBanner**: `rounded-[12px]` → **`rounded-lg`** (radii.lg = 12).
- **BottomSheet · ConfirmDialog**: véu `bg-[rgba(0,0,0,0.45)]` → **token novo `colors.scrim`** (`bg-scrim`). ⚠️ TODO(Figma): validar opacidade e reconciliar com o `PublishedModal` do app (`rgba(23,23,23,0.7)`).

### ⚠️ Resta hardcode — precisa de token novo (decisão do designer)
- **Tamanho de avatar** — `w/h-[28/44/64px]` (Avatar/AvatarFallback). Virar `sizes.avatar` (sm/md/lg).
- **Fonte fora da escala** — `text-[17px]` (BottomSheet título), `text-[18px]`/`text-[15px]` (SheetOption), `text-[16px]`/`text-[14px]` (StatusBanner/BottomSheet corpo), `text-[7px]`/`text-[16px]` (AvatarFallback iniciais). Ver seção **Typography** acima (título de sheet 17/18, SheetOption 15, iniciais 7).
- **Spacing/dimensão fora da escala** — `pb-[34px]` (safe-area BottomSheet), grabber `h-[4px] w-[40px]`, `h-[56px]`/`gap-[14px]` (SheetOption), `py-[14px]`/`px-[14px]` (StatusBanner), `pt-[40px]`/spacer `24×24` (ScreenHeader), `p-[2px]` (PhotoGrid), radio `20/12` (RadioOption). Catalogar como `sizes`/`spacing` novos.

### ✔️ Aceitável (não é violação)
- `Textarea` `style={{ minHeight }}` — valor **dinâmico** vindo de prop.
- `SelectField` `style={{ transform: rotate(-90deg) }}` — transform (não é caso de token).
- `Divider` `h-[1px]` — hairline convencional.
