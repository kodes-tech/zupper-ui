# 0004 — Blindagens de distribuição (instalável em qualquer app compatível)

- **Status:** Accepted
- **Date:** 2026-07-08
- **Deciders:** Marcos Matsuda

## Context
O pacote precisa instalar e funcionar no Zupper App (RN 0.83) e em apps futuros
(possivelmente versões de RN diferentes), sem quebrar por versão, duplicação de React,
ou módulo nativo faltando.

## Decision
Adotar 4 blindagens:
1. **peerDependencies permissivas** — `react: *`, `react-native: >=0.72`,
   `styled-components: >=6` (o app fornece as instâncias; nunca em `dependencies`).
2. **Split tokens/native/web** — cada plataforma instala só o que roda nela.
3. **Build compilado** — `react-native-builder-bob` (RN) / `tsc` (tokens); publica
   `lib`/`dist` + types, nunca `.tsx` cru.
4. **Semver disciplinado** — major só quando o consumidor quiser; `^` no consumidor.

## Consequences
- **+** Instala num leque amplo de apps; sem "dois Reacts"; bundlers resolvem.
- **−** Exige que o app consumidor tenha os módulos nativos peer (svg, etc.).
- **−** Mudança de valores = versão nova; propagação depende do `npm update` de cada
   consumidor (ver ADR 0005 para ativação central via flag).
