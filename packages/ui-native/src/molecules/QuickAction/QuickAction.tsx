import React from 'react';
import { Image, Pressable, Text } from 'react-native';
import type { ImageSourcePropType, PressableProps } from 'react-native';

export type QuickActionProps = PressableProps & {
  /** Ícone raster (PNG) do atalho — fornecido pelo consumidor. */
  icon: ImageSourcePropType;
  label: string;
};

/**
 * QuickAction — card de atalho da Home (Buscar Voos / Hospedagens / Pacotes).
 * O ícone (PNG) entra por prop; layout/tokens no card.
 */
export const QuickAction = ({ icon, label, ...rest }: QuickActionProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    className="h-[100px] flex-1 items-center justify-end gap-xs rounded-xxl border border-border-default bg-surface-default p-xl"
    {...rest}
  >
    <Image source={icon} resizeMode="contain" className="h-[48px] w-[48px]" />
    <Text className="font-sans text-xs font-bold text-fg-primary">{label}</Text>
  </Pressable>
);
