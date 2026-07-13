import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type SearchFieldProps = PressableProps & {
  placeholder?: string;
};

/**
 * SearchField — campo de busca do topo da Home ("Qual seu destino?").
 * Apresentacional: é um Pressable (abre a busca); o botão redondo é gradiente (tokens).
 */
export const SearchField = ({
  placeholder = 'Qual seu destino?',
  ...rest
}: SearchFieldProps): React.ReactElement => (
  <Pressable
    accessibilityRole="search"
    className="h-[56px] flex-row items-center gap-lg rounded-pill border border-border-default bg-surface-default pl-xl pr-md"
    {...rest}
  >
    <Icon name="globe" size={24} />
    <Text className="flex-1 font-sans text-bodyMd text-fg-secondary">{placeholder}</Text>
    <LinearGradient
      colors={[...colors.gradient.button]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{ width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}
    >
      <Icon name="search" size={20} />
    </LinearGradient>
  </Pressable>
);
