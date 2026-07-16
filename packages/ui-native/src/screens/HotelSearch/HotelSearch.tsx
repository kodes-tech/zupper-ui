import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';

export type HotelSearchProps = {
  destination?: string;
  /** Datas de entrada/saída já formatadas (ex.: "10 Set 26 - 15 Set 26"). */
  dates?: string;
  /** Resumo de hóspedes/quartos (ex.: "2 Adultos, 1 Quarto"). Omitido usa o padrão do app. */
  travelers?: string;
  /** Habilita "Pesquisar hospedagens" — no app: destino + datas escolhidos. */
  canSearch?: boolean;
  onBack?: () => void;
  onPressDestination?: () => void;
  onPressDates?: () => void;
  onPressTravelers?: () => void;
  onSearch?: () => void;
};

/**
 * Campo do motor de busca (PressableInput do app): vazio mostra ícone +
 * placeholder cinza; preenchido vira coluna com label acima e o ícone/texto
 * na cor da marca. Mesmo padrão do motor embutido em `TravelHome`.
 */
const HotelField = ({
  icon,
  placeholder,
  label,
  value,
  onPress,
}: {
  icon: IconName;
  placeholder: string;
  label?: string;
  value?: string;
  onPress?: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={value ?? placeholder}
    onPress={onPress}
    className="h-[56px] w-full rounded-md border border-border-default bg-surface-default"
  >
    {value ? (
      <>
        <View className="min-h-[20px] justify-center px-lg pt-xs">
          <Text className="font-sans text-xs font-medium text-fg-subtle">{label}</Text>
        </View>
        <View className="flex-1 flex-row items-center gap-xs px-md py-xxs">
          <Icon name={icon} size={25} color={colors.brand.zupper} />
          <Text numberOfLines={1} className="flex-1 font-sans text-md font-medium text-fg-secondary">
            {value}
          </Text>
        </View>
      </>
    ) : (
      <View className="flex-1 flex-row items-center gap-xs px-md py-lg">
        <Icon name={icon} size={25} color={colors.text.subtle} />
        <Text className="font-sans text-md font-medium text-fg-subtle">{placeholder}</Text>
      </View>
    )}
  </Pressable>
);

/**
 * HotelSearch — tela cheia de busca de hospedagem: destino, datas de entrada
 * e saída e hóspedes/quartos, com o CTA "Pesquisar hospedagens" (desabilitado
 * até destino + datas escolhidos). Apresentacional: valores já formatados vêm
 * por props; a busca de cidade/data/hóspedes abre externamente
 * (HotelCitySearch/DateRangeCalendar/HotelGuestsConfig). Reproduz
 * `Hotel/HotelSearch` + `HotelSearchEngine` do zupper-app — acessada a partir
 * de "editar busca" em `HotelResults`/`HotelDetails`, não como porta de
 * entrada principal (essa é a aba "Hospedagens" da `TravelHome`).
 */
export const HotelSearch = ({
  destination,
  dates,
  travelers,
  canSearch = false,
  onBack,
  onPressDestination,
  onPressDates,
  onPressTravelers,
  onSearch,
}: HotelSearchProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="flex-row items-center gap-lg bg-surface-default px-xxl pb-lg pt-[40px]">
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
        <Icon name="back-arrow" size={24} />
      </Pressable>
      <Text className="flex-1 font-sans text-lg font-bold text-fg-secondary">Hospedagens</Text>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-md px-xxl pt-xl">
        <HotelField
          icon="travel-pinmap"
          placeholder="Qual seu destino ?"
          label="Destino"
          value={destination}
          onPress={onPressDestination}
        />
        <HotelField
          icon="travel-calendar"
          placeholder="Datas de entrada e saída"
          label="Datas de entrada e saída"
          value={dates}
          onPress={onPressDates}
        />
        <HotelField
          icon="travel-guests"
          placeholder="1 Adulto, 1 Quarto"
          label="Hóspedes"
          value={travelers}
          onPress={onPressTravelers}
        />
      </View>

      <View className="px-xxl py-xxl">
        <Button label="Pesquisar hospedagens" fullWidth disabled={!canSearch} onPress={onSearch} />
      </View>
    </ScrollView>
  </View>
);
