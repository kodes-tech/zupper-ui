# Reconciliação Figma ↔ código

O objetivo final do design system é design e código com **o mesmo vocabulário e os mesmos valores**.
Hoje ainda há lacunas — este arquivo lista o que reconciliar e como.

## Página "Ajustes" (Figma)
Use a página **"Ajustes"** do Zupper App para **levar componentes do código → Figma** e comparar.
Ao reproduzir um componente do Storybook no Figma:
1. Leia a implementação real (`packages/ui-native/src/.../<Comp>.tsx` + `.stories.tsx`) e os tokens
   (`@kodes-tech/tokens`: `colors`, `radii`, `spacing`, `typography`) para pegar variantes, props e valores.
2. Reproduza com **tokens/estilos do Figma** onde baterem (vincule variáveis); use valores crus só
   onde o Figma não tiver token equivalente — e **registre a divergência** na descrição do componente.
3. Modele as props do código como **propriedades** do componente Figma (variantes + booleans + text),
   não como dezenas de variantes. Ex. do Button: `variant` (primary/secondary/ghost) + booleans
   `Ícone esquerda`/`Ícone direita`/`Rótulo`; `fullWidth` é comportamento de layout (largura Fill),
   não vira propriedade.

## Divergências conhecidas a resolver
- **Teal da marca:** o código usa `#009DAF` (`colors.brand.zupper`) em vários pontos (ex.: outline do
  Button secondary), mas no Figma só existe `action/primary` = `#008C99`. Decidir o teal canônico e
  alinhar (criar variável ou ajustar o código).
- **Gradiente do botão:** código `gradient.button` = `#4CBAC7 → #009DAF`; o paint style Figma
  `Gradients/Button` termina em `#008C99`. Alinhar o fim do gradiente.
- **Estilos de texto de botão:** o código tem `buttonLabel` (Bold 14/lh20) e `buttonLabelLg`
  (Bold 16/lh24); **não há text style local equivalente** no Figma (a escala local é heading/body lg/md/sm/
  caption). Criar esses estilos no Figma ou remapear.
- **Cinzas fora da paleta** que sobraram sem token (skeletons/placeholder, ex.: `#e5e7eb`, `#efefef`,
  `#d6d8e0`): decidir se viram tokens neutros novos.
- **Variáveis do Figma × `@kodes-tech/tokens`:** ainda não foi verificado que os nomes/valores batem
  1:1. Esse de-para é o que falta para "fonte única" de verdade — vale gerar um a partir do outro.

## Code Connect (a maior alavanca para IA/dev)
Hoje a ponte design↔código está só em **prosa** (o nome do Storybook citado nas descrições). Sem
**Code Connect** (`.figma.*` mapeando componente Figma → componente de código), uma IA não resolve o
mapeamento sozinha ao gerar código. Configurar Code Connect nos componentes principais é o passo de
maior impacto. Se o usuário topar, use a skill `figma-code-connect`.

## Tabela única de mapeamento
A verdade hoje está espalhada em 4 lugares (Figma, DS doc, PRD, código) que tendem a divergir. Uma
**tabela única** (Figma ↔ Storybook ↔ token ↔ tela) num só arquivo reduz esse risco — bom candidato a
morar no `/docs` do repo, versionada com o código.

## Sequência recomendada quando o objetivo é "fechar o ciclo"
1. Reconciliar variáveis do Figma com `@kodes-tech/tokens` (de-para + decidir divergências acima).
2. Criar os text styles de botão faltantes (ou remapear).
3. Configurar Code Connect nos componentes principais.
4. Mover PRD + DS doc para o repo e manter a tabela única de mapeamento.
