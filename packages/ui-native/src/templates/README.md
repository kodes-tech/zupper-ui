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

Isso é **material de consulta**, não os componentes reais do design system
(`packages/ui-native/src/{atoms,molecules,organisms}`). Os componentes reais usam
`@zupper/tokens` (não os valores literais daqui) e seguem o padrão NativeWind do
design system — ver `docs/conventions/`. Se um valor aqui divergir de um token
existente, o token é que deve ser reconferido no Figma, não o contrário.

Fica dentro de `src/` só pra ficar perto do design system que documenta — mas é
excluído do `tsc` (typecheck), do lint e do pacote publicado no npm (ver
`tsconfig.json` / `package.json` de `packages/ui-native`).

## Estrutura

```
templates/
├── README.md
├── feed/
│   ├── deslogado.tsx     # export bruto do Figma Dev Mode — só consulta
│   ├── viajante.tsx
│   ├── parceiro.tsx
│   └── preview.html      # reprodução renderizável das 3 variantes — abre direto no navegador
├── comunidade/            # Tela 2 — Meu Perfil / Comunidade (só persona Viajante no Figma)
│   ├── fotos.tsx          # aba "Fotos" — node 118:7339
│   ├── dicas.tsx          # aba "Dicas" — node 118:8284
│   ├── roteiros.tsx       # aba "Roteiros" — node 118:8735
│   └── preview.html
├── destinos/              # Tela 3 — Destinos em alta (Ver todos)
│   ├── ver-todos.tsx      # node 118:10544
│   └── preview.html
├── conteudo/               # Tela 5 — visualização individual de um post (Foto / Dica / Roteiro)
│   ├── foto.tsx            # node 140:7928
│   ├── dica.tsx            # node 143:8671
│   ├── roteiro.tsx         # node 143:8826 (inclui card-roteiro por dia + cards de oferta)
│   └── preview.html
└── assets/                # arquivos reais baixados do Figma, usados pelos preview.html
    ├── icon-*.svg / .png  # ícones soltos (flat)
    ├── fonts/              # Satoshi-{Regular,Medium,Bold}.otf
    └── photos/             # avatares, foto de post, foto de card-destino (comprimidas)
```

Ver a PR que introduziu esses arquivos pra detalhes sobre o que é confiável
extrair do `.tsx` (spacing/cor/tipografia) vs. o que não é (assets de
ícone/foto atrás de instance-swap no Figma).
