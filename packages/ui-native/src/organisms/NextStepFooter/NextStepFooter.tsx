import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';

export type NextStepFooterProps = {
  /** Rótulo do CTA (ex.: "Avançar para a próxima etapa", "Finalizar compra"). */
  buttonLabel?: string;
  onPressNext?: () => void;
  /**
   * Selo de segurança do parceiro (ex.: logo real de certificação), injetado
   * pelo app consumidor — não é um ícone genérico do design system.
   */
  securityBadge?: React.ReactNode;
};

/**
 * NextStepFooter — CTA de avançar etapa + aviso estático "Este é um site
 * seguro". Extraído do NextStepButton do zupper-app
 * (libs/checkout/components/NextStepButton). Reaproveita o Button `primary`
 * (mesmo gradiente cyan→teal do CTA real) e o Divider já existentes.
 */
export const NextStepFooter = ({
  buttonLabel = 'Avançar para a próxima etapa',
  onPressNext,
  securityBadge,
}: NextStepFooterProps): React.ReactElement => (
  <View className="gap-lg bg-surface-tag px-screenMargin py-xl">
    <Button label={buttonLabel} fullWidth onPress={onPressNext} />
    <Divider />
    <View className="flex-row items-center justify-between gap-md">
      <View className="flex-row items-center gap-sm">
        <Icon name="lock" size={20} />
        <Text className="font-sans text-lg font-bold text-fg-secondary">Este é um site seguro</Text>
      </View>
      {securityBadge}
    </View>
  </View>
);
