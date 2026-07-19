import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image, Pressable, Text } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';

export type PreferenceTileProps = {
  label: string;
  image: ImageSourcePropType;
  /** Opção marcada — borda em destaque (`brand-zupper`). */
  selected?: boolean;
  /** Outra opção do grupo está selecionada — esmaece esta (`opacity-40`). */
  muted?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

/**
 * PreferenceTile — tile de imagem selecionável usado nas grades de "escolha
 * suas preferências" (2 por linha). Estrutura como `DestinationCard` (foto +
 * overlay gradiente + rótulo), acrescida do estado de seleção.
 */
export const PreferenceTile = ({
  label,
  image,
  selected = false,
  muted = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  testID,
}: PreferenceTileProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ selected, disabled }}
    accessibilityLabel={accessibilityLabel ?? label}
    disabled={disabled}
    onPress={onPress}
    testID={testID}
    style={{ width: '48%' }}
    className={`aspect-square overflow-hidden rounded-sm ${selected ? 'border-2 border-brand-zupper' : ''} ${
      muted ? 'opacity-40' : ''
    }`}
  >
    <Image
      source={image}
      resizeMode="cover"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
    />
    <LinearGradient
      colors={[...colors.gradient.overlay]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    />
    <Text className="absolute bottom-0 left-0 px-md pb-md font-sans text-bodyMd text-fg-inverse">
      {label}
    </Text>
  </Pressable>
);
