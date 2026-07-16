import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { FlightSegmentDetail } from '../../organisms/FlightSegmentDetail';
import type { FlightSegmentDetailProps } from '../../organisms/FlightSegmentDetail';
import { FlightBaggageItem } from '../../molecules/FlightBaggageItem';

export type SliceDetailsConnection = {
  /** Tempo de espera já formatado (ex.: "2h15"). */
  waitTime: string;
  /** Cidade da conexão (ex.: "Brasília"). */
  destination: string;
  /** Troca de aeronave nessa conexão — muda o texto do aviso. */
  hasAircraftChange?: boolean;
};

export type SliceDetailsBaggage = {
  /** Mochila ou bolsa (item pessoal). */
  schoolbag?: boolean;
  /** Bagagem de mão. */
  suitcase?: boolean;
  /** Bagagem para despachar. */
  handbag?: boolean;
};

export type SliceDetailsProps = {
  /** Um item por trecho do voo (normalmente 1; mais de 1 = conexões). */
  segments: FlightSegmentDetailProps[];
  /** Avisos de conexão entre trechos — length = segments.length - 1. */
  connections?: SliceDetailsConnection[];
  baggage: SliceDetailsBaggage;
  onBack?: () => void;
  onShare?: () => void;
  onPressCancellationPolicy?: () => void;
};

const BAGGAGE_COPY = {
  schoolbag: {
    on: { title: 'Inclui uma mochila ou bolsa', subtitle: 'Tamanho limitado a caber abaixo do assento dianteiro.' },
    off: {
      title: 'Não inclui mochila ou bolsa',
      subtitle: 'É possível alterar a tarifa incluindo nas opções ao lado.',
    },
  },
  suitcase: {
    on: {
      title: 'Inclui bagagem de mão',
      subtitle: 'Tamanho limitado a caber no compartimento superior do avião. Até 10kg.',
    },
    off: {
      title: 'Não inclui bagagem de mão',
      subtitle: 'É possível alterar a tarifa incluindo nas opções ao lado.',
    },
  },
  handbag: {
    on: {
      title: 'Inclui bagagem para despachar',
      subtitle: '1 Mala de até 23kg por adulto. O despache deve ser feito durante o check-in no aeroporto.',
    },
    off: {
      title: 'Não inclui bagagem para despachar',
      subtitle: 'É possível incluir bagagem despachada alterando a opção de tarifa no comparativo de tarifas.',
    },
  },
} as const;

const BAGGAGE_ICON = {
  schoolbag: 'baggage-personal',
  suitcase: 'baggage-carryon',
  handbag: 'baggage-checked',
} as const;

/**
 * SliceDetails — detalhes do voo: cabeçalho (voltar/compartilhar), um bloco
 * FlightSegmentDetail por trecho (com aviso de conexão entre eles, quando há
 * mais de um), a seção "Bagagem" e o link "Ver política de cancelamento".
 * Extraído do FlightDetailsScreen (apps/zupper-app/.../Air/SliceDetails) +
 * FlightBaggageSection (libs/aerial/flights) do zupper-app. Apresentacional:
 * dados por props, sem a lógica de tarifa/família/ANAC do app.
 */
export const SliceDetails = ({
  segments,
  connections = [],
  baggage,
  onBack,
  onShare,
  onPressCancellationPolicy,
}: SliceDetailsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="flex-row items-center justify-between bg-surface-default px-xxl pb-lg pt-[40px]">
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
        <Icon name="back-arrow" size={24} />
      </Pressable>
      <Text className="font-sans text-lg font-bold text-fg-secondary">Detalhes do Voo</Text>
      <Pressable accessibilityRole="button" accessibilityLabel="Compartilhar" onPress={onShare}>
        <Icon name="social-share" size={20} />
      </Pressable>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-lg px-xxl py-lg">
        {segments.map((segment, index) => (
          <React.Fragment key={`${segment.direction}-${index}`}>
            <FlightSegmentDetail {...segment} />
            {connections[index] ? (
              <View className="flex-row items-center gap-xs self-center rounded-pill bg-surface-default px-lg py-sm">
                <Icon name="clock" size={16} />
                <Text className="font-sans text-xs font-medium text-fg-subtle">
                  {connections[index].hasAircraftChange ? 'Troca de aeronave: ' : ''}
                  Espera de {connections[index].waitTime} em {connections[index].destination}
                </Text>
              </View>
            ) : null}
          </React.Fragment>
        ))}
      </View>

      <View className="gap-lg bg-surface-default px-xxl py-xl">
        <Text className="font-sans text-lg font-bold text-fg-secondary">Bagagem</Text>
        {(['schoolbag', 'suitcase', 'handbag'] as const).map((key) => {
          const included = Boolean(baggage[key]);
          const copy = BAGGAGE_COPY[key][included ? 'on' : 'off'];
          return (
            <FlightBaggageItem
              key={key}
              icon={BAGGAGE_ICON[key]}
              title={copy.title}
              subtitle={copy.subtitle}
              included={included}
            />
          );
        })}
      </View>

      <View className="items-center px-xxl py-xl">
        <Pressable accessibilityRole="button" onPress={onPressCancellationPolicy}>
          <Text className="font-sans text-md font-medium text-fg-link underline">
            Ver política de cancelamento
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  </View>
);
