# Storybook e revisão de PRs (`zupper-ui`)

Repo: `github.com/kodes-tech/zupper-ui` (monorepo). O design system completo está na branch **`develop`**
(a `main` é só scaffold). Se o `gh` (GitHub CLI) não estiver disponível, use a API do GitHub via `curl`.

## Clonar e rodar o Storybook
```bash
git clone https://github.com/kodes-tech/zupper-ui.git   # ou git -C <repo> pull --ff-only origin develop
cd zupper-ui
git checkout develop
npm install --legacy-peer-deps --ignore-scripts          # ver notas abaixo
# build dos tokens (o ui-native consome @kodes-tech/tokens):
node node_modules/typescript/lib/tsc.js -p packages/tokens/tsconfig.json
cd packages/ui-native
CI=1 npx storybook dev -p 6006 --no-open                 # rode em background
```
Confirme "Storybook ... started" e **0 erros de compilação** no log antes de abrir o browser.

### Por que essas flags
- `--legacy-peer-deps`: `react-native-web` pede React 18, o repo usa React 19 (conflito de peer dep).
- `--ignore-scripts`: os scripts `prepare` rodam builds (`bob build`, `tsc`) que, se falharem,
  disparam **rollback** do `npm install`, que pode deixar `node_modules` inconsistente (em Windows chega
  a esvaziá-lo com `EPERM`).
  Por isso instalamos sem scripts e buildamos os tokens manualmente.
- Storybook 8 (`react-webpack5`) **não traz compilador embutido**; a `develop` já configura babel-loader
  + PostCSS/NativeWind no `.storybook/main.ts`. Se aparecer "Unexpected token" em `import type`, é a
  falta desse compiler (na `develop` já está resolvido).
- Aviso não-fatal `Can't resolve '@storybook/test'` pode aparecer — ignore (peer interno).

## Revisar PRs (sem `gh`)
```bash
# listar PRs abertas
curl -s "https://api.github.com/repos/kodes-tech/zupper-ui/pulls?state=open&per_page=30"
# arquivos/stories de uma PR
curl -s "https://api.github.com/repos/kodes-tech/zupper-ui/pulls/<N>/files?per_page=100"
```
Para cada PR, extraia: stories (`*.stories.tsx`) e componentes por camada
(`src/{atoms|molecules|organisms|screens}/...`), tamanho (adições/remoções), base/head.
Reporte: o que a PR adiciona, **ordem de merge** (branches empilhadas — confira `base` ≠ `develop`),
e **risco de conflito** (várias PRs tocam `atoms/Icon`, os `index.ts` barrels e componentes
compartilhados como `Button`/`Input`/`BottomNav`).

## Verificar se o Storybook de cada PR compila — jeito CERTO
Faça **build limpo por branch**, isolado. **Não** alterne branches num `storybook dev` já rodando.
```bash
git checkout -f <branch-da-PR>
node node_modules/typescript/lib/tsc.js -p packages/tokens/tsconfig.json
( cd packages/ui-native && npx storybook build -o <saída-temporária>/<N> )   # exit 0 = OK
```
Para muitas PRs, rode num laço em **background** e agregue os resultados num arquivo.

### ⚠️ Armadilha (já custou uma rodada inteira)
Reaproveitar um servidor `storybook dev` "quente" e ir dando `git checkout` de branch em branch
**gera falsos negativos**: o watcher do webpack não registra os SVGs novos adicionados pela branch,
e o build acusa `Module not found: Can't resolve './AlgumIcone'`. Num checkout limpo o barrel de
ícones é consistente. Se ver esse tipo de erro após branch-switching, **descarte** e re-verifique
com build limpo. Sintomas do falso negativo: erros só de "Can't resolve './XxxIcon'", inconsistentes
entre branches (algumas passam no meio do ciclo).

## Deixar uma PR no ar para o usuário navegar
`git checkout -f <branch>` → build tokens → `storybook dev`. Só um servidor por vez; se a 6006
estiver presa por um processo anterior, o Storybook sobe sozinho na 6007. Ao terminar, ofereça
encerrar o servidor.
