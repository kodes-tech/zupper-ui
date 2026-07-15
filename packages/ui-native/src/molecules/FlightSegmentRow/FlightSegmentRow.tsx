import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { AirlineBadge } from '../AirlineBadge';

export type FlightSegmentDirection = 'ida' | 'volta';

export type FlightSegmentData = {
  direction: FlightSegmentDirection;
  /** Código IATA de origem (ex.: "FLN"). */
  originCode: string;
  /** Código IATA de destino (ex.: "CGH"). */
  destinationCode: string;
  /** Sigla da companhia, exibida no selo quando não há logo (ex.: "G3"). */
  airlineCode: string;
  /** Logo da companhia (ex.: `airline-gol`); tem prioridade sobre a sigla. */
  airlineIcon?: IconName;
  /** Cor de marca do selo (ex.: "#F97316" da Gol). Sem cor = selo neutro. */
  airlineColor?: string;
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
    <View className="h-[32px] w-[81px] flex-row items-center gap-xs rounded-sm bg-brand-chipSurface p-xs">
      <Icon
        name="travel-voos"
        size={24}
        color={colors.text.secondary}
        style={segment.direction === 'volta' ? { transform: [{ scaleX: -1 }] } : undefined}
      />
      <Text className="font-sans text-md font-bold text-fg-secondary">
        {DIRECTION_LABEL[segment.direction]}
      </Text>
    </View>

    <AirlineBadge code={segment.airlineCode} icon={segment.airlineIcon} color={segment.airlineColor} />


    <View className="flex-1 gap-xxs">
      <View className="flex-row items-center gap-xs">
        <Text className="font-sans text-md font-medium text-fg-subtle">{segment.originCode}</Text>
        <View className="relative h-[18px] flex-1 items-center justify-center">
          <View className="absolute left-[3px] right-[3px] top-[8px] h-[1px] bg-fg-muted" />
          <View className="absolute left-0 top-[6px] h-[6px] w-[6px] rounded-pill border border-fg-muted bg-surface-default" />
          <View className="absolute right-0 top-[6px] h-[6px] w-[6px] rounded-pill border border-fg-muted bg-surface-default" />
          <View className="rounded-sm bg-surface-default px-xs">
            <Text className="font-sans text-xs font-medium text-fg-muted">{segment.stopsLabel}</Text>
          </View>
        </View>
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
