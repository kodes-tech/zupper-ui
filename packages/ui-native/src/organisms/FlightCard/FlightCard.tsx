import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { Divider } from '../../atoms/Divider';
import { BaggageIndicator } from '../../molecules/BaggageIndicator';
import type { BaggageIndicatorProps } from '../../molecules/BaggageIndicator';

export type FlightRoutePoint = {
  /** Código IATA do aeroporto (ex.: "GRU"). */
  code: string;
  /** Cidade do aeroporto (ex.: "São Paulo"). */
  city: string;
};

export type FlightCardProps = {
  /** Nome da companhia aérea (ex.: "LATAM"). */
  airline: string;
  origin: FlightRoutePoint;
  destination: FlightRoutePoint;
  /** Horário de partida já formatado (ex.: "23:30"). */
  departureTime: string;
  /** Horário de chegada já formatado (ex.: "02:30"). */
  arrivalTime: string;
  /** Dias de diferença na chegada (ex.: 1 vira "+1" ao lado do horário). */
  arrivalDayOffset?: number;
  /** Duração já formatada (ex.: "3h00"). */
  duration: string;
  /** Rótulo de paradas (ex.: "Direto", "1 parada"). Padrão: "Direto". */
  stopsLabel?: string;
  baggage?: BaggageIndicatorProps;
  /** Voo selecionado no grupo (reflete no radio e na borda do card). */
  selected?: boolean;
  onSelect?: () => void;
  onPressDetails?: () => void;
};

/** Radio de seleção do card (ativo: anel + ponto na cor da marca). */
const SelectionRadio = ({ selected }: { selected: boolean }) => (
  <View
    className={`h-[24px] w-[24px] items-center justify-center rounded-pill border-2 ${
      selected ? 'border-brand-strong' : 'border-border-default'
    }`}
  >
    {selected ? <View className="h-[12px] w-[12px] rounded-pill bg-brand-strong" /> : null}
  </View>
);

/**
 * FlightCard — card de opção de voo (ida ou volta): companhia, radio de
 * seleção, rota com horários/duração, franquia de bagagem e link "Detalhes".
 * Extraído do FlightOptionCard + FlightSummary do zupper-app
 * (libs/aerial/results e libs/aerial/flights). Apresentacional: dados por
 * props, seleção via `onSelect`.
 */
export const FlightCard = ({
  airline,
  origin,
  destination,
  departureTime,
  arrivalTime,
  arrivalDayOffset,
  duration,
  stopsLabel = 'Direto',
  baggage,
  selected = false,
  onSelect,
  onPressDetails,
}: FlightCardProps): React.ReactElement => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    accessibilityLabel={`Voo ${airline}, ${origin.code} para ${destination.code}`}
    onPress={onSelect}
    className={`gap-md rounded-md border-2 bg-surface-default p-lg ${
      selected ? 'border-brand-zupper' : 'border-border-default'
    }`}
  >
    <View className="flex-row items-center justify-between">
      <Text className="font-sans text-xs font-medium text-fg-subtle">{airline}</Text>
      <SelectionRadio selected={selected} />
    </View>

    <View className="gap-xs">
      <View className="flex-row items-center justify-between gap-lg">
        <Text className="font-sans text-md font-bold text-brand-zupper">{origin.code}</Text>
        <View className="flex-1 flex-row items-center justify-center gap-xs">
          <Icon name="dot-separator" size={8} />
          <View className="h-[1px] flex-1 bg-fg-muted" />
          <Text className="font-sans text-xs font-medium text-fg-muted">{stopsLabel}</Text>
          <View className="h-[1px] flex-1 bg-fg-muted" />
          <Icon name="dot-separator" size={8} />
        </View>
        <Text className="font-sans text-md font-bold text-brand-zupper">{destination.code}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-xs font-medium text-fg-subtle">{origin.city}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">{destination.city}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-lg font-bold text-fg-secondary">{departureTime}</Text>
        <Text className="font-sans text-xs text-fg-muted">Duração: {duration}</Text>
        <View className="flex-row items-start">
          <Text className="font-sans text-lg font-bold text-fg-secondary">{arrivalTime}</Text>
          {arrivalDayOffset ? (
            <Text className="font-sans text-xs font-medium text-fg-secondary">{`+${arrivalDayOffset}`}</Text>
          ) : null}
        </View>
      </View>
    </View>

    <Divider />

    <View className="flex-row items-center justify-between">
      <BaggageIndicator {...baggage} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Ver detalhes do voo"
        onPress={onPressDetails}
        className="flex-row items-center gap-xxs"
      >
        <Text className="font-sans text-xs font-medium text-fg-link">Detalhes</Text>
        <Icon name="chevron-right" size={12} />
      </Pressable>
    </View>
  </Pressable>
);
