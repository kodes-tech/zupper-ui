import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export type NewsBannerItem = {
  id: string;
  image: ImageSourcePropType;
  onPress?: () => void;
};

export type NewsBannerProps = {
  title?: string;
  banners: NewsBannerItem[];
  /** Banner em destaque (índice do indicador aceso). */
  activeIndex?: number;
};

/**
 * NewsBanner — seção "Novidades" da Home: título + carrossel de banners com
 * indicador de posição. Apresentacional: banners e a ação de cada um vêm por
 * props; o carrossel real (auto-play) fica no app — aqui é um scroll horizontal
 * paginado com os dots. Extraído de libs/banners (BannerCarousel altura 104,
 * dots #009DAF) do zupper-app.
 */
export const NewsBanner = ({
  title = 'Novidades',
  banners,
  activeIndex = 0,
}: NewsBannerProps): React.ReactElement => (
  <View className="pb-[40px]">
    <Text className="mb-md px-screenMargin font-sans text-[19px] font-bold text-fg-body">{title}</Text>
    <ScrollView
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
    >
      {banners.map((banner) => (
        <Pressable key={banner.id} accessibilityRole="button" onPress={banner.onPress}>
          <Image
            source={banner.image}
            resizeMode="cover"
            className="h-[104px] w-[320px] rounded-md bg-border-subtle"
          />
        </Pressable>
      ))}
    </ScrollView>
    {banners.length > 1 ? (
      <View className="mt-lg flex-row items-center justify-center gap-xs">
        {banners.map((banner, index) => (
          <View
            key={banner.id}
            className={`h-[6px] w-[6px] rounded-pill ${
              index === activeIndex ? 'bg-brand-zupper' : 'bg-border-default'
            }`}
          />
        ))}
      </View>
    ) : null}
  </View>
);
