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
- ⚠️ `SearchField` — barra de busca genérica; só o placeholder ("Qual seu destino?") é produto → fica como primitivo, placeholder por prop.
- ⚠️ `CommentInput` — input+enviar genérico; **decidir** (primitivo vs community).

### Organisms (genéricos)
`BottomSheet` · `ConfirmDialog` · `BottomNav`
- ⚠️ `ScreenHeader` — chrome genérico → primitivo (ou `shared` no app).
- ⚠️ `PublishedModal` — modal de sucesso genérico; **decidir** (primitivo vs produto).

## Migra pro app — PRODUTO · Community
`→ zupper-superapp/src/presentation/components/community` (ou `screens/`)

| Camada | Componentes |
|---|---|
| Molecules | AccountGreeting · AccountRow · AccountSection · BlockedAccountRow · CommentThread · ContentAuthor · LikeButton · SocialBar |
| Organisms | CommunityCTA · GreetingHeader · PostCard · ProfileTabs · PersonalDataForm · NotInterestedSheet · ContentRemovedSheet · ContentUnderReviewSheet · DeleteOwnPostSheet · OwnPostActionsSheet · PostActionsSheet · ReportConfirmSheet · ReportReasonsSheet · ReportSentSheet |
| Screens | BlockedAccounts · CommunityProfile · ContentDetail · MyAccount · PersonalData · PublishContent |

## Migra pro app — PRODUTO · Travel
`→ zupper-superapp/src/presentation/components/travel` (ou `screens/`)

| Camada | Componentes |
|---|---|
| Molecules | DestinationCard · QuickAction · OfferCard · PreferenceTile · RoteiroDayCard · RoteiroDayForm |
| Organisms | TravelPreferencesResultCard |
| Screens | DestinationDetails · Destinations · TravelPreferencesResult · TravelPreferencesStep |

## Já migrado
- ✅ **Feed** → `zupper-superapp/screens/home` (renomeada Home; agrega community+travel).

## Como migrar uma peça (recap do padrão)
1. O wrapper no app (`components/<domínio>/<Nome>`) hoje **re-exporta** o DS.
2. Copia a implementação do DS pro app e o wrapper **vira a implementação real**
   (mesmos imports nas telas — ver README de `components/`).
3. Remove a peça do DS (source + story) — como fizemos no Feed.
4. Aplica a **regra de ouro do wrapper** (ADR 0010): API própria, sem passthrough.

> Casos ⚠️ **limítrofes** (RoleBadge, SearchField, CommentInput, PublishedModal):
> decidir com o time antes de migrar. Default: se der pra generalizar sem cheiro
> de Zupper, fica primitivo.
