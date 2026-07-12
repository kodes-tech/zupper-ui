import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType, PressableProps } from 'react-native';
import { colors } from '@zupper/tokens';

export type DestinationCardProps = PressableProps & {
  name: string;
  image: ImageSourcePropType;
};

/**
 * DestinationCard — card do carrossel "Destinos em alta": foto + overlay + nome.
 */
export const DestinationCard = ({
  name,
  image,
  ...rest
}: DestinationCardProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    className="h-[150px] w-[130px] overflow-hidden rounded-sm"
    {...rest}
  >
    <Image
      source={image}
      resizeMode="cover"
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
    />
    <LinearGradient
      colors={[...colors.gradient.overlay]}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
    />
    <View className="flex-1 justify-end p-lg">
      <Text className="font-sans text-cardTitle text-fg-inverse">{name}</Text>
    </View>
  </Pressable>
);
