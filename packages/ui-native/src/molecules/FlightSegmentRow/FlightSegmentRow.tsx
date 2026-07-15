import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type FlightSegmentDirection = 'ida' | 'volta';

export type FlightSegmentData = {
  direction: FlightSegmentDirection;
  /** Código IATA de origem (ex.: "FLN"). */
  originCode: string;
  /** Código IATA de destino (ex.: "CGH"). */
  destinationCode: string;
  /** Sigla/nome da companhia, exibida no selo (ex.: "G3"). */
  airlineCode: string;
  /** "Direto" ou "N paradas". */
  stopsLabel: string;
  departureTime: string;
  arrivalTime: string;
  /** Data já formatada (ex.: "20 Ago 2024"). */
  date: string;
};

export type FlightSegmentRowProps = {
  segment: FlightSegmentData;
};

const DIRECTION_LABEL: Record<FlightSegmentDirection, string> = { ida: 'IDA', volta: 'VOLTA' };

/**
 * FlightSegmentRow — trecho de voo (ida ou volta) dentro do card de pacote:
 * selo da direção, companhia, rota (origem — paradas — destino) e o par
 * horário/data de partida e chegada. Apresentacional: tudo já formatado por
 * props. Reproduz o bloco "Voos" dos cards de resultado de pacotes.
 */
export const FlightSegmentRow = ({ segment }: FlightSegmentRowProps): React.ReactElement => (
  <View className="flex-row items-center gap-md">
    <View className="h-[32px] w-[81px] flex-row items-center justify-center gap-xs rounded-sm bg-brand-chipSurface p-xs">
      <Icon name="travel-voos" size={24} color={colors.text.secondary} />
      <Text className="font-sans text-md font-bold text-fg-secondary">
        {DIRECTION_LABEL[segment.direction]}
      </Text>
    </View>

    <View className="h-[32px] w-[32px] items-center justify-center rounded-sm bg-surface-tag">
      <Text className="font-sans text-xs font-bold text-fg-subtle">{segment.airlineCode}</Text>
    </View>

    <View className="flex-1 gap-xxs">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-md font-medium text-fg-subtle">{segment.originCode}</Text>
        <Text className="flex-1 text-center font-sans text-xs font-medium text-fg-muted">
          {segment.stopsLabel}
        </Text>
        <Text className="font-sans text-md font-medium text-fg-subtle">{segment.destinationCode}</Text>
      </View>
      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-md font-bold text-fg-secondary">{segment.departureTime}</Text>
        <Text className="flex-1 text-center font-sans text-xs font-medium text-fg-muted">
          {segment.date}
        </Text>
        <Text className="font-sans text-md font-bold text-fg-secondary">{segment.arrivalTime}</Text>
      </View>
    </View>
  </View>
);
