import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type TravelSearchHistoryType = 'voo' | 'hospedagem' | 'pacote';

export type TravelSearchHistoryItemData = {
  id: string;
  type: TravelSearchHistoryType;
  /** Destino exibido (ex.: "Recife"). */
  destination: string;
  /** Datas já formatadas (ex.: "10 set - 20 set") ou "Multidestinos". */
  dates: string;
  /** Thumb do destino; ausente = placeholder com ícone de localização. */
  image?: ImageSourcePropType;
};

export type TravelSearchHistoryProps = {
  items: TravelSearchHistoryItemData[];
  /** Rótulo da ação de cada item. */
  actionLabel?: string;
  onPressItem?: (id: string) => void;
};

const TYPE_ICON: Record<TravelSearchHistoryType, IconName> = {
  voo: 'travel-voos',
  hospedagem: 'travel-hospedagens',
  pacote: 'travel-pacotes',
};

/**
 * TravelSearchHistory — seção "Sua próxima viagem está te esperando" da Home
 * do travel: título, "Pesquisas recentes" e a lista do histórico de buscas,
 * cada item com thumb do destino, tipo, datas e a ação de repetir a pesquisa.
 * Apresentacional: itens já formatados entram por props; no app a seção some
 * sem histórico — aqui o consumidor simplesmente não a renderiza.
 * Valores extraídos de libs/search-history do zupper-app.
 */
export const TravelSearchHistory = ({
  items,
  actionLabel = 'Pesquisar',
  onPressItem,
}: TravelSearchHistoryProps): React.ReactElement => (
  <View className="w-full bg-surface-tag px-[14px] pt-xl">
    <Text className="mb-xl px-xxl font-sans text-[27px] font-normal leading-[34px] text-fg-secondary">
      Sua <Text className="font-bold">próxima viagem</Text> está te{' '}
      <Text className="font-bold">esperando</Text>
    </Text>
    <View className="flex-row items-center gap-sm px-xxl">
      <Icon name="travel-maps-search" size={24} color={colors.text.subtle} />
      <Text className="mb-lg font-sans text-xl font-normal text-fg-subtle">
        Pesquisas recentes
      </Text>
    </View>
    <View className="px-xxl">
      {items.map((item, index) => (
        <View key={item.id}>
          <View className="my-xs flex-row items-center py-xl">
            {item.image ? (
              <Image
                source={item.image}
                resizeMode="cover"
                className="h-[60px] w-[60px] rounded-md bg-border-subtle"
              />
            ) : (
              <View className="h-[60px] w-[60px] items-center justify-center rounded-md bg-surface-tag">
                <Icon name="location" size={24} />
              </View>
            )}
            <View className="ml-xl flex-1 justify-center">
              <View className="mb-xxs flex-row items-center">
                <Icon name={TYPE_ICON[item.type]} size={24} color={colors.text.subtle} />
                <Text className="ml-lg font-sans text-md font-bold leading-[20px] text-fg-secondary">
                  {item.destination}
                </Text>
              </View>
              <Text className="font-sans text-xs font-medium leading-[16px] text-fg-subtle">
                {item.dates}
              </Text>
            </View>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${actionLabel} ${item.destination}`}
              onPress={() => onPressItem?.(item.id)}
              className="flex-row items-center px-lg py-md"
            >
              <Text className="mr-md font-sans text-xs font-medium leading-[16px] text-brand-zupper">
                {actionLabel}
              </Text>
              <Icon name="travel-chevron-right" size={14} color={colors.brand.zupper} />
            </Pressable>
          </View>
          {index < items.length - 1 ? <View className="mx-xl border-b border-border-subtle" /> : null}
        </View>
      ))}
    </View>
  </View>
);
