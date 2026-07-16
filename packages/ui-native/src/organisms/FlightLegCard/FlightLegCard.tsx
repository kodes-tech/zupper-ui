import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type FlightLegAirport = {
  time: string;
  dateLabel: string;
  city: string;
  code: string;
  name: string;
};

export type FlightLegAirline = {
  name: string;
  /** Selo/logo da companhia — fornecido pelo app consumidor (ex.: `<Image>`). */
  logo?: React.ReactNode;
  /** Companhia operadora, quando diferente da vendedora (código-compartilhado). */
  operatedByName?: string;
  operatedByLogo?: React.ReactNode;
};

export type FlightLegFlexiblePolicy = {
  cancelPolicy: string;
  farePolicy: string;
  /** Link "Ver política de alterações e cancelamento" — omitido sem `onPressViewPolicy`. */
  onPressViewPolicy?: () => void;
};

export type FlightLegCardProps = {
  /** Ida ou volta — deriva o rótulo do cabeçalho e o sufixo de localizador/e-ticket. */
  direction: 'ida' | 'volta';
  /** Data do trecho (ex.: "Qua, 24 de maio 2024"). */
  dateLabel: string;
  airline: FlightLegAirline;
  flightNumber: string;
  flightClass: string;
  aircraftModel: string;
  departure: FlightLegAirport;
  arrival: FlightLegAirport;
  /** Duração do trecho (ex.: "1h50"). */
  duration: string;
  /** Direto ou com conexões (ex.: "1 parada"). Default: "Direto". */
  stopsLabel?: string;
  locator: string;
  eTicket: string;
  /** Política da tarifa flexível — omitido quando o voo não é flexível. */
  flexible?: FlightLegFlexiblePolicy;
};

const directionLabel: Record<FlightLegCardProps['direction'], string> = {
  ida: 'Voo de ida',
  volta: 'Voo de volta',
};

const directionSuffix: Record<FlightLegCardProps['direction'], string> = {
  ida: 'IDA',
  volta: 'VOLTA',
};

/**
 * FlightLegCard — card de um trecho do voo (ida ou volta): companhia aérea,
 * horários/aeroportos de partida e chegada, localizador/e-ticket e, quando
 * aplicável, a política da tarifa flexível. Apresentacional: todos os dados
 * entram por props. Segue o card "IDA"/"VOLTA" do Figma (Detalhes Pedido).
 */
export const FlightLegCard = ({
  direction,
  dateLabel,
  airline,
  flightNumber,
  flightClass,
  aircraftModel,
  departure,
  arrival,
  duration,
  stopsLabel = 'Direto',
  locator,
  eTicket,
  flexible,
}: FlightLegCardProps): React.ReactElement => (
  <View className="gap-lg rounded-md bg-surface-default px-xl py-xl">
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-xs">
        <Icon
          name="order-flight"
          size={24}
          color={colors.brand.zupper}
          style={direction === 'volta' ? { transform: [{ scaleX: -1 }] } : undefined}
        />
        <Text className="font-sans text-paragraphMd font-bold text-fg-secondary">
          {directionLabel[direction]}
        </Text>
      </View>
      <Text className="font-sans text-caption text-fg-secondary">{dateLabel}</Text>
    </View>

    <View className="flex-row items-start justify-between">
      <View className="gap-xs">
        <View className="flex-row items-center gap-md">
          {airline.logo}
          <Text className="font-sans text-paragraphMd font-bold text-fg-secondary">{airline.name}</Text>
        </View>
        {airline.operatedByName ? (
          <View className="flex-row items-center gap-xs">
            <Text className="font-sans text-caption text-fg-subtle">Operado por:</Text>
            {airline.operatedByLogo}
            <Text className="font-sans text-caption text-fg-subtle">{airline.operatedByName}</Text>
          </View>
        ) : null}
      </View>
      <View className="items-end">
        <Text className="font-sans text-caption text-fg-subtle">Voo nº: {flightNumber}</Text>
        <Text className="font-sans text-caption text-fg-subtle">Classe: {flightClass}</Text>
        <Text className="font-sans text-caption text-fg-subtle">Modelo: {aircraftModel}</Text>
      </View>
    </View>

    <View className="h-px w-full bg-border-subtle" />

    <View className="flex-row items-start justify-between">
      <View className="gap-md">
        <Text className="font-sans text-caption text-fg-subtle">{departure.dateLabel}</Text>
        <View>
          <Text className="font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
            {departure.time}
          </Text>
          <Text className="font-sans text-caption text-fg-subtle">{departure.city}</Text>
        </View>
      </View>

      <View className="items-center gap-xs pt-lg">
        <Text className="font-sans text-caption text-fg-subtle">{stopsLabel}</Text>
        <Icon name="flight-path" width={100} height={6} />
        <Text className="font-sans text-caption text-fg-subtle">{duration}</Text>
      </View>

      <View className="items-end gap-md">
        <Text className="font-sans text-caption text-fg-subtle">{arrival.dateLabel}</Text>
        <View className="items-end">
          <Text className="font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
            {arrival.time}
          </Text>
          <Text className="font-sans text-caption text-fg-subtle">{arrival.city}</Text>
        </View>
      </View>
    </View>

    <View className="flex-row items-start justify-between gap-lg">
      <View className="flex-1">
        <Text className="font-sans text-paragraphMd font-bold text-fg-secondary">{departure.code}</Text>
        <Text className="font-sans text-caption text-fg-subtle">{departure.name}</Text>
      </View>
      <View className="flex-1 items-end">
        <Text className="font-sans text-paragraphMd font-bold text-fg-secondary">{arrival.code}</Text>
        <Text className="text-right font-sans text-caption text-fg-subtle">{arrival.name}</Text>
      </View>
    </View>

    <View className="h-px w-full bg-border-subtle" />

    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-xs">
        <View>
          <Text className="font-sans text-paragraphMd text-fg-subtle">
            Localizador {directionSuffix[direction]}
          </Text>
          <Text className="font-sans text-[20px] font-bold text-fg-secondary">{locator}</Text>
        </View>
        <Icon name="ticket" size={24} color={colors.text.subtle} />
      </View>
      <View className="flex-row items-center gap-xs">
        <View className="items-end">
          <Text className="font-sans text-paragraphMd text-fg-subtle">
            E-ticket {directionSuffix[direction]}
          </Text>
          <Text className="font-sans text-[20px] font-bold text-fg-secondary">{eTicket}</Text>
        </View>
        <Icon name="ticket" size={24} color={colors.text.subtle} />
      </View>
    </View>

    {flexible ? (
      <>
        <View className="h-px w-full bg-border-subtle" />
        <View className="gap-md">
          <Text className="font-sans text-cardTitle text-fg-secondary">Voo flexível</Text>
          <View className="flex-row items-center gap-xs">
            <Icon name="no-cancel" size={24} color={colors.feedback.danger} />
            <Text className="font-sans text-paragraphMd text-fg-subtle">{flexible.cancelPolicy}</Text>
          </View>
          <View className="flex-row items-center gap-xs">
            <Icon name="fare-change" size={24} color={colors.feedback.success} />
            <Text className="font-sans text-paragraphMd text-fg-subtle">{flexible.farePolicy}</Text>
          </View>
          {flexible.onPressViewPolicy ? (
            <Pressable accessibilityRole="button" onPress={flexible.onPressViewPolicy}>
              <Text className="font-sans text-caption text-brand-zupper underline">
                Ver política de alterações e cancelamento
              </Text>
            </Pressable>
          ) : null}
        </View>
      </>
    ) : null}
  </View>
);
