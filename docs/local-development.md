# Desenvolvimento local

## Setup
```bash
git clone https://github.com/kodes-tech/zupper-ui.git
cd zupper-ui
npm install          # instala tudo e linka os pacotes entre si (workspaces)
```

## Rodar
```bash
npm run storybook -w @zupper/ui-native   # preview no navegador (react-native-web)
npm test -w @zupper/ui-native            # testes RN
npm test -w @zupper/tokens               # testes dos tokens
npm run build                            # builda todos os pacotes
npm run typecheck                        # checagem de tipos
```

## Consumir no Zupper App durante o dev (sem publicar)
Use **yalc** para iterar rápido — o app usa a versão local; só publique no npm
versões estáveis.
```bash
# no zupper-ui
npx yalc publish            # publica localmente
# no zupper-app
npx yalc add @zupper/ui-native && npm install
# a cada mudança no zupper-ui:
npx yalc push
```

## Fluxo de um componente novo (com Figma)
1. Preencher/atualizar os **tokens** do Figma (`packages/tokens/src`, ver `TODO(Figma)`).
2. Criar o componente no nível certo (`atoms`/`molecules`/`organisms`) — 4 arquivos.
3. `npm run storybook` → ver, revisar com o designer, iterar.
4. Escrever o `.spec.tsx` → `npm test`.
5. Exportar no barrel do nível.

## Requisitos
- Node ≥ 18. Package manager: **npm** (workspaces).
- Não precisa de VPN nem backend — o repo é 100% isolado (preview via Storybook).
