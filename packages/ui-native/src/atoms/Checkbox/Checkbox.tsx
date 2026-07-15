import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../Icon';

export type CheckboxProps = PressableProps & {
  /** Rótulo à direita da caixa. */
  label: string;
  /** Marcado ou não — controlado pelo consumidor (sem estado interno). */
  checked?: boolean;
};

/**
 * Checkbox — caixa de seleção com rótulo, usada nas listas de filtro
 * (comodidades, cias, paradas, aeroportos…). Marcada = caixa preenchida na
 * cor da marca com o check branco; desmarcada = contorno neutro.
 * Apresentacional: o estado vem por prop.
 */
export const Checkbox = ({ label, checked = false, ...rest }: CheckboxProps): React.ReactElement => (
  <Pressable
    accessibilityRole="checkbox"
    accessibilityState={{ checked }}
    accessibilityLabel={label}
    className="flex-row items-center gap-md py-xs"
    {...rest}
  >
    <View
      className={`h-[20px] w-[20px] items-center justify-center rounded-xs border ${
        checked ? 'border-brand-zupper bg-brand-zupper' : 'border-border-default bg-surface-default'
      }`}
    >
      {checked ? <Icon name="check" size={14} color={colors.text.inverse} /> : null}
    </View>
    <Text className="flex-1 font-sans text-md font-medium text-fg-secondary">{label}</Text>
  </Pressable>
);
