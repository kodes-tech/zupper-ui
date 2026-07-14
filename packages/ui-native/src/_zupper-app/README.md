# _zupper-app/

Referência extraída **direto do código do Zupper App** (`../zupper-app`, monorepo Nx),
organizada **por tela** — irmã da `_figma/`, com o mesmo papel: material de consulta
de espaçamento, cor, tipografia e raio, sem precisar abrir o outro repo.

A diferença é a **fonte**: a parte de travel (busca e compra de passagens/hospedagens)
não tem Figma utilizável como referência visual, então os valores aqui vêm dos
componentes reais do app — styled-components + tokens do `@zupper/app-ui`
(`libs/app-ui/src/lib/atoms/{spacing,colors,fonts,borders}`), já **resolvidos para o
valor literal**.

## Como ler

- Cada arquivo `.tsx` é JSX de consulta (não roda): as classes têm o valor literal
  no formato dos exports da `_figma/` — `px-[10px]`, `text-[#737373]` — e o comentário
  ao lado traz o **token de origem** do app (`spacing.spacing250`, `neutral[500]`…).
- `data-source="libs/..."` aponta pro arquivo real no repo `zupper-app` de onde o
  valor foi extraído. Linha exata pode mudar; o caminho é o que interessa.
- O comentário no topo de cada arquivo tem a data da captura — o app muda depois,
  então isso é uma foto de um momento, não fonte viva.
- `preview.html` abre direto no navegador e reproduz as variantes da tela usando as
  fontes Satoshi de `../_figma/assets/fonts/` (o app usa a mesma família).

## Mapa de tokens do app (resolvidos)

| Token do app (`@zupper/app-ui`) | Valor |
|---|---|
| `colors.primary[*]` (brand) | `#009DAF` (todos os steps) |
| `colors.secondary[950]` (mexico) | `#008C99` |
| `colors.accents.neutral[50..950]` (dubai) | `#FFFFFF · #F5F5F5 · #EFEFEF · #D4D4D4 · #A3A3A3 · #737373 · #57534E · #404040 · #2E2E2E · #262626 · #171717` |
| `spacing.spacing50..1300` | `2 · 4 · 6 · 8 · 10 · 12 · 14 · 16 · 20 · 22 · 24 … 56` (spacing1300 = 56) |
| `fonts.fontSize40/50/60/75/80/200/400/500` | `12 · 13 · 14 · 15 · 16 · 19 · 24 · 27` px |
| `fonts.fontWeight` | 400 / 500 / 700 |
| `fonts.fontFamily` | Satoshi |
| `borderRadius[200/300]` | 4px / 8px |
| Gradiente do CTA de busca | `#FB923C → #FFCE00` (hardcoded no `SearchEngineFooter`) |

## Não confundir com os componentes reais

Mesma regra da `_figma/`: isso é consulta, não os componentes do design system.
Os componentes reais usam `@kodes-tech/tokens` e NativeWind. Se um valor daqui
divergir de um token existente, é sinal pra reconferir a fonte (código do app),
não pra hardcodar o literal.

Excluído do `tsc`, do lint e do pacote publicado, igual à `_figma/`
(ver `tsconfig.json` / `package.json` de `packages/ui-native` e `eslint.config.mjs`).

## Estrutura

```
_zupper-app/
├── README.md
└── home-busca/            # Home do app (TabNavigator > Home) — a busca de voos
    ├── voos.tsx           # aba Voos, Ida e Volta — estados vazio e preenchido anotados
    └── preview.html       # 3 variantes: vazio · preenchido · Só Ida
```
