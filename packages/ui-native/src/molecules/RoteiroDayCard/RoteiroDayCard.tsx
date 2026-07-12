import React from 'react';
import { Text, View } from 'react-native';

export type RoteiroStop = {
  id: string;
  /** Período do dia (ex.: "MANHÃ"). */
  period: string;
  title: string;
  description: string;
};

export type RoteiroDayCardProps = {
  /** Rótulo do dia (ex.: "Dia 1."). */
  day: string;
  /** Título do dia (ex.: "Recife Antigo"). */
  title: string;
  stops: RoteiroStop[];
};

/**
 * RoteiroDayCard — card de um dia do roteiro: cabeçalho (Dia N + título) e a
 * lista de paradas com a linha do tempo (bolinha + conector). A linha some na
 * última parada. Reproduz o "card-roteiro" de `_figma/conteudo`; o conector é
 * desenhado com Views (tokens `brand.connectorDot`/`connectorLine`), não SVG,
 * porque a linha precisa esticar conforme a altura da parada.
 */
export const RoteiroDayCard = ({
  day,
  title,
  stops,
}: RoteiroDayCardProps): React.ReactElement => (
  <View className="w-full gap-xl rounded-lg border border-border-default bg-surface-default p-xl">
    <View className="flex-row gap-[10px]">
      <Text className="font-sans text-[18px] font-bold text-brand-strong">{day}</Text>
      <Text className="font-sans text-[18px] font-bold text-fg-primary">{title}</Text>
    </View>

    <View className="gap-[10px]">
      {stops.map((stop, index) => {
        const isLast = index === stops.length - 1;
        return (
          <View key={stop.id} className="flex-row items-start gap-[10px]">
            <View className="w-[10px] items-center self-stretch">
              <View className="h-[10px] w-[10px] rounded-pill bg-brand-connectorDot" />
              {!isLast ? (
                <View className="mt-xxs w-[2px] flex-1 bg-brand-connectorLine" />
              ) : null}
            </View>
            <View className="flex-1 gap-xxs">
              <Text className="font-sans text-caption text-fg-muted">{stop.period}</Text>
              <Text className="font-sans text-authorName text-fg-primary">{stop.title}</Text>
              <Text className="font-sans text-caption text-fg-secondary">{stop.description}</Text>
            </View>
          </View>
        );
      })}
    </View>
  </View>
);
