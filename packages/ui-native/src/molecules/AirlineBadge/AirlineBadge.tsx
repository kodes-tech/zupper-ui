import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type AirlineBadgeProps = {
  /** Sigla da companhia (ex.: "G3", "LA", "AD"). Usada quando não há logo. */
  code: string;
  /** Logo da companhia (ex.: `airline-gol`); tem prioridade sobre a sigla. */
  icon?: IconName;
  /** Cor de marca do fundo. Sem cor = fundo neutro (cinza claro). */
  color?: string;
  /** Lado do quadrado, em dp; padrão 32. */
  size?: number;
};

/**
 * AirlineBadge — selo da companhia aérea nos cards de voo: quando há `color`,
 * pinta o fundo com a cor da marca (logo em branco, ou a sigla em branco se
 * não houver logo); sem cor, cai num selo neutro com a sigla. Assim qualquer
 * companhia fica com identidade visual — Gol com o logo, demais com a sigla
 * sobre a cor da marca.
 */
export const AirlineBadge = ({ code, icon, color, size = 32 }: AirlineBadgeProps): React.ReactElement => {
  const branded = Boolean(color);
  return (
    <View
      className={`items-center justify-center rounded-sm ${branded ? '' : 'bg-surface-tag'}`}
      style={{ width: size, height: size, ...(branded ? { backgroundColor: color } : {}) }}
    >
      {icon ? (
        <Icon name={icon} size={Math.round(size * 0.75)} color={colors.text.inverse} />
      ) : (
        <Text className={`font-sans text-xs font-bold ${branded ? 'text-fg-inverse' : 'text-fg-subtle'}`}>
          {code}
        </Text>
      )}
    </View>
  );
};
