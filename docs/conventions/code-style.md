# Convenção — Lint & Formatação

## Ferramentas
- **ESLint 9** (flat config, `eslint.config.mjs`) — TypeScript + React + react-hooks.
- **Prettier** (`.prettierrc.json`) — formatação. ESLint **não** cuida de formatação
  (delegada ao Prettier via `eslint-config-prettier`).

## Config
- Aspas simples, `;`, `trailingComma: all`, `printWidth: 100`, 2 espaços.
- `react/react-in-jsx-scope` off (novo JSX transform) · `prop-types` off (usamos TS).
- Testes/stories relaxam `no-explicit-any`.

## Comandos
```bash
npm run lint          # checa
npm run lint:fix      # corrige o que dá
npm run format        # formata (Prettier)
npm run format:check  # só verifica formatação
```

## No CI
Lint e format-check rodam no workflow. **Estão NÃO bloqueantes por enquanto**
(`continue-on-error`) porque o código anterior ao lint ainda não foi limpo. Depois de
rodar `lint:fix` + `format` e zerar os erros, **remover os `continue-on-error`** em
`.github/workflows/ci.yml` para tornar obrigatório.

## Regra
Todo código novo passa lint + format antes do merge. Não desligar regra sem comentário
explicando o porquê.
