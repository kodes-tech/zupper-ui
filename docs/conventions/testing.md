# Convenção — Testes & Storybook

## Ferramentas
- **`@zupper/ui-native`**: jest (preset `react-native`) + **@testing-library/react-native**.
- **`@zupper/tokens`**: jest + **ts-jest** (node) — testa os valores/estrutura.
- **Storybook** (web via `react-native-web`) no `ui-native` — desenvolver e revisar
  componentes **sem simulador e sem backend**.

## Regras
1. **Todo componente ship com `.spec.tsx`** ao lado do `.tsx`. Sem teste = não entra.
2. **Todo componente ship com `.stories.tsx`** — cobrindo os estados/variações (default,
   loading, erro, cada `tone`/variante).
3. Testes são **de comportamento** (render + interação via testing-library), não de
   implementação. Ex.: "renderiza o label", "chama `onLike` ao tocar".
4. **Não mockar o componente sob teste** — mocke só dependências externas.
5. Nomear: `<Nome>.spec.tsx`, colocado na pasta do componente.

## Rodar
```bash
npm test -w @zupper/ui-native      # componentes RN
npm test -w @zupper/tokens         # tokens
npm run storybook -w @zupper/ui-native
```

## Exemplos de referência
- Componente: `packages/ui-native/src/atoms/Badge/Badge.spec.tsx`
- Tokens: `packages/tokens/src/tokens.spec.ts`

## Nota (validação pendente)
O harness foi escrito mas **ainda não foi rodado com `npm install`** — o jest é a parte
estável; o Storybook (React 19 + react-native-web) pode pedir ajuste de versão no
primeiro install. Ver `../known-issues.md`.
