import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';

export type TravelProductTab = 'voos' | 'hospedagens' | 'pacotes';
export type TravelTripType = 'idaEVolta' | 'soIda';

export type TravelEndpoint = {
  /** Label flutuante do campo preenchido (ex.: "Recife, PE"). */
  city: string;
  /** Valor do campo (ex.: "REC - Aeroporto Internacional do Recife, PE"). */
  airport: string;
};

export type TravelHomeProps = {
  /** Saudação (ex.: "Olá, Carlos"); padrão espelha o app deslogado. */
  welcome?: string;
  subtitle?: string;
  productTab?: TravelProductTab;
  tripType?: TravelTripType;
  /** Origem selecionada; omitida = placeholder "Qual sua origem ?". */
  origin?: TravelEndpoint;
  destination?: TravelEndpoint;
  /** Datas já formatadas (ex.: "10 Set 26 - 20 Set 26"); omitidas = placeholder. */
  dates?: string;
  /** Resumo viajantes/classe. Padrão é o estado inicial real do app. */
  travelers?: string;
  /** Habilita o CTA Pesquisar (no app: origem + destino + datas escolhidos). */
  canSearch?: boolean;
  active?: BottomNavKey;
  onSelectProductTab?: (tab: TravelProductTab) => void;
  onChangeTripType?: (type: TravelTripType) => void;
  onPressOrigin?: () => void;
  onPressDestination?: () => void;
  /** Inverte origem/destino (botão entre os dois campos). */
  onSwapEndpoints?: () => void;
  onPressDates?: () => void;
  onPressTravelers?: () => void;
  onSearch?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

const PRODUCT_TABS: { key: TravelProductTab; icon: IconName; label: string }[] = [
  { key: 'voos', icon: 'travel-voos', label: 'Voos' },
  { key: 'hospedagens', icon: 'travel-hospedagens', label: 'Hospedagens' },
  { key: 'pacotes', icon: 'travel-pacotes', label: 'Pacotes' },
];

// Sombras vêm do app (styled-components) e são ortogonais ao NativeWind —
// mesma exceção documentada do LinearGradient: style computado, não className.
const searchBoxShadow: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.26,
  shadowRadius: 16,
  elevation: 8,
};

const engineCardShadow: ViewStyle = {
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.15,
  shadowRadius: 10,
  elevation: 5,
};

/** Opção do seletor Ida e Volta / Só Ida (radio "rounded" do app). */
const TripTypeOption = ({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress?: () => void;
}) => (
  <Pressable
    accessibilityRole="radio"
    accessibilityState={{ selected }}
    onPress={onPress}
    className="flex-row items-center gap-md"
  >
    <View
      className={`h-[20px] w-[20px] items-center justify-center rounded-pill border ${
        selected ? 'border-brand-strong' : 'border-border-default'
      }`}
    >
      {selected ? <View className="h-[12px] w-[12px] rounded-pill bg-brand-zupper" /> : null}
    </View>
    <Text
      className={`font-sans text-md ${
        selected ? 'font-bold text-brand-zupper' : 'font-normal text-fg-subtle'
      }`}
    >
      {label}
    </Text>
  </Pressable>
);

/**
 * Campo do motor de busca (PressableInput do app): vazio mostra ícone +
 * placeholder; preenchido vira coluna com label flutuante e o ícone na cor da
 * marca. Altura fixa de 56px nos dois estados, como no app.
 */
const TravelField = ({
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
 * TravelHome — Home do app (aba Buscar): saudação, abas de produto
 * (Voos/Hospedagens/Pacotes), tipo de viagem e o motor de busca de voos com o
 * CTA Pesquisar. Apresentacional: estado e formatação (datas, resumo de
 * viajantes) vêm por props; a integração fica no app consumidor.
 *
 * Valores extraídos do código do zupper-app (Dashboard/Home +
 * libs/aerial/search-engine + libs/app-ui) — ver preview.html ao lado.
 * As seções abaixo da dobra (ofertas/novidades/atendimento) e o motor de
 * hospedagens ficam para os próximos passos.
 */
export const TravelHome = ({
  welcome = 'Olá, viajante',
  subtitle = 'O que você deseja buscar?',
  productTab = 'voos',
  tripType = 'idaEVolta',
  origin,
  destination,
  dates,
  travelers = '1 Viajante, econômica',
  canSearch = false,
  active,
  onSelectProductTab,
  onChangeTripType,
  onPressOrigin,
  onPressDestination,
  onSwapEndpoints,
  onPressDates,
  onPressTravelers,
  onSearch,
  onNavigate,
}: TravelHomeProps): React.ReactElement => (
  <View className="flex-1 bg-surface-default">
    <ScrollView showsVerticalScrollIndicator={false} className="flex-1 bg-surface-tag">
      <View
        style={searchBoxShadow}
        className="overflow-hidden rounded-md border-b border-border-subtle bg-surface-default"
      >
        {/* Saudação */}
        <View className="flex-row items-center justify-between p-lg pb-xs">
          <View className="flex-1 gap-xs">
            <Text className="font-sans text-greetingTitle text-fg-secondary">{welcome}</Text>
            <Text className="font-sans text-lg font-normal text-fg-subtle">{subtitle}</Text>
          </View>
          <View className="min-w-[24px]" />
        </View>

        {/* Abas de produto */}
        <View className="mb-md flex-row border-b border-border-subtle bg-surface-default">
          {PRODUCT_TABS.map((tab) => {
            const isActive = tab.key === productTab;
            const color = isActive ? colors.brand.zupper : colors.text.subtle;
            return (
              <Pressable
                key={tab.key}
                accessibilityRole="tab"
                accessibilityState={{ selected: isActive }}
                onPress={() => onSelectProductTab?.(tab.key)}
                className="flex-1 items-center justify-center gap-xs py-xs"
              >
                <Icon name={tab.icon} size={25} color={color} />
                <Text
                  className={`font-sans text-md font-bold ${
                    isActive ? 'text-brand-zupper' : 'text-fg-subtle'
                  }`}
                >
                  {tab.label}
                </Text>
                {isActive ? (
                  <View className="absolute bottom-[-4px] w-[100px] border-b-[2px] border-brand-zupper" />
                ) : null}
              </Pressable>
            );
          })}
        </View>

        {/* Cena da busca (aba Voos) */}
        <View className="bg-surface-default py-lg">
          <View className="mb-[20px] w-full flex-row justify-between px-[55px]">
            <TripTypeOption
              label="Ida e Volta"
              selected={tripType === 'idaEVolta'}
              onPress={() => onChangeTripType?.('idaEVolta')}
            />
            <TripTypeOption
              label="Só Ida"
              selected={tripType === 'soIda'}
              onPress={() => onChangeTripType?.('soIda')}
            />
          </View>

          <View style={engineCardShadow} className="mx-[10px] rounded-md bg-surface-default pt-[14px]">
            <View className="gap-lg px-[10px]">
              <View className="relative gap-lg">
                <TravelField
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
                  className="absolute right-0 top-[37%] z-10 mr-md h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-border-default bg-surface-default"
                >
                  <Icon name="travel-swap" size={18} color={colors.text.subtle} />
                </Pressable>
                <TravelField
                  icon="travel-voos"
                  placeholder="Qual seu destino ?"
                  label={destination?.city}
                  value={destination?.airport}
                  onPress={onPressDestination}
                />
              </View>
              <TravelField
                icon="travel-calendar"
                placeholder={tripType === 'soIda' ? 'Data de ida' : 'Data de ida e volta'}
                label={tripType === 'soIda' ? 'Data de ida' : 'Data de ida e volta'}
                value={dates}
                onPress={onPressDates}
              />
              <TravelField
                icon="travel-viajantes"
                placeholder="Viajantes / classe"
                label="Viajantes"
                value={travelers}
                onPress={onPressTravelers}
              />
            </View>

            <View className="p-lg">
              {canSearch ? (
                <Pressable accessibilityRole="button" accessibilityLabel="Pesquisar" onPress={onSearch}>
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
                </Pressable>
              ) : (
                <View
                  accessibilityLabel="Pesquisar"
                  accessibilityState={{ disabled: true }}
                  className="min-h-[52px] flex-row items-center justify-center gap-xxs rounded-md bg-border-subtle px-screenMargin py-lg"
                >
                  <Icon name="travel-search" size={24} color={colors.text.subtle} />
                  <Text className="font-sans text-md font-medium text-fg-subtle">Pesquisar</Text>
                </View>
              )}
            </View>
          </View>
        </View>
      </View>

      {/* Abaixo da dobra: ofertas/novidades/atendimento ficam para as próximas telas. */}
      <View className="min-h-[120px] bg-surface-tag" />
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
