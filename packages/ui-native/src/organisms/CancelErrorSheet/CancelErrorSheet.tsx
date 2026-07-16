import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type CancelErrorSheetProps = {
  onRetry?: () => void;
  onContactSupport?: () => void;
  onDismiss?: () => void;
};

/**
 * CancelErrorSheet — número de pedido não encontrado ao tentar cancelar.
 * Reproduz "Cancelamento de pedido ERRO" do Figma.
 */
export const CancelErrorSheet = ({
  onRetry,
  onContactSupport,
  onDismiss,
}: CancelErrorSheetProps): React.ReactElement => (
  <BottomSheet title="Cancelamento de pedido" onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <View className="h-[72px] w-[72px] items-center justify-center rounded-pill bg-feedback-warningSurface">
        <Icon name="warning-triangle" size={44} color={colors.feedback.warning} />
      </View>
      <View className="items-center gap-lg">
        <Text className="text-center font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
          Hum... não identificamos esse número de pedido.
        </Text>
        <Text className="text-center font-sans text-[16px] font-medium leading-6 tracking-[0.32px] text-fg-subtle">
          Tente novamente ou se precisar de uma ajudinha, você pode entrar em contato com a nossa
          equipe.
        </Text>
      </View>
    </View>

    <View className="w-full items-center gap-lg px-xxl">
      <Button variant="secondary" label="Voltar e tentar novamente" onPress={onRetry} fullWidth />
      <Pressable accessibilityRole="button" onPress={onContactSupport}>
        <Text className="font-sans text-caption font-bold text-fg-muted">Falar com suporte</Text>
      </Pressable>
    </View>
  </BottomSheet>
);
