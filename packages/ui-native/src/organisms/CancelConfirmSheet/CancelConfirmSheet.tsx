import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type CancelConfirmSheetProps = {
  onConfirm?: () => void;
  onGoBack?: () => void;
  onDismiss?: () => void;
};

/**
 * CancelConfirmSheet — passo de confirmação do cancelamento de pedido:
 * "Atenção! Você tem certeza..." com o CTA destrutivo e o atalho pra voltar.
 * Reproduz "Cancelamento de pedido - certo" (variante de confirmação) do Figma.
 */
export const CancelConfirmSheet = ({
  onConfirm,
  onGoBack,
  onDismiss,
}: CancelConfirmSheetProps): React.ReactElement => (
  <BottomSheet title="Cancelamento de pedido" onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <View className="h-[72px] w-[72px] items-center justify-center rounded-pill bg-feedback-warningSurface">
        <Icon name="warning-triangle" size={44} color={colors.feedback.pending} />
      </View>
      <View className="items-center gap-lg">
        <Text className="text-center font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
          Atenção!
        </Text>
        <Text className="text-center font-sans text-[16px] font-medium leading-6 tracking-[0.32px] text-fg-subtle">
          Você tem certeza que deseja solicitar o cancelamento deste pedido?
        </Text>
      </View>
    </View>

    <View className="w-full items-center gap-lg px-xxl">
      <Button variant="secondary" label="Sim, eu quero cancelar" onPress={onConfirm} fullWidth />
      <Pressable accessibilityRole="button" onPress={onGoBack}>
        <Text className="font-sans text-caption font-bold text-fg-muted">Voltar para o pedido</Text>
      </Pressable>
    </View>
  </BottomSheet>
);
