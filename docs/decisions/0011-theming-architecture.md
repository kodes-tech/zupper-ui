# 0011 — Arquitetura de theming: CSS variables nos tokens + ThemeProvider em runtime

- **Status:** Accepted
- **Date:** 2026-07-24
- **Deciders:** Adrian Valdes
- **Spike:** KSA-261

## Context

O super-app precisa suportar **temas trocáveis** em dois cenários (KSA-261):

1. **Escolha do usuário** — alternar entre **default (claro)** e **dark**.
2. **Sazonal automático** — em datas especiais (ex.: Natal) o app abre com a paleta
   sazonal **sem** escolha do usuário, decidido por período/config, com **precedência**
   sobre a preferência manual, e revertendo ao normal no fim da temporada.

O design system (`@kodes-tech/tokens` + `@kodes-tech/ui-native`, NativeWind 4) não tinha
theming multi-tema: os tokens exportavam um objeto único de cores (hex) e o preset
Tailwind injetava esses hex crus. Este ADR registra a arquitetura recomendada (spike) e
o que já foi validado por PoC. A **ativação sazonal por flag remota** já tinha um ADR
próprio ([0005](0005-seasonal-theming-remote-flag.md)); este ADR consolida a arquitetura
como um todo (mecanismo + os dois cenários + resolução/precedência).

## Decision

### 1. Tokens expõem múltiplos temas via **CSS variables** (semantic tokens)

- `colors.ts` continua sendo o **hex canônico** (= tema `default`). `themes.ts` guarda
  cada tema em hex e **deriva** dali: `themes`, `getTheme(name)`, e `themeVars`
  (`{ '--color-<grupo>-<chave>': 'R G B' }`). Fonte única — nada de CSS escrito à mão.
- O **preset Tailwind** não emite mais hex fixo: cada cor resolve
  `rgb(var(--color-…) / <alpha-value>)`. Assim `bg-surface-default`, `text-fg-primary`
  etc. passam a seguir a variável do tema ativo, sem tocar em componente.
- O build dos tokens gera `@kodes-tech/tokens/theme.css` (`:root` = default + um bloco
  `[data-theme="<nome>"]` por tema) — baseline/atalho para o web.
- **Semantic tokens, não valores diretos:** telas devem consumir cor por nome semântico
  (`surface`, `fg`, `border`, `feedback`…), nunca hex. Só assim o tema aplica sozinho.
- **Onde os temas vivem:** os **valores** ficam no DS (`@kodes-tech/tokens`), embarcados
  via npm em todos os produtos. A **ativação** (qual tema ligar) é do app (ver §3).

### 2. Troca em runtime via **`ThemeProvider`** (cross-platform)

`@kodes-tech/ui-native` exporta `ThemeProvider` e `useTheme`:

- `<ThemeProvider theme={name}>` aplica `vars(themeVars[name])` (NativeWind) num `View`
  wrapper — no web viram custom properties inline que as classes `rgb(var(--…))`
  resolvem; no React Native o `vars()` faz o mesmo em runtime. Trocar `theme` re-skinna
  a subárvore **sem recarregar telas**.
- **Providers aninhados = "ilhas"**: uma subárvore pode fixar outro tema (ex.: o
  `ConfirmDialog` fica sempre claro via `ThemeProvider theme="default"` interno).
- `useTheme()` expõe `{ theme, colors }` para os poucos pontos que leem cor em **JS** e
  não acompanham a cascata das classes: gradientes (`LinearGradient` em Button/RoleBadge)
  e `selectionColor` (Input/Textarea).

**Por que `vars()` e não `dark:`/`useColorScheme`:** a variante `dark:` +
`useColorScheme` só expressa **dois** estados (light/dark) e no native é dirigida pelo
`Appearance` do SO — não modela um tema **nomeado arbitrário** como `christmas`. O
`vars()` por provider é o único mecanismo que funciona igual no web e no native para
**qualquer** tema nomeado e para troca em runtime. `useColorScheme`/`Appearance` do SO
entram só como uma das **fontes de decisão** (§3), não como o mecanismo de aplicação.

### 3. Onde o tema é decidido, **precedência** e persistência (responsabilidade do app)

O DS entrega valores + `ThemeProvider`; **o app resolve qual tema passar**. A resolução
segue esta **ordem de precedência** (maior vence):

```
sazonal ativo (data/flag)  >  escolha do usuário (persistida)  >  Appearance do SO  >  default
```

```ts
// no app — pseudocódigo da resolução
function resolveTheme(input): ThemeName {
  if (input.seasonal) return input.seasonal;      // 1. sazonal tem PRECEDÊNCIA
  if (input.userChoice) return input.userChoice;  // 2. preferência manual (persistida)
  if (input.osScheme === 'dark') return 'dark';   // 3. dark automático do SO (opcional)
  return 'default';                               // 4. fallback
}
// <ThemeProvider theme={resolveTheme(...)}>
```

- **Escolha do usuário:** persistida localmente no app (ex.: **MMKV**/store de tema),
  lida no boot. Sobrevive a reinícios; só o usuário muda.
- **Sazonal automático:** ativado por **período** — janela de datas resolvida pelo
  backend (config remota/BFF) ou, em fallback, por data local. Retorna o **nome do tema
  já decidido** (ex.: `christmas`). Enquanto a janela/flag está ativa, **ignora** a
  escolha do usuário (precedência). No fim da temporada a janela/flag encerra → a
  resolução cai de volta para a escolha do usuário automaticamente (reverte sozinho, sem
  release). Detalhes da flag remota: [ADR 0005](0005-seasonal-theming-remote-flag.md).
- **Pegadinha (mobile):** a flag **liga** um tema, mas o tema precisa **existir no
  bundle** do app. Tema novo não embarcado exige OTA (EAS Update) ou release; no web é
  sempre a versão nova.

### 4. PoC (validação da abordagem)

- **Toggle no Storybook** (versionado) troca `default ↔ dark` re-skinnando todos os
  primitivos ao vivo — é a PoC do cenário de escolha do usuário.
- O fluxo `flag remota → ThemeProvider → reskin` (cenário sazonal) foi validado
  **localmente** com um harness de demonstração (uma story + um BFF de teste), **não
  versionado** — confirmou que o `vars()` funciona no react-native-web (mesmo caminho do
  app). Recriável: um endpoint de flag + um componente que faz `setTheme` no polling e
  passa pro `<ThemeProvider>`.

## Consequences

- **+** Um único mecanismo (`ThemeProvider`/`vars()`) para web e native, escalável a
  temas sazonais arbitrários — não só light/dark.
- **+** Fonte única: mudar um tema é mexer em `themes.ts`; preset e `theme.css` derivam.
- **+** Telas que já usam token semântico tematizam **de graça** (sem tocar componente).
- **+** Ativação central e instantânea via flag (ADR 0005), com reversão automática no
  fim da temporada.
- **−** Cores lidas em **JS** (gradientes, `selectionColor`) só tematizam sob um
  `ThemeProvider` (via `useTheme`); fora dele caem no `default`.
- **−** `vars()` puxa `react-native-css-interop` (JSX cru em `.js`), que exige transpile
  no webpack do Storybook (regra em `.storybook/main.ts`).
- **−** A resolução/persistência/precedência é **responsabilidade do app** — o DS não
  impõe store nem leitura de flag (de propósito: o app é o dono do estado e do BFF).
- **Escopo (spike):** valores + mecanismo + PoC entram aqui; **implementação em todas as
  telas** e **paletas finais** (dark/Natal, incl. checagem de contraste) ficam fora — o
  `dark` atual é provisório (`TODO(Figma)`).

## Alternatives considered

- **`darkMode: 'class'` + `dark:` + `useColorScheme`** — rejeitado como mecanismo
  principal: só dois estados (light/dark), não modela temas nomeados (sazonais); no
  native segue o SO, não um tema arbitrário.
- **Só cascata `[data-theme]` no `<html>` (web)** — funciona no web, mas **não existe no
  React Native** (sem DOM/cascata). Mantido apenas como baseline/atalho no Storybook; o
  mecanismo canônico é o `ThemeProvider`/`vars()`, igual nos dois lados.
- **Temas definidos no app (não no DS)** — rejeitado: fura a "fonte única de design"
  (ADR 0002); cada produto redefiniria cores. Valores no DS, ativação no app.
- **Persistir a escolha e resolver precedência dentro do DS** — rejeitado: acopla o
  pacote a store (MMKV) e a leitura de flag/BFF, que são estado de produto. O DS expõe o
  mecanismo; o app decide.
