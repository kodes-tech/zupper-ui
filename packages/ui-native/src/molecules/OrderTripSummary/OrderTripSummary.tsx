import React from 'react';
import { Image, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type OrderTripSummaryProps = {
  /** Destino / título da reserva (ex.: "Recife, Pernambuco"). */
  destination: string;
  /** Descrição de pessoas (ex.: "2 adultos · 1 criança"). */
  people: string;
  /** Período (ex.: "12 jul - 19 jul"). */
  dates: string;
  /** Imagem do destino; quando ausente, mostra o placeholder. */
  imageUrl?: string;
  /** Oculta a miniatura (usado quando o card já tem imagem no topo). */
  hideImage?: boolean;
};

/**
 * OrderTripSummary — bloco resumo da reserva dentro do card/detalhe de pedido:
 * miniatura do destino + destino, pessoas e datas. Apresentacional: dados por
 * props; sem validação de imagem (o app consumidor resolve a URL). Reproduz
 * `CustomerOrderSummary` do zupper-app.
 */
export const OrderTripSummary = ({
  destination,
  people,
  dates,
  imageUrl,
  hideImage = false,
}: OrderTripSummaryProps): React.ReactElement => (
  <View className="flex-row items-center gap-md">
    {!hideImage ? (
      imageUrl ? (
        <Image
          source={{ uri: imageUrl }}
          className="h-[56px] w-[56px] rounded-md"
          resizeMode="cover"
        />
      ) : (
        <View className="h-[56px] w-[56px] items-center justify-center rounded-md bg-surface-tag">
          <Icon name="order-fallback-image" size={32} />
        </View>
      )
    ) : null}

    <View className="flex-1 gap-xxs">
      <Text className="font-sans text-paragraphMd font-bold text-fg-secondary">{destination}</Text>
      <Text className="font-sans text-paragraphMd font-medium text-fg-subtle">{people}</Text>
      <Text className="font-sans text-paragraphMd font-medium text-fg-subtle">{dates}</Text>
    </View>
  </View>
);
