import React from 'react';
import type { SvgProps } from 'react-native-svg';
import { firstColor } from '../color';
import type { IconName } from '../names';
import { registry } from './registry';

export { iconNames } from '../names';
export type { IconName } from '../names';

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
