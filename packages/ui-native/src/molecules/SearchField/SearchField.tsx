import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text } from 'react-native';
import { colors, iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type SearchFieldProps = {
  placeholder?: string;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

/**
 * SearchField — campo de busca do topo da Home ("Qual seu destino?").
 * Apresentacional: é um Pressable (abre a busca); o botão redondo é gradiente (tokens).
 */
export const SearchField = ({
  placeholder = 'Qual seu destino?',
  onPress,
  disabled = false,
  accessibilityLabel,
  testID,
}: SearchFieldProps): React.ReactElement => (
  <Pressable
    accessibilityRole="search"
    accessibilityLabel={accessibilityLabel ?? placeholder}
    disabled={disabled}
    onPress={onPress}
    testID={testID}
    className="h-[56px] flex-row items-center gap-lg rounded-pill border border-border-default bg-surface-default pl-xl pr-md"
  >
    <Icon name="globe" size={iconSize.lg} />
    <Text className="flex-1 font-sans text-bodyMd text-fg-secondary">{placeholder}</Text>
    <LinearGradient
      colors={[...colors.gradient.button]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={{
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name="search" size={iconSize.md} />
    </LinearGradient>
  </Pressable>
);
