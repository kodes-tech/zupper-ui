import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { CountdownBanner } from '../../molecules/CountdownBanner';

export type CheckoutHeaderProps = {
  /** Etapa atual, 1-indexada (ex.: 1). */
  currentStep: number;
  totalSteps: number;
  onBack?: () => void;
  /** Tempo restante da oferta (ex.: "14:38"). Omitido = sem banner de contagem. */
  offerDuration?: string;
};

/**
 * CheckoutHeader — voltar + "Checkout - N de M" + barra de progresso do
 * wizard + banner de contagem regressiva opcional. Extraído do CheckoutHeader
 * do zupper-app (libs/checkout/components/CheckoutHeader): progresso
 * calculado como etapa/total, igual ao app (`((activeStep+1)*100)/stepCount`).
 */
export const CheckoutHeader = ({
  currentStep,
  totalSteps,
  onBack,
  offerDuration,
}: CheckoutHeaderProps): React.ReactElement => {
  const progress = Math.min(100, Math.max(0, Math.round((currentStep / totalSteps) * 100)));

  return (
    <View className="gap-sm bg-surface-default px-lg pb-xs pt-[40px]">
      <View className="w-full flex-row items-center justify-between">
        <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
          <Icon name="back-arrow" size={24} />
        </Pressable>
        <Text className="font-sans text-checkoutHeaderTitle text-fg-secondary">
          Checkout - {currentStep} de {totalSteps}
        </Text>
        <View className="w-[24px]" />
      </View>

      {/* progresso é dado (etapa atual/total), não um tom fixo — largura via style */}
      <View className="h-[4px] w-full overflow-hidden bg-border-subtle">
        <View style={{ width: `${progress}%` }} className="h-full bg-brand-base" />
      </View>

      {offerDuration ? <CountdownBanner duration={offerDuration} /> : null}
    </View>
  );
};
