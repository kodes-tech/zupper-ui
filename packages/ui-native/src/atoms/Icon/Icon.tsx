import React from 'react';
import type { SvgProps } from 'react-native-svg';
import * as Svgs from './svg';

/**
 * Registro nome → componente SVG (gerados do Figma via svgr, em `./svg`).
 * Cada ícone carrega a própria cor do Figma; o `Icon` só controla o tamanho.
 */
const registry = {
  globe: Svgs.Globe,
  search: Svgs.Search,
  'chevron-right': Svgs.ChevronRight,
  fire: Svgs.Fire,
  'fire-destinos': Svgs.FireDestinos,
  community: Svgs.Community,
  heart: Svgs.Heart,
  location: Svgs.Location,
  'media-gallery': Svgs.MediaGallery,
  'media-camera': Svgs.MediaCamera,
  verified: Svgs.Verified,
  'dot-separator': Svgs.DotSeparator,
  'content-dica': Svgs.ContentDica,
  'content-foto': Svgs.ContentFoto,
  'content-roteiro': Svgs.ContentRoteiro,
  'content-dica-white': Svgs.ContentDicaWhite,
  'content-foto-white': Svgs.ContentFotoWhite,
  'content-roteiro-white': Svgs.ContentRoteiroWhite,
  'nav-inicio': Svgs.NavInicio,
  'nav-inicio-neutral': Svgs.NavInicioNeutral,
  'nav-reservar': Svgs.NavReservar,
  'nav-pedidos': Svgs.NavPedidos,
  'nav-conta': Svgs.NavConta,
  'back-arrow': Svgs.BackArrow,
  'account-personal-data': Svgs.AccountPersonalData,
  'account-address': Svgs.AccountAddress,
  'account-password': Svgs.AccountPassword,
  'account-posts': Svgs.AccountPosts,
  'account-liked': Svgs.AccountLiked,
  'account-preferences': Svgs.AccountPreferences,
  'account-blocked': Svgs.AccountBlocked,
  'account-help': Svgs.AccountHelp,
  'account-about-zupper': Svgs.AccountAboutZupper,
  'account-privacy': Svgs.AccountPrivacy,
  'account-terms': Svgs.AccountTerms,
  'account-login': Svgs.AccountLogin,
  'chevron-right-dark': Svgs.ChevronRightDark,
  calendar: Svgs.Calendar,
  'calendar-03': Svgs.Calendar03,
  clock: Svgs.Clock,
  'oferta-passagens': Svgs.OfertaPassagens,
  'oferta-hospedagens': Svgs.OfertaHospedagens,
  'oferta-pacotes': Svgs.OfertaPacotes,
  'social-comment': Svgs.SocialComment,
  'social-share': Svgs.SocialShare,
  'social-more': Svgs.SocialMore,
  'comment-send': Svgs.CommentSend,
  'dropdown-arrow': Svgs.DropdownArrow,
  edit: Svgs.Edit,
  'roteiro-card-edit': Svgs.RoteiroCardEdit,
  'add-day': Svgs.AddDay,
  publish: Svgs.Publish,
  'status-success': Svgs.StatusSuccess,
  'tab-dicas-active': Svgs.TabDicasActive,
  'tab-dicas-inactive': Svgs.TabDicasInactive,
  'tab-fotos-active': Svgs.TabFotosActive,
  'tab-fotos-inactive': Svgs.TabFotosInactive,
  'tab-roteiros-active': Svgs.TabRoteirosActive,
  'tab-roteiros-inactive': Svgs.TabRoteirosInactive,
  // Pedidos (customer-order). Tipo-produto e passos usam currentColor; o app
  // pinta com neutro/status. `order-empty` é ilustração (cor própria).
  // Nota: order-flight/hotel/package colidem conceitualmente com os ícones de
  // viagem do #38/#61 — reconciliar no merge.
  'order-flight': Svgs.OrderFlight,
  'order-hotel': Svgs.OrderHotel,
  'order-package': Svgs.OrderPackage,
  'order-step-done': Svgs.OrderStepDone,
  'order-step-pending': Svgs.OrderStepPending,
  'order-step-failed': Svgs.OrderStepFailed,
  'order-timeline-connector': Svgs.OrderTimelineConnector,
  'order-fallback-image': Svgs.OrderFallbackImage,
  'order-empty': Svgs.OrderEmpty,
  'z-logo': Svgs.ZLogo,
  // Pedidos — header/busca/filtro do "Meus pedidos - Logado".
  filter: Svgs.Filter,
  'checkbox-checked': Svgs.CheckboxChecked,
  'checkbox-unchecked': Svgs.CheckboxUnchecked,
  'search-outline': Svgs.SearchOutline,
  ticket: Svgs.Ticket,
  'no-cancel': Svgs.NoCancel,
  'fare-change': Svgs.FareChange,
  'flight-path': Svgs.FlightPath,
  'baggage-personal': Svgs.BaggagePersonal,
  'baggage-carry-on': Svgs.BaggageCarryOn,
  'baggage-none': Svgs.BaggageNone,
  close: Svgs.Close,
  'warning-triangle': Svgs.WarningTriangle,
  'success-check': Svgs.SuccessCheck,
  'info-circle': Svgs.InfoCircle,
} as const;

export type IconName = keyof typeof registry;

/** Todos os nomes de ícone registrados (para galerias, pickers e o audit visual). */
export const iconNames = Object.keys(registry) as IconName[];

// Primeiro stroke/fill não-"none" encontrado na árvore do SVG.
const firstColor = (node: unknown): string | undefined => {
  if (!node || typeof node !== 'object') return undefined;
  const props = (node as { props?: Record<string, unknown> }).props ?? {};
  for (const key of ['stroke', 'fill'] as const) {
    const value = props[key];
    if (typeof value === 'string' && value !== 'none') return value;
  }
  const children = props.children;
  const list = Array.isArray(children) ? children : children != null ? [children] : [];
  for (const child of list) {
    const found = firstColor(child);
    if (found) return found;
  }
  return undefined;
};

/**
 * Cor intrínseca (stroke/fill do Figma) de um ícone. Cada ícone carrega a própria
 * cor; isto expõe qual é — útil pra escolher um fundo contrastante (ex.: os ícones
 * brancos, que ficam sobre gradiente, precisam de fundo escuro pra serem vistos).
 */
export const iconColor = (name: IconName): string => firstColor(registry[name]({})) ?? '#000000';

export type IconProps = SvgProps & {
  name: IconName;
  /** Largura = altura, em dp. Default 24. */
  size?: number;
};

/**
 * Icon — renderiza um ícone do design system pelo nome, dimensionando o SVG.
 * SVGs vêm de `react-native-svg` (peer). Não recolore: cada ícone mantém a cor do Figma.
 */
export const Icon = ({ name, size = 24, ...rest }: IconProps): React.ReactElement => {
  const Glyph = registry[name];
  return <Glyph width={size} height={size} {...rest} />;
};
