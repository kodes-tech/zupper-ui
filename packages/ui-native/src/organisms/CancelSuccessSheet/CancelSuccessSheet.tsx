import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type CancelSuccessSheetProps = {
  onNewSearch?: () => void;
  onDismiss?: () => void;
};

/**
 * CancelSuccessSheet — confirmação de sucesso do cancelamento de pedido.
 * Reproduz "Cancelamento de pedido SUCESSO" do Figma.
 */
export const CancelSuccessSheet = ({
  onNewSearch,
  onDismiss,
}: CancelSuccessSheetProps): React.ReactElement => (
  <BottomSheet title="Cancelamento de pedido" onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <View className="h-[72px] w-[72px] items-center justify-center rounded-pill bg-feedback-successSurface">
        <Icon name="success-check" size={44} color={colors.feedback.successStrong} />
      </View>
      <View className="items-center gap-lg">
        <Text className="text-center font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
          O seu pedido foi cancelado
        </Text>
        <Text className="text-center font-sans text-[16px] font-medium leading-6 tracking-[0.32px] text-fg-subtle">
          Você receberá um e-mail com a confirmação do cancelamento do seu pedido.
        </Text>
      </View>
    </View>

    <View className="w-full items-center px-xxl">
      <Button variant="secondary" label="Fazer uma nova busca" onPress={onNewSearch} fullWidth />
    </View>
  </BottomSheet>
);
