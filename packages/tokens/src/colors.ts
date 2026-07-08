/**
 * Cores do Community.
 *
 * Valores próprios (não referenciam @zupper/app-ui), extraídos do Figma
 * "Zupper 2.0" (Dev Mode variables) para o App 2.0 / Comunidade.
 */
export const colors = {
  brand: {
    chipSurface: '#D8FCFE', // color/mexico/200 — badge "Viajante"
    cardSurface: '#E5F5F7', // color/mexico/50 — card do viajante
    base: '#4CBAC7', // color/mexico/900 — início do gradiente
    strong: '#008C99', // color/brand/zupper — fim do gradiente / texto sobre claro
    borderHighlight: '#78C8CE', // border/highlight
    zupper: '#009DAF', // Primary/Brand Zupper — fim do gradient.button; borda/texto do Button variant="secondary"
  },
  gradient: {
    // color/mexico/900 → color/brand/zupper, ~139°
    brand: ['#4CBAC7', '#008C99'],
    // color/accent/madrid/400 → color/accent/albania/600, ~159° — badge "Parceiro" / CTAs
    partner: ['#FFCE00', '#EA580C'],
    // transparente → 40% preto — legibilidade sobre imagem (DestinationCard)
    overlay: ['rgba(0, 0, 0, 0)', 'rgba(0, 0, 0, 0.4)'],
    // Gradients/Button (Figma) — #4CBAC7 → #009DAF. Usado no botão de busca
    // redondo (SearchInput) e no Button/FAB de ação primária (Publicar etc.).
    button: ['#4CBAC7', '#009DAF'],
  },
  partner: {
    surface: '#FFCE00', // início do gradiente — para consumidores sem gradiente
    cardSurface: '#FEFCE8', // color/accent/madrid/50 — card do parceiro
    cardBorder: '#FED7AA', // color/accent/albania/200 — borda do card parceiro
  },
  text: {
    primary: '#262626', // text/primary — nomes, labels de tag
    secondary: '#404040', // text/secondary — corpo de texto, meta info
    muted: '#A3A3A3', // text/muted — meta desenfatizada (ex.: "+12 paradas")
    inverse: '#FFFFFF', // text/inverse — texto sobre superfícies brand/escuras
    link: '#0C4A6E', // text/link — "Meu perfil ›" / "Fazer login ›"
    heading: '#25314D', // color/brand/kontrip — título do WelcomeBackCard
    body: '#2E2E2E', // color/accent/dubai/800 — descrição do WelcomeBackCard
  },
  surface: {
    default: '#FFFFFF', // background/surface — fundo de card
    tag: '#F5F5F5', // color/accent/dubai/100 — fundo do TypeTag
  },
  border: {
    default: '#D4D4D4', // border/default — contorno de cards e pills
  },
  feedback: {
    danger: '#EF4444', // Accents/Amsterdam/Amsterdam 500 — texto do Button variant="ghost" (ex.: "Sair da minha conta")
  },
} as const;

export type Colors = typeof colors;
