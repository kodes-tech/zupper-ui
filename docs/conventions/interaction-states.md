# Estados de interação — o retorno do toque (KSA-446)

> Regra citável: em review, aponte para este arquivo — o efeito de pressed **não é
> decidido caso a caso**. Tokens em `packages/tokens/src/state.ts`.

## Por que existe

O dedo cobre o alvo: quem toca só sabe que acertou se algo mudar em volta. Sem
retorno, o usuário toca de novo — e num botão de ação, toque repetido vira envio
duplicado. Material exige *state layer* em todo componente tocável; o HIG da Apple
exige resposta imediata. Até a KSA-446, **nenhum** elemento do DS (nem do app) reagia
ao toque.

## A regra — por tipo de superfície

| Tipo de alvo | Efeito | Token / classe |
|---|---|---|
| **Superfície preenchida** (primary com gradiente, danger) | véu escuro 12% por cima | `bg-state-pressedStrong` (véu absoluto, no Button) |
| **Superfície clara / linha** (outline, chip, linha de sheet, campo de select) | fundo acinzentado 8% | `active:bg-state-pressedSubtle` |
| **Só texto/ícone ou mídia** (ghost, back do header, item do BottomNav, célula de foto) | opacidade 0.6 | `active:opacity-pressed` |

Por que não um efeito só: um card grande escurecendo inteiro fica pesado; um ícone
pequeno com véu sutil não é percebido. O véu forte só existe onde há cor sólida por
baixo; a opacidade só onde não há superfície para acinzentar.

**Exceção deliberada:** backdrops de sheet/modal **não** ganham efeito — são área de
dispensar, não alvo.

## Os dois mecanismos (e quando cada um)

1. **Variante `active:` do NativeWind** — quando o `className` mora **no próprio
   `Pressable`** (FilterChip, SheetOption, RadioOption, SocialLoginButton, BottomNav,
   PhotoGrid, SelectField, back do AppHeader, CTA do StatusBanner). Mesmo precedente
   do `focus:border-border-focus` do Input.
2. **Estado interno (`onPressIn`/`onPressOut`)** — quando quem pinta é um **filho** do
   `Pressable` (o `Button`: container + gradiente). A variante `active:` só acompanha
   o elemento que recebe o gesto, então ali o primitivo guarda o estado e aplica o
   véu/classe no container. O véu usa `pointerEvents="none"` (nunca rouba o toque) e
   pinta o próprio raio (a regra do gradiente: nada de `overflow: hidden` no pai).

A ADR 0010 continua valendo: o efeito é **decisão interna** do primitivo — nunca vira
prop pública, nunca é responsabilidade do consumidor.

## Status dos valores

O Figma não tem `Pressed` no eixo State (só Default/Disabled/Loading — conferido em
13/08/2026). Os valores são provisórios, ancorados em plataforma: 12% é o *state
layer* do Material; 0.6 é a faixa do iOS para texto/ícone. Quando o design definir os
dele, troca-se em `state.ts` — uma linha, nenhum componente.

O véu **não inverte no tema escuro por ora** (deveria virar branco): o dark inteiro é
provisório (`TODO(Figma)`) e inalcançável no app; a inversão entra junto com a
paleta dark real. Mesmo status do `scrim`.

## O que é testável — e o que não é

Percepção de toque não se afirma em jest (o jest daqui não compila NativeWind). O que
se trava em unidade é **estrutura**: no Button, o véu monta no `pressIn` e desmonta no
`pressOut`. O resto é Storybook (segurar o mouse) e aparelho.
