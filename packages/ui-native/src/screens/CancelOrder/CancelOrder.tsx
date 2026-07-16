import React from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { OrderCard } from '../../organisms/OrderCard';
import type { OrderCardProps } from '../../organisms/OrderCard';

export type CancelOrderProps = {
  onBack?: () => void;
  orderNumberValue?: string;
  onChangeOrderNumber?: (value: string) => void;
  /** Pedido localizado a partir do número informado — omitido enquanto não há resultado. */
  result?: OrderCardProps;
  /** Habilita "Solicitar cancelamento" — o app decide com base no `result`. */
  canSubmit?: boolean;
  onPressCancel?: () => void;
  /**
   * Camada sobreposta à tela — o sheet aberto no momento (confirmação, sucesso
   * ou erro do cancelamento). Quem controla qual sheet está aberto é o app.
   */
  overlay?: React.ReactNode;
};

/**
 * CancelOrder — tela "Cancelamento de pedido": o usuário informa o número do
 * pedido, vê o resultado (reaproveita `OrderCard`) e confirma a solicitação.
 * Apresentacional: dados e validação entram por props; os passos seguintes
 * (confirmar/sucesso/erro) são sheets renderizados via `overlay`. Segue
 * "Cancelamento de pedido" do Figma.
 */
export const CancelOrder = ({
  onBack,
  orderNumberValue,
  onChangeOrderNumber,
  result,
  canSubmit = false,
  onPressCancel,
  overlay,
}: CancelOrderProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="flex-row items-center gap-[44px] bg-surface-default px-xxl pb-xs pt-[52px]">
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
        <Icon name="back-arrow" size={24} />
      </Pressable>
      <Text className="font-sans text-cardTitle text-fg-secondary">Cancelamento de pedido</Text>
    </View>

    <ScrollView keyboardShouldPersistTaps="handled" contentContainerStyle={{ flexGrow: 1 }}>
      <View className="flex-1 gap-xxl px-xxl py-xxl">
        <View className="items-center gap-md">
          <Text className="text-center font-sans text-[16px] font-bold leading-6 tracking-[0.32px] text-fg-secondary">
            Para confirmar o cancelamento, é necessário informar o número do pedido que deseja
            cancelar.
          </Text>
          <Text className="text-center font-sans text-caption text-fg-subtle">
            Esse cancelamento não terá custos ou cobranças futuras.
          </Text>
        </View>

        <View className="gap-md">
          <Text className="font-sans text-caption text-fg-subtle">Digite o número do pedido</Text>
          <View
            className={`flex-row items-center gap-md rounded-md border bg-surface-default px-md py-lg ${
              orderNumberValue ? 'border-brand-strong' : 'border-border-default'
            }`}
          >
            <Icon name="search-outline" size={24} />
            <TextInput
              value={orderNumberValue}
              onChangeText={onChangeOrderNumber}
              placeholder="000000"
              keyboardType="number-pad"
              placeholderTextColor={colors.text.muted}
              selectionColor={colors.surface.selection}
              className="flex-1 font-sans text-paragraphMd text-fg-secondary web:outline-none"
            />
            <Icon name="info-circle" size={24} color={colors.border.default} />
          </View>
        </View>

        {result ? (
          <View className="gap-md">
            <Text className="font-sans text-paragraphMd text-fg-subtle">Resultado</Text>
            <OrderCard {...result} showDetails={false} />
          </View>
        ) : null}
      </View>
    </ScrollView>

    <View className="px-xxl pb-xxl pt-md">
      {canSubmit ? (
        <Button label="Solicitar cancelamento" onPress={onPressCancel} fullWidth />
      ) : (
        <View className="w-full items-center justify-center rounded-pill bg-border-default py-lg">
          <Text className="font-sans text-buttonLabel text-fg-inverse">Solicitar cancelamento</Text>
        </View>
      )}
    </View>

    {overlay}
  </View>
);
