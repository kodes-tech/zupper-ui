import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type ScreenHeaderProps = {
  title: string;
  onBack?: () => void;
  /** Slot à direita; por padrão um espaçador pra manter o título centralizado. */
  right?: React.ReactNode;
};

/**
 * ScreenHeader — barra de topo com voltar + título (Meu Perfil, Detalhes do destino…).
 */
export const ScreenHeader = ({ title, onBack, right }: ScreenHeaderProps): React.ReactElement => (
  <View className="flex-row items-center justify-between bg-surface-default px-xxl pb-xs pt-[40px]">
    <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
      <Icon name="back-arrow" size={24} />
    </Pressable>
    <Text className="font-sans text-cardTitle text-fg-label">{title}</Text>
    {right ?? <View className="h-[24px] w-[24px]" />}
  </View>
);
