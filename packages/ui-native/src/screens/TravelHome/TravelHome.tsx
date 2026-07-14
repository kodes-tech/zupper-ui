import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { TravelSearchHistory } from '../../organisms/TravelSearchHistory';
import type { TravelSearchHistoryItemData } from '../../organisms/TravelSearchHistory';
import { NewsBanner } from '../../organisms/NewsBanner';
import type { NewsBannerItem } from '../../organisms/NewsBanner';
import { SupportSection } from '../../organisms/SupportSection';
import type { SupportItem } from '../../organisms/SupportSection';

export type TravelProductTab = 'voos' | 'hospedagens' | 'pacotes';
export type TravelTripType = 'idaEVolta' | 'soIda';

export type TravelEndpoint = {
  /** Label flutuante do campo preenchido (ex.: "Recife, PE"). */
  city: string;
  /** Valor do campo (ex.: "REC - Aeroporto Internacional do Recife, PE"). */
  airport: string;
};

/** Dados da busca de hospedagens (aba "Hospedagens"). */
export type TravelStay = {
  /** Destino (cidade). Omitido = placeholder "Qual seu destino ?". */
  destination?: string;
  /** Datas de entrada/saída já formatadas. Omitido = placeholder. */
  dates?: string;
  /** Resumo de hóspedes/quartos (ex.: "2 Adultos, 1 Quarto"). Omitido = placeholder. */
  guests?: string;
  /** Habilita o CTA (no app: destino + datas escolhidos). */
  canSearch?: boolean;
  onPressDestination?: () => void;
  onPressDates?: () => void;
  onPressGuests?: () => void;
  onSearch?: () => void;
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
  /** Dados da aba "Hospedagens". Usado quando `productTab === 'hospedagens'`. */
  stay?: TravelStay;
  /**
   * Histórico de buscas ("Sua próxima viagem está te esperando"), logo abaixo
   * do motor de busca. Omitido/vazio = sem a seção, como no app sem histórico.
   */
  searchHistory?: TravelSearchHistoryItemData[];
  /** Banners da seção "Novidades". Omitido/vazio = sem a seção. */
  news?: NewsBannerItem[];
  /** Canais da seção "Atendimento Zupper". Omitido/vazio = sem a seção. */
  support?: SupportItem[];
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
  /** Repetir uma pesquisa do histórico (recebe o id do item). */
  onPressHistoryItem?: (id: string) => void;
  /** Abrir um canal de atendimento (recebe o id do item). */
  onPressSupport?: (id: string) => void;
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
 * CTA "Pesquisar" do rodapé do motor (SearchEngineFooter do app): gradiente
 * quando habilitado, cinza quando não. O label muda por produto (voos x
 * hospedagens).
 */
const SearchCta = ({
  label,
  enabled,
  onPress,
}: {
  label: string;
  enabled: boolean;
  onPress?: () => void;
}) =>
  enabled ? (
    <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress}>
      <LinearGradient
        colors={[...colors.gradient.searchCta]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={{ minHeight: 52, borderRadius: 8, alignItems: 'center', justifyContent: 'center' }}
      >
        <View className="h-[52px] flex-row items-center justify-center gap-xxs px-screenMargin py-lg">
          <Icon name="travel-search" size={24} color={colors.text.primary} />
          <Text className="font-sans text-md font-medium text-fg-primary">{label}</Text>
        </View>
      </LinearGradient>
    </Pressable>
  ) : (
    <View
      accessibilityLabel={label}
      accessibilityState={{ disabled: true }}
      className="min-h-[52px] flex-row items-center justify-center gap-xxs rounded-md bg-border-subtle px-screenMargin py-lg"
    >
      <Icon name="travel-search" size={24} color={colors.text.subtle} />
      <Text className="font-sans text-md font-medium text-fg-subtle">{label}</Text>
    </View>
  );

/** Motor de busca de voos: origem/destino (com inversão), datas e viajantes. */
const FlightEngine = ({
  tripType,
  origin,
  destination,
  dates,
  travelers,
  canSearch,
  onChangeTripType,
  onPressOrigin,
  onPressDestination,
  onSwapEndpoints,
  onPressDates,
  onPressTravelers,
  onSearch,
}: {
  tripType: TravelTripType;
  origin?: TravelEndpoint;
  destination?: TravelEndpoint;
  dates?: string;
  travelers: string;
  canSearch: boolean;
  onChangeTripType?: (type: TravelTripType) => void;
  onPressOrigin?: () => void;
  onPressDestination?: () => void;
  onSwapEndpoints?: () => void;
  onPressDates?: () => void;
  onPressTravelers?: () => void;
  onSearch?: () => void;
}) => (
  <>
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
        <SearchCta label="Pesquisar" enabled={canSearch} onPress={onSearch} />
      </View>
    </View>
  </>
);

/** Motor de busca de hospedagens: destino (cidade), datas e hóspedes/quartos. */
const StayEngine = ({ stay }: { stay: TravelStay }) => (
  <View style={engineCardShadow} className="mx-[10px] rounded-md bg-surface-default pt-[14px]">
    <View className="gap-lg px-[10px]">
      <TravelField
        icon="travel-pinmap"
        placeholder="Qual seu destino ?"
        label="Destino"
        value={stay.destination}
        onPress={stay.onPressDestination}
      />
      <TravelField
        icon="travel-calendar"
        placeholder="Datas de entrada e saída"
        label="Datas de entrada e saída"
        value={stay.dates}
        onPress={stay.onPressDates}
      />
      <TravelField
        icon="travel-guests"
        placeholder="1 Adulto, 1 Quarto"
        label="Hóspedes"
        value={stay.guests}
        onPress={stay.onPressGuests}
      />
    </View>
    <View className="p-lg">
      <SearchCta
        label="Pesquisar hospedagens"
        enabled={Boolean(stay.canSearch)}
        onPress={stay.onSearch}
      />
    </View>
  </View>
);

/** Aba "Pacotes": no app abre um WebView externo — sem motor de busca próprio. */
const PacotesNote = () => (
  <View className="mx-[10px] items-center gap-md rounded-md border border-border-subtle bg-surface-default px-xl py-xxl">
    <Icon name="travel-pacotes" size={40} color={colors.brand.zupper} />
    <Text className="text-center font-sans text-md font-medium text-fg-subtle">
      Os pacotes abrem no site do Zupper.
    </Text>
  </View>
);

/**
 * TravelHome — Home do app (aba Buscar): saudação, abas de produto
 * (Voos/Hospedagens/Pacotes) e o motor de busca da aba ativa — voos (com tipo
 * de viagem) ou hospedagens; pacotes abre WebView no app, então aqui é só uma
 * nota. Abaixo, as seções de conteúdo (histórico/novidades/atendimento).
 * Apresentacional: estado e formatação vêm por props; a integração fica no app.
 *
 * Valores extraídos do código do zupper-app (Dashboard/Home +
 * libs/aerial/search-engine + libs/hotel/search-engine + libs/app-ui) — ver
 * preview.html ao lado. Falta só o DealItem (ofertas) entre o motor e o
 * histórico.
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
  stay = {},
  searchHistory,
  news,
  support,
  active,
  onSelectProductTab,
  onChangeTripType,
  onPressOrigin,
  onPressDestination,
  onSwapEndpoints,
  onPressDates,
  onPressTravelers,
  onSearch,
  onPressHistoryItem,
  onPressSupport,
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

        {/* Cena da busca — motor conforme a aba de produto ativa. */}
        <View className="bg-surface-default py-lg">
          {productTab === 'voos' ? (
            <FlightEngine
              tripType={tripType}
              origin={origin}
              destination={destination}
              dates={dates}
              travelers={travelers}
              canSearch={canSearch}
              onChangeTripType={onChangeTripType}
              onPressOrigin={onPressOrigin}
              onPressDestination={onPressDestination}
              onSwapEndpoints={onSwapEndpoints}
              onPressDates={onPressDates}
              onPressTravelers={onPressTravelers}
              onSearch={onSearch}
            />
          ) : null}
          {productTab === 'hospedagens' ? <StayEngine stay={stay} /> : null}
          {productTab === 'pacotes' ? <PacotesNote /> : null}
        </View>
      </View>

      {/* Histórico de buscas — no app aparece logo abaixo do motor, com margem de 20. */}
      {searchHistory?.length ? (
        <View className="mt-[20px]">
          <TravelSearchHistory items={searchHistory} onPressItem={onPressHistoryItem} />
        </View>
      ) : null}

      {/*
       * Abaixo da dobra, na ordem do app: ofertas de voo (DealItem — ainda não
       * extraído), Novidades e Atendimento Zupper.
       */}
      <View className="bg-surface-tag pt-xl">
        {news?.length ? <NewsBanner banners={news} /> : null}
        {support?.length ? <SupportSection items={support} onPressItem={onPressSupport} /> : null}
      </View>
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
