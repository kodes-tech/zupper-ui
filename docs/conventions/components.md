# Convenção — Componentes

## Atomic Design (igual ao `@zupper/app-ui`)

```
src/
├── atoms/       # blocos básicos, leaf: Badge, Text, Icon, Button
├── molecules/   # combinações de atoms: LikeButton (icon+count), CommentInput, Avatar+nome
├── organisms/   # compostos/complexos: PostCard, Comment, FeedItem
├── screens/     # telas mockadas (nível template/page): compõem organisms — o "menu" do Storybook
├── _figma/      # SÓ referência do Figma Dev Mode (não roda, excluído de build/lint/pacote)
└── index.ts     # export * from atoms/molecules/organisms/screens
```

Decida o nível pela composição: usa só primitivos → **atom**; combina atoms →
**molecule**; bloco de tela completo → **organism**; tela inteira (compõe organisms) →
**screen**.

> ⚠️ `src/_figma/` **não é** o nível "template" do Atomic Design — é referência
> exportada do Figma (consulta), excluída de tudo. A "tela" real é `screens/`.

## Cada componente = 4 arquivos

```
<nivel>/<Nome>/
├── <Nome>.tsx          # o componente
├── <Nome>.stories.tsx  # Storybook (título "Atoms/…", "Molecules/…", "Organisms/…")
├── <Nome>.spec.tsx     # teste (@testing-library/react-native)
└── index.ts            # export * from './<Nome>'
```
E exportar no `index.ts` do nível.

## Regras (obrigatórias)

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
     title: 'Atoms/Button',
     component: Button,
     args: { onPress: action('onPress') },
   };
   ```

## Screens (telas mockadas)

Telas vivem em `src/screens/<Nome>/` e são o **"menu" navegável do Storybook** — dá
pra revisar o fluxo inteiro sem app e sem emulador.

- **Compõem organisms**; dados de exemplo entram **por props** (mock no story), nunca
  hardcoded dentro da tela.
- **Apresentacional** como qualquer componente: sem API, navegação ou store (isso é do
  app; Clean Architecture mora no zupper-app, não aqui).
- Título do story em `Screens/<Nome>`.
- **Cobrir todos os estados** em stories separadas: `default`, `loading`, `empty`,
  `error`, `success` (e outros relevantes). É o que valida a UI antes de plugar dados reais.
- A referência de layout vem de `src/_figma/` (export do Figma) — a tela é a versão
  componentizada com tokens.

## Exemplo de referência

Ver `packages/ui-native/src/atoms/Badge/` — é o molde (component + story + spec + index).

## Checklist de PR de um componente novo
- [ ] Nível correto (atom/molecule/organism) e exportado no barrel.
- [ ] Usa tokens (zero hardcode).
- [ ] Sem chamada de API / navegação / store.
- [ ] Tem `.stories.tsx` (todos os estados/variações) e `.spec.tsx` (render + interação).
- [ ] Stories instrumentam os callbacks `on*` com `action()` (painel Actions).
- [ ] Props tipadas; acessibilidade nos interativos.
