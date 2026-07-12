import React from 'react';
import type { SvgProps } from 'react-native-svg';
import {
  ChevronRight,
  Community,
  ContentDica,
  ContentDicaWhite,
  ContentFoto,
  ContentFotoWhite,
  ContentRoteiro,
  ContentRoteiroWhite,
  DotSeparator,
  Fire,
  Globe,
  Heart,
  Location,
  NavConta,
  NavInicio,
  NavPedidos,
  NavReservar,
  Search,
  Verified,
} from './svg';

/**
 * Registro nome → componente SVG (gerados do Figma via svgr, em `./svg`).
 * Cada ícone carrega a própria cor do Figma; o `Icon` só controla o tamanho.
 */
const registry = {
  globe: Globe,
  search: Search,
  'chevron-right': ChevronRight,
  fire: Fire,
  community: Community,
  heart: Heart,
  location: Location,
  verified: Verified,
  'dot-separator': DotSeparator,
  'content-dica': ContentDica,
  'content-foto': ContentFoto,
  'content-roteiro': ContentRoteiro,
  'content-dica-white': ContentDicaWhite,
  'content-foto-white': ContentFotoWhite,
  'content-roteiro-white': ContentRoteiroWhite,
  'nav-inicio': NavInicio,
  'nav-reservar': NavReservar,
  'nav-pedidos': NavPedidos,
  'nav-conta': NavConta,
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
