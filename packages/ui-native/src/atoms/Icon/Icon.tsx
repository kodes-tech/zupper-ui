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
  community: Svgs.Community,
  heart: Svgs.Heart,
  location: Svgs.Location,
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
  publish: Svgs.Publish,
  'tab-dicas-active': Svgs.TabDicasActive,
  'tab-dicas-inactive': Svgs.TabDicasInactive,
  'tab-fotos-active': Svgs.TabFotosActive,
  'tab-fotos-inactive': Svgs.TabFotosInactive,
  'tab-roteiros-active': Svgs.TabRoteirosActive,
  'tab-roteiros-inactive': Svgs.TabRoteirosInactive,
} as const;

export type IconName = keyof typeof registry;

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
