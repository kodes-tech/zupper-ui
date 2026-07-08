# Convenção — Componentes

## Atomic Design (igual ao `@zupper/app-ui`)

```
src/
├── atoms/       # blocos básicos, leaf: Badge, Text, Icon, Button
├── molecules/   # combinações de atoms: LikeButton (icon+count), CommentInput, Avatar+nome
├── organisms/   # compostos/complexos: PostCard, Comment, FeedItem
└── index.ts     # export * from atoms/molecules/organisms
```

Decida o nível pela composição: usa só primitivos → **atom**; combina atoms →
**molecule**; bloco de tela completo → **organism**.

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

## Exemplo de referência

Ver `packages/ui-native/src/atoms/Badge/` — é o molde (component + story + spec + index).

## Checklist de PR de um componente novo
- [ ] Nível correto (atom/molecule/organism) e exportado no barrel.
- [ ] Usa tokens (zero hardcode).
- [ ] Sem chamada de API / navegação / store.
- [ ] Tem `.stories.tsx` (todos os estados/variações) e `.spec.tsx` (render + interação).
- [ ] Props tipadas; acessibilidade nos interativos.
