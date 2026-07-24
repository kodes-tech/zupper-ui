# Known Issues

## Repo ainda PÚBLICO
`kodes-tech/zupper-ui` está **público**. A troca para privado está bloqueada por
política da org (só **owner** muda visibilidade) — HTTP 422 para não-owners. Ação:
um owner troca em Settings → Danger Zone, ou habilita "members can change visibility".
Nada sensível foi commitado, mas privar antes de crescer.

## Install exige `--legacy-peer-deps`
`react-native-web@0.19` declara peer `react@^18` e o repo usa React 19 → `npm install`
puro falha com ERESOLVE. Usar **`npm install --legacy-peer-deps`** (documentado no
README). Revisitar quando o react-native-web suportar React 19.

## Storybook 8: compilador + CSS + cache (validado, com gotchas)
Storybook 8.6 + React 19 + react-native-web **funciona**, mas: (1) o SB8 **não traz
compilador** para o código do projeto — o TS/TSX compila via regra explícita de
`babel-loader` no `webpackFinal` de `.storybook/main.ts` (usa o `babel.config.js` do
pacote, com `nativewind/babel`); (2) o `global.css` (Tailwind) é processado por uma
regra com `postcss-loader` que **substitui** a regra implícita de CSS do SB (senão o
arquivo é processado 2× e quebra); (3) após mexer em babel/webpack, **limpar
`node_modules/.cache`** — cache envenenado reproduz o erro antigo mesmo com config
correta.

## `bob build` vs `babel.config.js`
Validado: o bob **ignora** o `babel.config.js` do pacote (usa preset próprio) e
conviveu bem com o config env-aware que serve jest+Storybook. Se uma versão futura
do bob passar a reclamar, isolar um babel dedicado (ex.: `babel.config.bob.js`).

## Tokens são placeholder
`packages/tokens/src` tem valores **provisórios** (`TODO(Figma)`). Substituir pelos do
Figma do Community antes de considerar o design "pronto".

## Caminhos do build — resolvido
Confirmado no 1º build: o bob emite `lib/typescript/index.d.ts` (sem o prefixo `src/`);
o campo `types` do `@zupper/ui-native` já foi ajustado. Reconferir apenas se a versão
do bob mudar.

## Token novo não aparece no Storybook sem rebuildar os tokens
O `tailwind.config.js` do ui-native lê o preset do **build** dos tokens
(`require('@zupper/tokens/tailwind')` → `lib/`), não do source. Token novo sem
`npm run build -w @zupper/tokens` = classe ausente do CSS gerado — e a falha é
**silenciosa** (ex.: `border-feedback-danger` faltando fez a borda cair no fallback
`black` do react-native-web). Após o build, **reiniciar o Storybook**: o processo
mantém o build antigo no cache de `require()` do Node.

## NativeWind precisa do pipeline do app consumidor
Os componentes publicam `className` como **string crua** — sem o setup NativeWind no
app (babel + metro + tailwind com `content` incluindo `@zupper/ui-native`), renderizam
**sem estilo**. Guia com diffs prontos: `docs/nativewind-zupper-app.md`. Risco residual:
NativeWind 4.x foi construído sobre reanimated 3 e o zupper-app usa reanimated 4 —
validado no harness deste repo, **falta validar em device** no app.

## Theming — valores + preview prontos; ativação remota é do app
`@kodes-tech/tokens` já expõe **temas** (`themes`, `getTheme()`, `themeVars`) e gera
`@kodes-tech/tokens/theme.css` (CSS variables). O preset resolve `rgb(var(--color-…))` e o
Storybook tem toggle de tema (`default`/`dark`). O tema **dark é provisório** (`TODO(Figma)`).
A **ativação por flag remota** (ADR 0005) e o `ThemeProvider` de runtime seguem sendo do
**app consumidor** — não implementados aqui.

Gotchas do theming:
- **`ThemeProvider` é o mecanismo de runtime.** `@kodes-tech/ui-native` exporta
  `ThemeProvider`/`useTheme`. O provider aplica `vars(themeVars[theme])` na subárvore
  (web + native) e expõe `useTheme().colors` para os pontos que leem cor em JS (gradientes
  de Button/RoleBadge; `selectionColor` de Input/Textarea) — que **não** acompanham a
  cascata das classes. Providers aninhados criam "ilhas" (ex.: ConfirmDialog claro no dark).
- **`vars()` puxa `react-native-css-interop`, que tem JSX cru em `.js`.** No Storybook
  (webpack) isso exige transpilar esse pacote — há uma regra em `.storybook/main.ts` que faz
  isso (senão o build quebra com "Module parse failed" em `doctor.js`).
- **Baseline nativo obrigatório.** No web o `:root` do `theme.css` dá o valor padrão das
  `--color-*`; no native (Metro) NÃO existe `:root`. Se nenhum `ThemeProvider` ancestral
  injetou as vars, as cores por classe (`bg-surface-default`…) ficam **indefinidas** (preto/
  transparente), não caem no `default`. Por isso o `global.css` `@importa @kodes-tech/tokens/theme.css`
  (baseline) e o app deve fazer o mesmo + montar um `ThemeProvider` na raiz — ver
  `docs/nativewind-zupper-app.md` §3 e §7. (No web o Storybook mascara isso via `:root`.)
- **`theme.css` sai do build dos tokens.** Mexeu em `colors`/`themes.ts`/`tailwind.ts`?
  `npm run build -w @kodes-tech/tokens` regenera o CSS + o preset; sem isso o Storybook usa
  o build antigo (mesma armadilha de require-cache abaixo). Depois, **reiniciar o Storybook**
  e, se preciso, limpar `node_modules/.cache`.
- `scrim` segue literal no preset (não-temável por ora).
