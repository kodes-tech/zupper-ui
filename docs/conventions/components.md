# Convenção — Componentes

## Camada única `primitives/` (sem Atomic Design)

O pacote publica **só primitivos genéricos** (ADR 0009). Não há mais
`atoms/molecules/organisms` nem `screens/` — a hierarquia Atomic não agrega valor
quando tudo é primitivo. Produto Zupper e telas vivem no **app consumidor**
(`zupper-superapp`), não aqui.

```
src/
├── primitives/  # TODOS os componentes, numa camada só: Button, Text, Input, BottomSheet…
├── foundations/ # specimens de tokens no Storybook (Colors, Spacing, Radii…)
├── _figma/      # SÓ referência do Figma Dev Mode (não roda, excluído de build/lint/pacote)
└── index.ts     # export * from './primitives'
```

**Critério pra existir aqui:** *é agnóstico e serve a qualquer produto?* → primitivo
(entra). Codifica conteúdo/fluxo do Zupper (Travel/Community)? → **é produto, vai pro
app**, não pro `ui-native`. Ver `docs/migration/primitive-vs-product.md`.

> ⚠️ `src/_figma/` é referência exportada do Figma (consulta), excluída de tudo.

## Cada componente = 4 arquivos

```
primitives/<Nome>/
├── <Nome>.tsx          # o componente
├── <Nome>.stories.tsx  # Storybook (título "Primitives/<Nome>")
├── <Nome>.spec.tsx     # teste (@testing-library/react-native)
└── index.ts            # export * from './<Nome>'
```
E exportar no `primitives/index.ts`.

## Regras (obrigatórias)

0. **Antes de criar, confirme que não existe** — abra o Storybook (é o inventário) ou
   dê um `grep` no barrel `src/primitives/index.ts`. O design system é **fonte única**:
   se existe, **reusar**, nunca recriar. E confirme que é **primitivo** (agnóstico) —
   se for produto Zupper, vai pro app, não pro `ui-native`. Não componentize a partir
   de `src/_figma/` (é só referência).
1. **Apresentacional puro** — só props. **Nenhuma chamada de API**, nenhum acesso a
   store/navegação. Estado de dados entra por props (`author`, `likes`, `onLike`).
2. **Estilo com `className` (NativeWind) + tokens** — classes do preset
   `@zupper/tokens/tailwind` (ver ADR 0006). É a **única** abordagem de estilo —
   sem styled-components (ver ADR 0007). **Proibido hardcode** de
   cor/spacing/fonte/radius. Errado: `style={{ padding: 16 }}` ou `p-[16px]`.
   Certo: `className="p-md"`.
3. **Tipar as props** — `export type <Nome>Props = {...}`. Callbacks nomeados por
   intenção (`onLike`, `onPressAuthor`).
4. **Isolamento** — não importar de `@zupper/app-ui`. Só de `@zupper/tokens` e libs neutras.
5. **Acessibilidade** — `accessibilityRole`/`accessibilityLabel` em elementos interativos.
6. **Strings** — texto fixo em PT-BR; texto variável sempre por prop.
7. **Stories instrumentam os callbacks** — todo prop de interação (`on*`:
   `onPress`, `onChangeText`, `onLike`…) recebe `action('<nome>')` do
   `@storybook/addon-actions`, de preferência no `meta` (default export) pra valer
   em todas as stories. Assim o painel **Actions** loga a interação ao vivo no
   preview. O SB8 removeu o auto-actions por `argTypesRegex` — tem que declarar.
   Componentes display-only (sem `on*`) não precisam.

   ```tsx
   import { action } from '@storybook/addon-actions';
   export default {
     title: 'Primitives/Button',
     component: Button,
     args: { onPress: action('onPress') },
   };
   ```

> **Telas e produto não moram aqui.** O `ui-native` não tem `screens/`. Telas e
> componentes de produto (Travel/Community) vivem no app consumidor
> (`zupper-superapp/src/presentation/{screens,components}`). Ver ADR 0009 e
> `docs/migration/primitive-vs-product.md`.

## Exemplo de referência

Ver `packages/ui-native/src/primitives/Badge/` — é o molde (component + story + spec + index).

## Checklist de PR de um componente novo
- [ ] É primitivo (agnóstico de produto) e exportado em `primitives/index.ts`.
- [ ] Usa tokens (zero hardcode).
- [ ] Sem chamada de API / navegação / store.
- [ ] Tem `.stories.tsx` (todos os estados/variações) e `.spec.tsx` (render + interação).
- [ ] Stories instrumentam os callbacks `on*` com `action()` (painel Actions).
- [ ] Props tipadas; acessibilidade nos interativos.
