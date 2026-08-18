/**
 * Estados de interação (KSA-446) — o retorno visual do toque.
 *
 * O Figma não tem `Pressed` no eixo State (só Default/Disabled/Loading), então estes
 * valores são PROVISÓRIOS, ancorados em convenção de plataforma: 12% é o *state layer*
 * do Material (o que o Android usa por padrão); 0.6 é a faixa usual do iOS para toque
 * em texto/ícone. Quando o design definir os dele, troca-se aqui — uma linha, nenhum
 * componente.
 *
 * A regra de QUAL efeito vale para QUAL superfície está em
 * `docs/conventions/interaction-states.md` — não decida caso a caso.
 *
 * Literais `rgba` de propósito (mesmo status do `scrim`): o sistema de temas converte
 * hex em triplet `R G B` e não carrega alfa, então o véu fica fora do `themeVars` por
 * ora. A inversão para véu BRANCO no tema escuro entra junto com a paleta dark real
 * (`TODO(Figma)` — hoje o dark inteiro é provisório e inalcançável no app).
 */
export const interaction = {
  /** Véu por cima da superfície pressionada — o *state layer*. */
  pressedOverlay: {
    /** Superfície preenchida (gradiente do primary, danger): véu escuro 12%. */
    strong: 'rgba(0, 0, 0, 0.12)',
    /** Superfície clara (outline, linha de lista, sheet): fundo acinzentado 8%. */
    subtle: 'rgba(0, 0, 0, 0.08)',
  },
  /** Alvo só de texto/ícone (ghost, back do header) e mídia: reduz a opacidade. */
  pressedOpacity: 0.6,
} as const;

export type Interaction = typeof interaction;
