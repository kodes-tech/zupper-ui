import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { AirlineBadge } from '../../molecules/AirlineBadge';

export type FlightItineraryDirection = 'ida' | 'volta';

export type FlightItinerary = {
  direction: FlightItineraryDirection;
  /** Data no cabeçalho (ex.: "Qua, 24 de maio 2024"). */
  headerDate: string;
  /** Companhia principal (ex.: "Gol airlines"). */
  airline: string;
  /** Sigla exibida no selo da companhia quando não há logo (ex.: "G3"). */
  airlineCode: string;
  /** Logo da companhia (ex.: `airline-gol`); tem prioridade sobre a sigla. */
  airlineIcon?: IconName;
  /** Cor de marca do selo (ex.: "#F97316" da Gol). Sem cor = selo neutro. */
  airlineColor?: string;
  /** Companhia operadora, quando diferente (ex.: "Latam Airlines"). */
  operatedBy?: string;
  flightNumber: string;
  travelClass: string;
  aircraft: string;
  departureTime: string;
  departureCity: string;
  departureDate: string;
  arrivalTime: string;
  arrivalCity: string;
  arrivalDate: string;
  /** "Direto" ou "N paradas". */
  stopsLabel: string;
  /** Duração total (ex.: "1h50"). */
  duration: string;
  originCode: string;
  originAirport: string;
  destinationCode: string;
  destinationAirport: string;
};

export type FlightItineraryCardProps = {
  itinerary: FlightItinerary;
  /** Texto de rodapé (ex.: aviso ANAC). Omitido = sem o bloco. */
  disclaimer?: string;
};

const DIRECTION_LABEL: Record<FlightItineraryDirection, string> = {
  ida: 'Voo de ida',
  volta: 'Voo de volta',
};

/** Coluna de horário (partida/chegada): data, hora em destaque e cidade. */
const TimeColumn = ({
  date,
  time,
  city,
  align,
}: {
  date: string;
  time: string;
  city: string;
  align: 'start' | 'end';
}) => (
  <View className={align === 'end' ? 'items-end' : 'items-start'}>
    <Text className="font-sans text-xs font-medium text-fg-subtle">{date}</Text>
    <Text className="font-sans text-[22px] font-bold leading-[32px] text-fg-secondary">{time}</Text>
    <Text className="font-sans text-xs font-medium text-fg-subtle">{city}</Text>
  </View>
);

/**
 * FlightItineraryCard — card completo de um trecho (ida ou volta) do pacote:
 * cabeçalho com a direção e a data, a companhia (+ operadora e nº do voo/
 * classe/modelo), os horários de partida/chegada com paradas e duração, os
 * aeroportos e um aviso opcional. Apresentacional: dados já formatados por
 * props. Reproduz "Lista IDA - Melhor preço" do resumo do pacote (Figma).
 */
export const FlightItineraryCard = ({
  itinerary: f,
  disclaimer,
}: FlightItineraryCardProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xl py-xl">
    {/* Cabeçalho */}
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-xs">
        <Icon
          name="travel-voos"
          size={24}
          color={colors.text.secondary}
          style={f.direction === 'volta' ? { transform: [{ scaleX: -1 }] } : undefined}
        />
        <Text className="font-sans text-md font-bold text-fg-secondary">
          {DIRECTION_LABEL[f.direction]}
        </Text>
      </View>
      <Text className="font-sans text-xs font-medium text-fg-body">{f.headerDate}</Text>
    </View>

    {/* Companhia + metadados do voo */}
    <View className="flex-row items-start justify-between gap-md">
      <View className="flex-1 gap-xs">
        <View className="flex-row items-center gap-xs">
          <AirlineBadge code={f.airlineCode} icon={f.airlineIcon} color={f.airlineColor} />
          <Text className="font-sans text-md font-bold text-fg-secondary">{f.airline}</Text>
        </View>
        {f.operatedBy ? (
          <Text className="font-sans text-xs font-medium text-fg-subtle">Operado por: {f.operatedBy}</Text>
        ) : null}
      </View>
      <View className="items-end">
        <Text className="font-sans text-xs font-medium text-fg-subtle">Voo nº: {f.flightNumber}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">Classe: {f.travelClass}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">Modelo: {f.aircraft}</Text>
      </View>
    </View>

    <Divider />

    {/* Horários + paradas/duração */}
    <View className="flex-row items-center justify-between gap-md">
      <TimeColumn date={f.departureDate} time={f.departureTime} city={f.departureCity} align="start" />
      <View className="flex-1 items-center">
        <Text className="font-sans text-xs font-medium text-fg-subtle">{f.stopsLabel}</Text>
        <View className="my-xxs h-[1px] w-full bg-border-default" />
        <Text className="font-sans text-xs font-medium text-fg-subtle">{f.duration}</Text>
      </View>
      <TimeColumn date={f.arrivalDate} time={f.arrivalTime} city={f.arrivalCity} align="end" />
    </View>

    {/* Aeroportos */}
    <View className="flex-row items-start justify-between gap-md">
      <View className="flex-1">
        <Text className="font-sans text-md font-bold text-fg-secondary">{f.originCode}</Text>
        <Text className="font-sans text-xs font-medium text-fg-subtle">{f.originAirport}</Text>
      </View>
      <View className="flex-1 items-end">
        <Text className="font-sans text-md font-bold text-fg-secondary">{f.destinationCode}</Text>
        <Text className="text-right font-sans text-xs font-medium text-fg-subtle">
          {f.destinationAirport}
        </Text>
      </View>
    </View>

    {disclaimer ? (
      <>
        <Divider />
        <Text className="font-sans text-xs font-medium text-fg-subtle">{disclaimer}</Text>
      </>
    ) : null}
  </View>
);
