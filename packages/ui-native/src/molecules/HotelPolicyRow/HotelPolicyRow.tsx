import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type HotelPolicyRowProps = {
  /** Ex.: "Informações relevantes", "Políticas de acomodações". */
  title: string;
  onPress?: () => void;
};

/**
 * HotelPolicyRow — linha de seção expansível (título + seta) usada em
 * "Informações relevantes" e "Políticas de acomodações". O conteúdo expandido
 * é responsabilidade do app consumidor (abre modal/tela via `onPress`).
 * Reproduz as linhas "Filtro" do fluxo de pacotes (Figma).
 */
export const HotelPolicyRow = ({ title, onPress }: HotelPolicyRowProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={title}
    onPress={onPress}
    className="bg-surface-default"
  >
    <View className="h-[56px] flex-row items-center justify-between px-xxl">
      <Text className="font-sans text-lg font-bold text-fg-secondary">{title}</Text>
      <Icon name="travel-chevron-right" size={24} color={colors.text.subtle} />
    </View>
  </Pressable>
);
