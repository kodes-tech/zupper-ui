import React from 'react';
import { Text, View } from 'react-native';

export type InlineAlertProps = {
  message: string;
};

/**
 * InlineAlert — aviso inline discreto (ex.: prazo de pagamento do PIX no
 * Checkout). Extraído da Tag `variant="terciary" status="pending"` do
 * zupper-app (libs/app-ui/molecules/tag).
 */
export const InlineAlert = ({ message }: InlineAlertProps): React.ReactElement => (
  <View className="rounded-md bg-feedback-warningSurface px-lg py-md">
    <Text className="font-sans text-xs font-medium text-feedback-warningStrong">{message}</Text>
  </View>
);
