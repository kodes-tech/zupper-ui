# Mapa de migração — primitivo × produto (`@kodes-tech/ui-native`)

Objetivo (ADR 0009 + [0010](../decisions/0010-primitive-api-and-packaging-conventions.md)):
o `ui-native` deve conter **só primitivos genéricos** (a "cara" reusável por
qualquer projeto). Tudo que é **produto Zupper** (Community/Travel) **migra para o
app** (`zupper-superapp/src/presentation/components/{community,travel}` +
`screens/`), tela a tela.

**Critério:** *é agnóstico e serve a qualquer produto?* → **primitivo** (fica).
Codifica conteúdo/fluxo do Zupper? → **produto** (migra).

Status atual: **~22 primitivos** vs **~39 de produto + 10 screens** → o DS está
majoritariamente produto. Este doc é o roteiro (marcar `[x]` conforme migrar).

## Fica no DS — PRIMITIVOS

### Atoms
| Componente | Nota |
|---|---|
| Avatar · AvatarFallback · Badge · Button · Divider · FilterChip · Input · Text · Textarea | genéricos ✅ |
| Icon | vem do `@kodes-tech/icons` (re-export) |
| **RoleBadge** | ⚠️ limítrofe — hoje é papel Zupper (guest/traveler/partner). Manter como primitivo **generalizando** (variants por consumidor) ou mover p/ community? **decidir** |

### Molecules (genéricas)
`SelectField` · `RadioOption` · `SheetOption` · `StatusBanner` · `PhotoGrid`
- ✅ `SearchField` — era limítrofe; **resolvido como Travel e migrado** pro app.
- ✅ `CommentInput` — era limítrofe; **resolvido como Community e migrado** pro app (removido do DS).
- ✅ `StatusBanner` · `PhotoGrid` — genéricos: **ficam no DS**; o app os consome por wrapper primitivo (`components/primitives/{StatusBanner,PhotoGrid}`).

### Organisms (genéricos)
`BottomSheet` · `ConfirmDialog` · `BottomNav`
- ⚠️ `ScreenHeader` — chrome genérico → primitivo (ou `shared` no app).
- ⚠️ `PublishedModal` — modal de sucesso genérico; **decidir** (primitivo vs produto).

## Migra pro app — PRODUTO · Community
`→ zupper-superapp/src/presentation/components/community` (ou `screens/`)

| Camada | Componentes |
|---|---|
| Molecules | AccountGreeting · AccountRow · AccountSection · BlockedAccountRow · CommentThread · ContentAuthor |
| Organisms | CommunityCTA · GreetingHeader · PersonalDataForm · NotInterestedSheet · ContentRemovedSheet · ContentUnderReviewSheet · DeleteOwnPostSheet · OwnPostActionsSheet · PostActionsSheet · ReportConfirmSheet · ReportReasonsSheet · ReportSentSheet |
| Screens | BlockedAccounts · CommunityProfile · ContentDetail · MyAccount · PersonalData · PublishContent |

## Migra pro app — PRODUTO · Travel
`→ zupper-superapp/src/presentation/components/travel` (ou `screens/`)

| Camada | Componentes |
|---|---|
| Molecules | PreferenceTile · RoteiroDayCard · RoteiroDayForm |
| Organisms | TravelPreferencesResultCard |
| Screens | TravelPreferencesResult · TravelPreferencesStep |

## Já migrado
- ✅ **Feed** → `zupper-superapp/screens/home` (renomeada Home; agrega community+travel).
- ✅ **Destinations** (screen) → `zupper-superapp/screens/destinations`.
- ✅ **DestinationCard · QuickAction · SearchField** (Travel) → `zupper-superapp/components/travel` (impl real; removidos do DS). `SearchField` era limítrofe (primitivo?) — resolvido como Travel.
- ✅ **PostCard · SocialBar · LikeButton** (Community) → `zupper-superapp/components/community` (impl real). **Removidos do DS** (ver TravelPreferencesResult abaixo — fechou a opção B).
- ✅ **DestinationDetails** (screen) → `zupper-superapp/screens/destination-details` (top-level; agrega Travel+Community). Removida do DS.
- ✅ **OfferCard** (Travel) + **ProfileTabs** (Community) → app (impl real). **Removidos do DS.**
- ✅ **Primitivo `Image`** criado no app (`components/primitives/Image`, embrulha o RN Image) + boundary do ESLint agora restringe `Image` do react-native fora de `components/`.
- ✅ **ContentDetail** (screen) → `zupper-superapp/screens/content-detail` (top-level; agrega Community + Travel). **Removida do DS.** Componentes exclusivos dela **removidos do DS** (nenhum outro consumidor): **OfferCard · SocialBar · CommentInput · CommentThread · ContentAuthor** (impl real no app: `community/{CommentInput,CommentThread,ContentAuthor,SocialBar}`, `travel/OfferCard`). `ContentAuthor` ganhou `onPress` no app (toca autor → perfil).
- ✅ **CommunityProfile** (screen) → `zupper-superapp/screens/community-profile` (top-level). Impl real no app. **Removida do DS.**
- ✅ **RoteiroDayCard** (Travel) → `zupper-superapp/components/travel` (impl real). **Removido do DS** (com a migração do PublishContent).
- ✅ **Wrappers primitivos `StatusBanner` · `PhotoGrid`** criados no app (`components/primitives`, re-exportam o DS) — genéricos, **ficam no DS**.
- ✅ **PublishedModal** (Community) → `zupper-superapp/components/community` (impl real). **Removido do DS.** Restaura as stories "…Publicada" da CommunityProfile no app.
- ✅ **TravelPreferencesResult** (screen) + **TravelPreferencesResultCard** (Travel) → app (`screens/travel-preferences-result` + `components/travel`). **Removidos do DS.** Isso **fechou a opção B do cluster Community**: com o Result fora do DS, `CommunityProfile` (e com ela `PostCard` · `ProfileTabs` · `LikeButton` · `PublishedModal`) saíram do DS. ⚠️ Sem rota no app ainda — só apresentacional + story.
- ✅ **TravelPreferencesStep** (screen) + **PreferenceTile** (Travel) → app (`screens/travel-preferences-step` + `components/travel`). **Removidos do DS.** Fecha o cluster **Travel Preferences** (Step+Result fora do DS). ⚠️ Sem rota no app ainda — só apresentacional + 10 stories (tiles mockados por picsum; assets reais do `_figma` entram se/quando o fluxo for ligado).
- ✅ **PublishContent** (screen) → `zupper-superapp/screens/publish-content` (top-level, modal). **Impl real + wiring** (rota `PublishContent` recebe `{ type }`; CTA da Home e FAB da CommunityProfile passam o tipo). Componentes: **RoteiroDayForm** (Travel) migrado e **removido do DS**; **RoteiroDayCard** removido do DS (app já tinha); **SelectField** vira **wrapper primitivo** (`components/primitives`, re-exporta o DS — genérico, fica no DS). 5 stories (Foto/FotoVazio/Dica/Roteiro/RoteiroAdicionarDia).
- ✅ **MyAccount** (screen) → `zupper-superapp/screens/account/my-account` (root da tab Conta). **Impl real + wiring** (substitui o placeholder). Componentes **AccountGreeting · AccountRow · AccountSection** (Community) migrados e **removidos do DS**. 4 stories (LogadoViajante/LogadoSemViagem/LogadoParceiro/Deslogado).
- ✅ **BlockedAccounts** + **PersonalData** (screens) → `zupper-superapp/screens/account/{blocked-accounts,personal-data}`. **Impl real + wiring** (rotas no AccountStack; abertas pelas linhas do MyAccount). Componentes **BlockedAccountRow** e **PersonalDataForm** (Community) migrados e **removidos do DS**. **RadioOption** vira wrapper primitivo (fica no DS). Isso **zerou o `screens/` do DS** (removido) — o package não tem mais telas (ADR 0009).

## Estado final do DS (só primitivos)
O `ui-native` não tem mais `screens/`. Restam:
- **atoms**: Avatar · AvatarFallback · Badge · Button · Divider · FilterChip · Icon · Input · RoleBadge · Text · Textarea
- **molecules**: PhotoGrid · RadioOption · SelectField · SheetOption · StatusBanner
- **organisms**: BottomNav · BottomSheet · ConfirmDialog · ScreenHeader · **CommunityCTA** · **GreetingHeader**
> ⚠️ **CommunityCTA** e **GreetingHeader** ainda são **produto (Community)** — hoje só o app os consome (via wrapper re-export). São os **2 últimos** a virar impl real no app para o DS ficar 100% primitivo.
- ✅ **Sheets de moderação** (`PostActionsSheet` · `OwnPostActionsSheet` · `ReportConfirmSheet` · `ReportReasonsSheet` · `ReportSentSheet` · `NotInterestedSheet` · `DeleteOwnPostSheet` · `ContentUnderReviewSheet` · `ContentRemovedSheet`) → `zupper-superapp/components/community` (impl real). **Removidos do DS** (só o barril os consumia após a ContentDetail sair). Restaura as 9 stories de overlay da `ContentDetail` no app (agora 14, = DS).
- ✅ **Wrappers primitivos `BottomSheet` · `ConfirmDialog` · `SheetOption`** criados no app (`components/primitives`, re-exportam o DS) — genéricos, **ficam no DS** (são a base dos sheets).

## Como migrar uma peça (recap do padrão)
1. O wrapper no app (`components/<domínio>/<Nome>`) hoje **re-exporta** o DS.
2. Copia a implementação do DS pro app e o wrapper **vira a implementação real**
   (mesmos imports nas telas — ver README de `components/`).
3. Remove a peça do DS (source + story) — como fizemos no Feed.
4. Aplica a **regra de ouro do wrapper** (ADR 0010): API própria, sem passthrough.

> Casos ⚠️ **limítrofes** (RoleBadge, CommentInput, PublishedModal):
> decidir com o time antes de migrar. Default: se der pra generalizar sem cheiro
> de Zupper, fica primitivo.
