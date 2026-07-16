import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';

export type HotelModalSheetProps = {
  title: string;
  /** Divisória logo abaixo do cabeçalho (usada na config de hóspedes). */
  showDivider?: boolean;
  children: React.ReactNode;
  /** Rodapé fixo (ex.: botão "Aplicar filtros"). */
  footer?: React.ReactNode;
  onClose?: () => void;
};

/**
 * HotelModalSheet — casca dos modais de busca de cidade e config de
 * hóspedes/quartos: overlay mais escuro que o BottomSheet da comunidade
 * (0.6, como no Modal do zupper-app) + folha com cabeçalho (título + fechar).
 * Reproduz a moldura de organisms/modal do zupper-app (modo padrão, não
 * full-screen — esse é o DateRangeCalendar).
 */
export const HotelModalSheet = ({
  title,
  showDivider = false,
  children,
  footer,
  onClose,
}: HotelModalSheetProps): React.ReactElement => (
  <View className="absolute inset-0 justify-end">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fechar"
      onPress={onClose}
      className="absolute inset-0 bg-[rgba(0,0,0,0.6)]"
    />

    <View className="max-h-[90%] rounded-t-md bg-surface-default">
      <View className="flex-row items-center justify-between px-xxl pb-lg pt-xl">
        <Text className="flex-1 font-sans text-lg font-bold text-fg-secondary">{title}</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Fechar" onPress={onClose}>
          <Icon name="close" size={24} color={colors.text.secondary} />
        </Pressable>
      </View>
      {showDivider ? (
        <View className="px-xxl pb-md">
          <Divider />
        </View>
      ) : null}

      <View className="px-xxl pb-xl">{children}</View>

      {footer ? <View className="border-t border-border-subtle px-xxl py-lg">{footer}</View> : null}
    </View>
  </View>
);
