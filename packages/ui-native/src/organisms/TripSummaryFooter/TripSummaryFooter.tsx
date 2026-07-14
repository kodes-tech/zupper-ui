import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type TripSummaryFooterProps = {
  /** Rota da viagem (ex.: "GRU - REC"). */
  route: string;
  /** Data já formatada (ex.: "15 de julho"). */
  dateLabel: string;
  /** Preço total já formatado (ex.: "R$ 2.434,67"). */
  totalPrice: string;
  /** "Ver detalhes" — abre o resumo completo de preço (fora do escopo deste componente). */
  onPressDetails?: () => void;
};

/**
 * TripSummaryFooter — resumo fixo da viagem (rota, data, preço) no rodapé do
 * Checkout, compartilhado pelas 4 etapas do fluxo. Extraído do
 * CheckoutOrderDetails do zupper-app (libs/checkout/components). No app real
 * "Ver detalhes" abre um bottom-sheet com o breakdown completo — aqui só
 * expõe o callback, a apresentação do resumo fica pro app consumidor.
 */
export const TripSummaryFooter = ({
  route,
  dateLabel,
  totalPrice,
  onPressDetails,
}: TripSummaryFooterProps): React.ReactElement => (
  <View className="bg-surface-default">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Ver detalhes"
      onPress={onPressDetails}
      className="h-[35px] flex-row items-center justify-center gap-xxs border-y border-border-default"
    >
      <Text className="font-sans text-xs font-medium text-brand-zupper">Ver detalhes</Text>
      <Icon name="chevron-up" size={14} />
    </Pressable>

    <View className="flex-row items-start justify-between px-xxl py-xl">
      <View className="gap-lg">
        <Text className="font-sans text-md font-bold text-fg-secondary">{route}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">{dateLabel}</Text>
      </View>
      <View className="items-end gap-lg">
        <Text className="font-sans text-xs font-medium text-fg-subtle">Detalhes da viagem</Text>
        <Text className="font-sans text-lg font-bold text-fg-subtle">{totalPrice}</Text>
      </View>
    </View>
  </View>
);
