import React from 'react';
import { Text, View } from 'react-native';

export type OrderInfoCardProps = {
  title: string;
  /** Texto curto à direita do título (ex.: "PIX"). */
  trailing?: string;
  children: React.ReactNode;
};

/**
 * OrderInfoCard — card branco arredondado com título (e opcionalmente um
 * rótulo à direita), usado como invólucro das seções de detalhe do pedido
 * (Bagagem, Detalhes do pagamento, Forma de pagamento, Viajantes, Informações
 * importantes). Apresentacional: o conteúdo entra via `children`.
 */
export const OrderInfoCard = ({ title, trailing, children }: OrderInfoCardProps): React.ReactElement => (
  <View className="gap-lg rounded-md bg-surface-default p-xxl">
    <View className="flex-row items-center justify-between">
      <Text className="font-sans text-cardTitle text-fg-secondary">{title}</Text>
      {trailing ? <Text className="font-sans text-caption text-fg-body">{trailing}</Text> : null}
    </View>
    {children}
  </View>
);
