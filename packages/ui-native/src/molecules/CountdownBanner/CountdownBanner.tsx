import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type CountdownBannerProps = {
  /** Tempo restante já formatado (ex.: "14:38"). */
  duration: string;
};

/**
 * CountdownBanner — "Duração da oferta: 14:38", banner vermelho sólido no
 * topo do Checkout. Extraído do CheckoutTimer do zupper-app
 * (libs/checkout/components/CheckoutTimer): o valor do contador é calculado
 * no app consumidor (timer real contra a expiração da oferta) e chega aqui
 * já formatado — o componente é só apresentacional.
 */
export const CountdownBanner = ({ duration }: CountdownBannerProps): React.ReactElement => (
  <View className="flex-row items-center justify-center gap-xs rounded-md bg-feedback-dangerBanner px-lg py-sm">
    <Icon name="clock-countdown" size={16} color={colors.text.inverse} />
    <Text className="font-sans text-md font-medium text-fg-inverse">Duração da oferta: {duration}</Text>
  </View>
);
