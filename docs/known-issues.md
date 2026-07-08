# Known Issues

## Repo ainda PÚBLICO
`kodes-tech/zupper-ui` está **público**. A troca para privado está bloqueada por
política da org (só **owner** muda visibilidade) — HTTP 422 para não-owners. Ação:
um owner troca em Settings → Danger Zone, ou habilita "members can change visibility".
Nada sensível foi commitado, mas privar antes de crescer.

## Storybook (React 19 + react-native-web) não validado
O app é **RN 0.83 / React 19** (recente). A combinação **React 19 + react-native-web +
Storybook 8** pode exigir **ajuste de versão** no primeiro `npm install`. O **jest** é a
parte estável; o **Storybook** é o ponto de atenção. Se travar, ajustar versões de
`react-native-web`/`react-dom`/Storybook.

## `bob build` vs `babel.config.js`
O `react-native-builder-bob` tem preset próprio. Se o `npm run build -w @zupper/ui-native`
reclamar do `babel.config.js` (que serve jest+Storybook), isolar um babel dedicado ao bob
(ex.: `babel.config.bob.js`) ou usar `babelrc: false` no target.

## Tokens são placeholder
`packages/tokens/src` tem valores **provisórios** (`TODO(Figma)`). Substituir pelos do
Figma do Community antes de considerar o design "pronto".

## Caminhos do build a confirmar
Após o 1º build, conferir se `main`/`module`/`types` do `@zupper/ui-native` batem com a
saída real do bob (varia por versão).

## Theming ainda não implementado
`@zupper/tokens` exporta um objeto único; o modelo de **temas + `getTheme()` + flag remota**
(ADR 0005) ainda não foi implementado.
