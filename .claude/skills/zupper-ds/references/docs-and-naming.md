# Manutenção dos documentos e nomenclatura

Dois documentos acompanham o projeto (na pasta de trabalho; podem estar fora do repo — localize-os
pelo nome) e precisam refletir sempre o estado real do Figma + código:

- **`PRD-Comunidade-Zupper.md`** — produto. Seções: 1 contexto · 2 régua de permissão (3 perfis) ·
  3 navegação (bottom nav: Início/Reservar/Pedidos/Conta) · 4 arquivos Figma · 5 telas por bloco ·
  6 componentes-chave · 7 tokens · 8 decisões fechadas · 9 lacunas HD · 10 épicos (KSA-13) · 11 Jira.
- **`DS-Comunidade-Zupper-Tokens-e-Componentes.md`** — design system. Seções: 1 cores · 2 tipografia ·
  3 spacing/raio/sombra/gradientes · 4 inventário de componentes (com IDs) · 5 dívida de tokenização ·
  6 divergências vs PRD · 7 índice rápido de IDs.

## Regras de atualização
- **Versão + data:** ao editar, bump o cabeçalho (ex.: PRD v4, DS doc v3) com uma linha
  `_Atualização vX (DD/mmm/AAAA): ..._` resumindo o que mudou. Converta datas relativas em absolutas.
- **Sincronize os dois** quando algo mudar no Figma. Ex.: ao renomear componentes, atualize o
  inventário (DS seção 4), o índice de IDs (DS seção 7) e as menções no PRD (seção 6).
- **Decisões viram itens numerados** na seção 8 do PRD; lacunas mudam de status na seção 9.
- **Não duplique** o que o código já registra; o DS doc e o Figma mandam em caso de divergência.

## Nomenclatura (Figma ↔ código)
- Figma: **kebab-case**. Código (Storybook): **PascalCase**. Ambos por **Atomic Design**.
- O nome-base deve casar 1:1 para o Code Connect ser trivial: `post-card` ↔ `PostCard`,
  `select-field` ↔ `SelectField`, `role-badge` ↔ `RoleBadge`, `filter-chip` ↔ `FilterChip`,
  `quick-action` ↔ `QuickAction`, `bottom-nav` ↔ `BottomNav`, `community-cta` ↔ `CommunityCTA`,
  `greeting-header` ↔ `GreetingHeader`, `offer-card` ↔ `OfferCard`, `roteiro-card` ↔ `RoteiroDayCard`.
- **O princípio "alinhar Figma ao código" só vale se o nome do código estiver correto.** Ex.: as
  abas de conteúdo são `content-tabs` no Figma, mas `ProfileTabs` no código — nesse caso a recomendação
  é corrigir o **código** (para `ContentTabs`), não propagar o nome errado.
- Ao replicar mudança de nomenclatura em prosa, cuidado com falso-amigo/substring: use scripts com
  substituições ancoradas (proteja termos como `card-roteiro-reduzido`, `card-bem-vindo` legado) e
  verifique com grep depois (0 nomes antigos remanescentes; conceito "CTA" maiúsculo intacto).

## Escrever descrições de componente
Ao documentar "como usar" (no campo `description` do componente no Figma e/ou no DS doc), use o padrão:
*o que é · QUANDO USAR · VARIANTE(s) · ANATOMIA/REGRAS · ESTILO (tokens) · CÓDIGO (nome no Storybook) ·
NÃO fazer*. Embuta a régua de permissão, a coerência entre variantes (ex.: `post-card` ↔ `tag-content`),
as dívidas conhecidas e as divergências Figma↔código que existirem naquele componente.
