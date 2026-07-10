# templates/

Referência gerada pelo **Figma Dev Mode** (`get_design_context`), organizada **por
tela**. Não é código pra rodar — é o código React+Tailwind que o Dev Mode exporta,
guardado aqui pra qualquer pessoa do time consultar valor exato de espaçamento, cor,
`font-size`, `line-height`, `letter-spacing` etc. sem precisar abrir o Figma.

## Como ler

- Cada `className` do Tailwind já tem o valor literal: `px-[16px]`,
  `text-[color:var(--text/primary,#262626)]` (a cor resolvida vem depois da vírgula),
  `text-[length:var(--font-size/heading,24px)]` etc.
- `data-node-id="123:456"` aponta pro node exato no Figma — dá pra colar
  `?node-id=123-456` na URL do arquivo pra abrir direto nele.
- Gradientes vêm como `style={{ backgroundImage: "linear-gradient(...)" }}` com o
  ângulo e os stops exatos.
- Comentário no topo de cada arquivo tem o node ID do Figma e a data da captura —
  o Figma pode mudar depois, então isso não é uma fonte viva, é uma foto de um momento.

## Não confundir com os componentes reais

Isso é **material de consulta**, não os componentes de `packages/ui-native/src`. Os
componentes reais usam `@zupper/tokens` (não os valores literais daqui) e seguem o
padrão NativeWind do design system — ver `docs/conventions/`. Se um valor aqui
divergir de um token existente, o token é que deve ser reconferido no Figma, não
o contrário.

## Estrutura

```
templates/
└── feed/            # Tela 1 — Início (feed), 3 variantes
    ├── deslogado.tsx
    ├── viajante.tsx
    └── parceiro.tsx
```
