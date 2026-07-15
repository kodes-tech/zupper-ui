import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';

export type PackagesSearchProps = {
  destination?: string;
  origin?: string;
  dates?: string;
  travelers?: string;
  travelersSummary?: string;
  /** Habilita o CTA "Pesquisar Pacotes" (no app: destino + origem + datas escolhidos). */
  canSearch?: boolean;
  /** Esconde o CTA "Cadastre-se" quando o usuário já está logado. */
  isAuthenticated?: boolean;
  onBack?: () => void;
  onPressDestination?: () => void;
  onPressOrigin?: () => void;
  onSwapEndpoints?: () => void;
  onPressCurrentLocation?: () => void;
  onPressDates?: () => void;
  onPressTravelers?: () => void;
  onRegister?: () => void;
  onSearch?: () => void;
};

/** Campo do motor de busca de pacotes: ícone + placeholder ou valor preenchido. */
const SearchField = ({
  icon,
  placeholder,
  value,
  onPress,
}: {
  icon: IconName;
  placeholder: string;
  value?: string;
  onPress?: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={value ?? placeholder}
    onPress={onPress}
    className="h-[48px] w-full flex-row items-center gap-xs rounded-md border border-border-subtle bg-surface-default px-md"
  >
    <Icon name={icon} size={24} color={value ? colors.brand.zupper : colors.border.default} />
    <Text
      className={`font-sans text-md font-medium ${value ? 'text-fg-secondary' : 'text-border-default'}`}
    >
      {value ?? placeholder}
    </Text>
  </Pressable>
);

/**
 * PackagesSearch — tela cheia de busca de pacotes: destino/origem (com
 * inversão), "usar localização atual", datas e viajantes/classe, com o
 * rodapé de cadastro e o CTA "Pesquisar Pacotes". Apresentacional: valores
 * já formatados vêm por props; a busca de cidade/data/viajantes abre
 * externamente (HotelCitySearch/DateRangeCalendar/HotelGuestsConfig).
 * Reproduz Pacotes - Buscar do Figma.
 */
export const PackagesSearch = ({
  destination,
  origin,
  dates,
  travelers,
  travelersSummary = 'Classe econômica, número de escalas',
  canSearch = false,
  isAuthenticated = false,
  onBack,
  onPressDestination,
  onPressOrigin,
  onSwapEndpoints,
  onPressCurrentLocation,
  onPressDates,
  onPressTravelers,
  onRegister,
  onSearch,
}: PackagesSearchProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="h-[88px] flex-row items-center justify-between bg-surface-default px-xxl pb-xs pt-[40px]">
      <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
        <Icon name="back-arrow" size={24} />
      </Pressable>
      <Text className="font-sans text-lg font-bold text-fg-secondary">Pacotes</Text>
      <View className="h-[24px] w-[24px]" />
    </View>

    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-lg px-xxl pt-xl">
        <View className="relative gap-lg">
          <SearchField icon="travel-pinmap" placeholder="Destino" value={destination} onPress={onPressDestination} />
          <SearchField icon="travel-voos" placeholder="Origem" value={origin} onPress={onPressOrigin} />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Inverter origem e destino"
            onPress={onSwapEndpoints}
            className="absolute right-0 top-[32%] z-10 mr-md h-[30px] w-[30px] items-center justify-center rounded-[6px] border border-border-default bg-surface-default"
          >
            <Icon name="travel-swap" size={18} color={colors.text.subtle} />
          </Pressable>
        </View>

        <Pressable
          accessibilityRole="button"
          onPress={onPressCurrentLocation}
          className="flex-row items-center gap-xs py-xs"
        >
          <Icon name="travel-pinmap" size={24} color={colors.text.subtle} />
          <Text className="font-sans text-md font-medium text-fg-subtle">Inserir localização atual</Text>
        </Pressable>

        <SearchField icon="travel-calendar" placeholder="Data" value={dates} onPress={onPressDates} />

        <Pressable
          accessibilityRole="button"
          accessibilityLabel={travelers ?? 'Viajantes / classe'}
          onPress={onPressTravelers}
          className="h-[48px] w-full flex-row items-center justify-between rounded-md border border-border-subtle bg-surface-default px-md"
        >
          <View className="flex-row items-center gap-xs">
            <Icon name="travel-viajantes" size={24} color={colors.text.subtle} />
            <View className="gap-xxs">
              <Text className="font-sans text-xs font-medium text-fg-subtle">
                {travelers ?? '1 Viajante'}
              </Text>
              <Text className="font-sans text-md font-medium text-fg-secondary">{travelersSummary}</Text>
            </View>
          </View>
          <Icon name="dropdown-arrow" size={20} style={{ transform: [{ rotate: '90deg' }] }} />
        </Pressable>
      </View>

      <View className="gap-lg px-xxl pt-[32px]">
        {!isAuthenticated ? (
          <View className="items-center gap-lg">
            <Text className="text-center font-sans text-md font-medium text-fg-secondary">
              Se cadastre para ter uma melhor experiência
            </Text>
            <Button label="Cadastre-se" variant="secondary" fullWidth onPress={onRegister} />
          </View>
        ) : null}
        <Button label="Pesquisar Pacotes" fullWidth disabled={!canSearch} onPress={onSearch} />
      </View>
    </ScrollView>
  </View>
);
