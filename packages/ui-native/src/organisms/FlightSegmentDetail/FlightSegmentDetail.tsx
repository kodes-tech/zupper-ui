import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Divider } from '../../atoms/Divider';

export type FlightSegmentDetailPoint = {
  /** Código IATA do aeroporto (ex.: "GRU"). */
  code: string;
  /** Nome/descrição do aeroporto (ex.: "Aeroporto Internacional de Guarulhos"). */
  description: string;
  /** Cidade + estado (ex.: "São Paulo, SP"). */
  city: string;
  /** Dia da semana + data curta (ex.: "Qua, 15 Jul"). */
  weekday: string;
  /** Horário já formatado (ex.: "23:30"). */
  time: string;
};

export type FlightSegmentDetailProps = {
  direction: 'ida' | 'volta';
  /** Data completa do voo (ex.: "Quarta-feira, 15 de julho de 2026"). */
  date: string;
  airline: string;
  /** Companhia operadora, quando diferente da emissora (codeshare). */
  operatedBy?: string;
  flightNumber: string;
  fareClass: string;
  aircraftModel: string;
  origin: FlightSegmentDetailPoint;
  destination: FlightSegmentDetailPoint;
  /** Duração já formatada (ex.: "3h00"). */
  duration: string;
  /** Dias de diferença na chegada (ex.: 1 vira "+1" ao lado do horário). */
  arrivalDayOffset?: number;
  /** Rótulo de paradas (ex.: "Direto", "1 parada"). Padrão: "Direto". */
  stopsLabel?: string;
  /** Permite cancelamento/reembolso — mostra o texto em vez de "Não permite cancelamento". */
  hasRefund?: boolean;
  /** Texto de reembolso quando `hasRefund`. */
  refundText?: string;
};

/**
 * FlightSegmentDetail — detalhe completo de um trecho do voo (ida ou volta):
 * direção + data, companhia (com operador, se codeshare), número do voo/
 * classe/modelo, rota (dia da semana, horários, duração, paradas, cidades e
 * aeroportos) e a política de cancelamento do trecho. Extraído do
 * FlightSegment + FlightSegmentDetails (libs/aerial/flights) do zupper-app.
 * Apresentacional: dados por props, sem a lógica de tarifa/família do app.
 */
export const FlightSegmentDetail = ({
  direction,
  date,
  airline,
  operatedBy,
  flightNumber,
  fareClass,
  aircraftModel,
  origin,
  destination,
  duration,
  arrivalDayOffset,
  stopsLabel = 'Direto',
  hasRefund = false,
  refundText,
}: FlightSegmentDetailProps): React.ReactElement => (
  <View className="gap-lg rounded-md bg-surface-default p-lg">
    <View className="gap-xxs">
      <View className="flex-row items-center gap-xs">
        <Icon name={direction === 'ida' ? 'flight-outbound' : 'flight-return'} size={20} />
        <Text className="font-sans text-md font-bold text-fg-secondary">Voo de {direction}</Text>
      </View>
      <Text className="font-sans text-xs font-bold text-fg-subtle">{date}</Text>
    </View>

    <View className="gap-xxs">
      <Text className="font-sans text-md font-medium text-fg-secondary">{airline}</Text>
      {operatedBy ? (
        <Text className="font-sans text-xs font-medium text-fg-subtle">Operado por: {operatedBy}</Text>
      ) : null}
      <Text className="font-sans text-xs text-fg-subtle">Voo nº: {flightNumber}</Text>
      <Text className="font-sans text-xs text-fg-subtle">Classe: {fareClass}</Text>
      <Text className="font-sans text-xs text-fg-subtle">Modelo: {aircraftModel}</Text>
    </View>

    <Divider />

    <View className="gap-md">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-xs font-medium text-fg-subtle">{origin.weekday}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">{destination.weekday}</Text>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-lg font-bold text-fg-secondary">{origin.time}</Text>
        <View className="flex-1 items-center gap-xxs px-lg">
          <Text className="font-sans text-xs text-fg-subtle">{stopsLabel}</Text>
          <View className="w-full flex-row items-center gap-xs">
            <Icon name="dot-separator" size={8} />
            <View className="h-[1px] flex-1 bg-fg-muted" />
            <Icon name="dot-separator" size={8} />
          </View>
          <Text className="font-sans text-xs text-fg-subtle">{duration}</Text>
        </View>
        <View className="flex-row items-start">
          <Text className="font-sans text-lg font-bold text-fg-secondary">{destination.time}</Text>
          {arrivalDayOffset ? (
            <Text className="font-sans text-xs font-medium text-fg-secondary">{`+${arrivalDayOffset}`}</Text>
          ) : null}
        </View>
      </View>

      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-xs font-medium text-fg-subtle">{origin.city}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">{destination.city}</Text>
      </View>

      <View className="flex-row items-start justify-between gap-lg">
        <View className="flex-1 gap-xxs">
          <Text className="font-sans text-md font-bold text-fg-secondary">{origin.code}</Text>
          <Text className="font-sans text-xs font-medium text-fg-subtle">{origin.description}</Text>
        </View>
        <View className="flex-1 items-end gap-xxs">
          <Text className="font-sans text-md font-bold text-fg-secondary">{destination.code}</Text>
          <Text className="text-right font-sans text-xs font-medium text-fg-subtle">
            {destination.description}
          </Text>
        </View>
      </View>
    </View>

    <Divider />

    <View className="flex-row items-center gap-xs">
      <Icon
        name={hasRefund ? 'check-circle' : 'close-circle'}
        size={16}
        color={hasRefund ? colors.feedback.success : colors.feedback.danger}
      />
      <Text className="font-sans text-md font-medium text-fg-subtle">
        {hasRefund ? refundText : 'Não permite cancelamento'}
      </Text>
    </View>
  </View>
);
