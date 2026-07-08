# Known Issues

## Repo ainda PÚBLICO
`kodes-tech/zupper-ui` está **público**. A troca para privado está bloqueada por
política da org (só **owner** muda visibilidade) — HTTP 422 para não-owners. Ação:
um owner troca em Settings → Danger Zone, ou habilita "members can change visibility".
Nada sensível foi commitado, mas privar antes de crescer.

## Install — resolvido via `overrides` (não precisa mais de `--legacy-peer-deps`)
`react-native-web@0.19` declara peer `react@^18`/`react-dom@^18` e o repo usa React 19;
`ajv-keywords` (usado pelo `babel-loader`/Storybook) precisa de `ajv@^8`, mas o `eslint@9`
fixa `ajv@6` na raiz e o npm hospeda essa versão, quebrando `storybook dev`/`build-storybook`
com `Cannot find module 'ajv/dist/compile/codegen'`. Os dois estão resolvidos via
`overrides` no `package.json` raiz (força `react-native-web` a aceitar o React 19 já
instalado; força o `ajv` do `ajv-keywords` para `^8`, sem tocar no `ajv@6` que o próprio
ESLint usa). `npm install` puro (sem `--legacy-peer-deps`) volta a funcionar.

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

## NativeWind precisa do pipeline do app consumidor
Os componentes publicam `className` como **string crua** — sem o setup NativeWind no
app (babel + metro + tailwind com `content` incluindo `@zupper/ui-native`), renderizam
**sem estilo**. Guia com diffs prontos: `docs/nativewind-zupper-app.md`. Risco residual:
NativeWind 4.x foi construído sobre reanimated 3 e o zupper-app usa reanimated 4 —
validado no harness deste repo, **falta validar em device** no app.

## Theming ainda não implementado
`@zupper/tokens` exporta um objeto único; o modelo de **temas + `getTheme()` + flag remota**
(ADR 0005) ainda não foi implementado.
