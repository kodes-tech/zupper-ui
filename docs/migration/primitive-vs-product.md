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
- ✅ **PostCard · SocialBar · LikeButton** (Community) → `zupper-superapp/components/community` (impl real). ⚠️ **Cópias MANTIDAS no DS** (opção B) porque `ContentDetail`/`CommunityProfile` (ainda no DS) as usam.
- ✅ **DestinationDetails** (screen) → `zupper-superapp/screens/destination-details` (top-level; agrega Travel+Community). Removida do DS.
- ✅ **OfferCard** (Travel) + **ProfileTabs** (Community) → app (impl real).
- ✅ **Primitivo `Image`** criado no app (`components/primitives/Image`, embrulha o RN Image) + boundary do ESLint agora restringe `Image` do react-native fora de `components/`.
- ✅ **ContentDetail** (screen) → `zupper-superapp/screens/content-detail` (top-level; agrega Community + Travel). **Removida do DS.** Componentes exclusivos dela **removidos do DS** (nenhum outro consumidor): **OfferCard · SocialBar · CommentInput · CommentThread · ContentAuthor** (impl real no app: `community/{CommentInput,CommentThread,ContentAuthor,SocialBar}`, `travel/OfferCard`). `ContentAuthor` ganhou `onPress` no app (toca autor → perfil).
- ✅ **CommunityProfile** (screen) → `zupper-superapp/screens/community-profile` (top-level). Impl real no app. ⚠️ **Cópia MANTIDA no DS** (opção B): a tela **`TravelPreferencesResult` (DS, ainda não migrada) a compõe** via slot `overlay`. Por isso **`PostCard` · `ProfileTabs` · `LikeButton` também seguem no DS** (deps da CommunityProfile) — saem quando `TravelPreferencesResult`/`Step` migrarem.
- ✅ **RoteiroDayCard** (Travel) → `zupper-superapp/components/travel` (impl real). ⚠️ **Cópia MANTIDA no DS** (opção B): `PublishContent` (DS) ainda usa.
- ✅ **Wrappers primitivos `StatusBanner` · `PhotoGrid`** criados no app (`components/primitives`, re-exportam o DS) — genéricos, **ficam no DS**.

## Como migrar uma peça (recap do padrão)
1. O wrapper no app (`components/<domínio>/<Nome>`) hoje **re-exporta** o DS.
2. Copia a implementação do DS pro app e o wrapper **vira a implementação real**
   (mesmos imports nas telas — ver README de `components/`).
3. Remove a peça do DS (source + story) — como fizemos no Feed.
4. Aplica a **regra de ouro do wrapper** (ADR 0010): API própria, sem passthrough.

> Casos ⚠️ **limítrofes** (RoleBadge, CommentInput, PublishedModal):
> decidir com o time antes de migrar. Default: se der pra generalizar sem cheiro
> de Zupper, fica primitivo.
