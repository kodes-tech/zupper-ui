import React from 'react';
import { Image, Pressable, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';

export type PhotoGridProps = {
  photos: ImageSourcePropType[];
  onPressPhoto?: (index: number) => void;
};

/**
 * PhotoGrid — grade 3 colunas de fotos quadradas (aba Fotos do perfil).
 */
export const PhotoGrid = ({ photos, onPressPhoto }: PhotoGridProps): React.ReactElement => (
  <View className="flex-row flex-wrap">
    {photos.map((photo, index) => (
      <Pressable
        // grade estática de imagens; índice é chave estável o suficiente aqui
        key={index}
        accessibilityRole="button"
        onPress={() => onPressPhoto?.(index)}
        className="aspect-square w-1/3 p-[2px]"
      >
        <Image source={photo} resizeMode="cover" className="h-full w-full" />
      </Pressable>
    ))}
  </View>
);
