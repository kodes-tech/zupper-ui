import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { HotelRoomCard } from '../../organisms/HotelRoomCard';
import type { HotelRoomOptionData } from '../../organisms/HotelRoomCard';

export type HotelRoomSelectionKind = 'quarto' | 'combo';

export type HotelRoomSelectionProps = {
  /** Nome do hotel, exibido no cabeçalho. */
  hotelName: string;
  kind?: HotelRoomSelectionKind;
  options: HotelRoomOptionData[];
  /** Resumo do rodapé quando há opção selecionada (uma delas com `selected: true`). */
  selectedSummary?: { nightsLabel: string; price: string };
  onBack?: () => void;
  onSelectOption?: (id: string) => void;
  onContinue?: () => void;
};

/**
 * HotelRoomSelection — tela de escolha de quarto/combo: header com o nome do
 * hotel, a lista de opções (HotelRoomCard) e o rodapé fixo com o resumo da
 * opção escolhida e o CTA "Ir para pagamento" (desabilitado até uma seleção).
 * Reproduz HotelRoomSelectionScreen + HotelRoomContainer do zupper-app.
 */
export const HotelRoomSelection = ({
  hotelName,
  kind = 'quarto',
  options,
  selectedSummary,
  onBack,
  onSelectOption,
  onContinue,
}: HotelRoomSelectionProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="flex-row items-center gap-lg bg-surface-default px-xxl pb-lg pt-[40px]">
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
        <Icon name="back-arrow" size={24} />
      </Pressable>
      <Text numberOfLines={1} className="flex-1 font-sans text-lg font-bold text-fg-secondary">
        {hotelName}
      </Text>
    </View>

    <View className="px-xxl py-xl">
      <Text className="font-sans text-lg font-bold text-fg-secondary">
        {kind === 'combo' ? 'Escolha o Combo' : 'Escolha o Quarto'}
      </Text>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-lg">
        {options.map((option) => (
          <HotelRoomCard
            key={option.id}
            option={option}
            kind={kind}
            onSelect={() => onSelectOption?.(option.id)}
          />
        ))}
      </View>
    </ScrollView>

    <View className="h-[92px] flex-row items-center justify-between gap-md bg-surface-default px-xxl">
      <View className="flex-1 gap-xxs">
        <Text className="font-sans text-xs font-medium text-fg-subtle">
          {selectedSummary?.nightsLabel ?? (kind === 'combo' ? 'Combo' : 'Quarto')}
        </Text>
        {selectedSummary ? (
          <Text className="font-sans text-lg font-bold text-fg-secondary">{selectedSummary.price}</Text>
        ) : null}
      </View>
      <Button
        label={selectedSummary ? 'Ir para pagamento' : `Escolher ${kind === 'combo' ? 'Combo' : 'Quarto'}`}
        variant="secondary"
        disabled={!selectedSummary}
        onPress={onContinue}
      />
    </View>
  </View>
);
