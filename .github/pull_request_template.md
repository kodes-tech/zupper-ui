<!-- Título no formato Conventional Commits: feat(scope): ... (KSA-XX) -->

## Summary

<!-- O que muda e por quê. Linke a issue do Jira e o doc em docs/. -->

- Jira:
- Doc relacionado (`docs/`):

## Acceptance Criteria

<!--
  COLE aqui os critérios de aceite DA STORY do Jira (o texto, não só o rótulo),
  no formato GIVEN/WHEN/THEN. É o que o review (humano e automático) usa para
  validar a PR — sem isso, não há como checar se a entrega atende ao card.
-->

- [AC-1] GIVEN ... WHEN ... THEN ...

## Test plan

<!-- Como validar. Cada [AC-N] acima deve ter ao menos um teste correspondente. -->

- [ ] [AC-1]
- [ ] [AC-2]

## Definition of Done

<!-- Fonte: docs/conventions/ deste repo — não é opcional. -->

- [ ] Componente apresentacional (só props; zero chamada de API)
- [ ] Estilo com `className`/tokens (NativeWind) — sem hardcode de cor/spacing
- [ ] Camada única `primitives/`; isolamento entre pacotes respeitado
- [ ] Cada componente com os 4 arquivos (`.tsx`, `.stories.tsx`, `.spec.tsx`, `index.ts`)
- [ ] TS strict, sem `any`; sem `console.log`
- [ ] Testes verdes (RNTL); story cobrindo os estados relevantes
- [ ] Todos os `[AC-N]` verificados
- [ ] Strings de UI em PT-BR
- [ ] Conventional commit; branch de feature (não commit direto em `main`/`develop`)
- [ ] Revisado e aprovado por outro dev
