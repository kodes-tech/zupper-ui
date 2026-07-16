import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type AirSearchEndpoint = {
  /** Label flutuante do campo preenchido (ex.: "Recife, PE"). */
  city: string;
  /** Valor do campo (ex.: "REC - Aeroporto Internacional do Recife, PE"). */
  airport: string;
};

export type AirSearchProps = {
  origin?: AirSearchEndpoint;
  destination?: AirSearchEndpoint;
  /** Datas já formatadas (ex.: "10 Set 26 - 20 Set 26"). */
  dates?: string;
  /** Resumo viajantes/classe (ex.: "2 Viajantes, econômica"). */
  travelers?: string;
  /** Habilita "Pesquisar" — no app: origem + destino + datas escolhidos. */
  canSearch?: boolean;
  onBack?: () => void;
  onPressOrigin?: () => void;
  onPressDestination?: () => void;
  /** Inverte origem/destino (botão entre os dois campos). */
  onSwapEndpoints?: () => void;
  onPressDates?: () => void;
  onPressTravelers?: () => void;
  onSearch?: () => void;
};

/**
 * Campo do motor de busca (AerialSearchInput/PressableInput do app): vazio
 * mostra ícone + placeholder cinza; preenchido vira coluna com label acima e
 * o ícone/texto na cor da marca. Mesmo padrão do motor embutido em `TravelHome`.
 */
const AirField = ({
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
 * CTA "Pesquisar" do rodapé do motor (SearchEngineFooter do app, compartilhado
 * com o de hospedagem): gradiente laranja→amarelo quando habilitado, cinza
 * quando não — igual ao já usado no motor embutido em `TravelHome`.
 */
const SearchCta = ({ enabled, onPress }: { enabled: boolean; onPress?: () => void }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel="Pesquisar"
    accessibilityState={{ disabled: !enabled }}
    disabled={!enabled}
    onPress={onPress}
  >
    {enabled ? (
      <LinearGradient
        colors={[...colors.gradient.searchCta]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ minHeight: 52, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
      >
        <View className="h-[52px] flex-row items-center justify-center gap-xxs px-screenMargin py-lg">
          <Icon name="travel-search" size={24} color={colors.text.primary} />
          <Text className="font-sans text-md font-medium text-fg-primary">Pesquisar</Text>
        </View>
      </LinearGradient>
    ) : (
      <View className="min-h-[52px] flex-row items-center justify-center gap-xxs rounded-md bg-border-subtle px-screenMargin py-lg">
        <Icon name="travel-search" size={24} color={colors.text.subtle} />
        <Text className="font-sans text-md font-medium text-fg-subtle">Pesquisar</Text>
      </View>
    )}
  </Pressable>
);

/**
 * AirSearch — tela cheia de busca de voos: origem/destino (com inversão),
 * data de ida e volta e viajantes/classe, com o CTA "Pesquisar" (desabilitado
 * até origem + destino + datas escolhidos). Apresentacional: valores já
 * formatados vêm por props; a busca de aeroporto/data/viajantes abre
 * externamente. Reproduz `Air/Search` + `AerialSearchEngine` do zupper-app —
 * acessada a partir de "editar busca" em `FlightResults`, não como porta de
 * entrada principal (essa é a aba "Voos" da `TravelHome`).
 *
 * Diferente da `TravelHome`, a tela real não tem seletor Ida e Volta/Só Ida
 * nem cabeçalho próprio (o `AerialSearchEngine` embute só os campos) — o
 * título "Voos" e o botão de voltar aqui seguem o mesmo padrão de cabeçalho
 * das demais telas do design system, por consistência.
 */
export const AirSearch = ({
  origin,
  destination,
  dates,
  travelers,
  canSearch = false,
  onBack,
  onPressOrigin,
  onPressDestination,
  onSwapEndpoints,
  onPressDates,
  onPressTravelers,
  onSearch,
}: AirSearchProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="flex-row items-center gap-lg bg-surface-default px-xxl pb-lg pt-[40px]">
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
        <Icon name="back-arrow" size={24} />
      </Pressable>
      <Text className="flex-1 font-sans text-lg font-bold text-fg-secondary">Voos</Text>
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-md px-xxl pt-xl">
        <View className="relative gap-md">
          <AirField
            icon="travel-pinmap"
            placeholder="Qual sua origem ?"
            label={origin?.city}
            value={origin?.airport}
            onPress={onPressOrigin}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Inverter origem e destino"
            onPress={onSwapEndpoints}
            className="absolute right-[8px] top-[37px] z-10 h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-border-default bg-surface-default"
          >
            <Icon name="travel-swap" size={18} color={colors.text.subtle} />
          </Pressable>
          <AirField
            icon="travel-voos"
            placeholder="Qual seu destino ?"
            label={destination?.city}
            value={destination?.airport}
            onPress={onPressDestination}
          />
        </View>

        <AirField
          icon="travel-calendar"
          placeholder="Data de ida e volta"
          label="Data de ida e volta"
          value={dates}
          onPress={onPressDates}
        />

        <AirField
          icon="travel-viajantes"
          placeholder="Viajantes / classe"
          label="Viajantes"
          value={travelers}
          onPress={onPressTravelers}
        />
      </View>

      <View className="px-xxl py-xxl">
        <SearchCta enabled={canSearch} onPress={onSearch} />
      </View>
    </ScrollView>
  </View>
);
