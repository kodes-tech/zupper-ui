import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type ScreenHeaderProps = {
  title: string;
  /** Ícone opcional antes do título (ex.: fogo em "Destinos em alta"). */
  titleIcon?: IconName;
  onBack?: () => void;
  /** Slot à direita; por padrão um espaçador pra manter o título centralizado. */
  right?: React.ReactNode;
};

/**
 * ScreenHeader — barra de topo com voltar + título (Meu Perfil, Destinos em alta…).
 */
export const ScreenHeader = ({
  title,
  titleIcon,
  onBack,
  right,
}: ScreenHeaderProps): React.ReactElement => (
  <View className="flex-row items-center justify-between bg-surface-default px-xxl pb-xxl pt-[40px]">
    <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
      <Icon name="back-arrow" size={24} />
    </Pressable>
    <View className="flex-row items-center gap-xs">
      {titleIcon ? <Icon name={titleIcon} size={24} /> : null}
      <Text className="font-sans text-cardTitle text-fg-label">{title}</Text>
    </View>
    {right ?? <View className="h-[24px] w-[24px]" />}
  </View>
);
