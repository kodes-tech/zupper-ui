import React from 'react';
import { ScrollView, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { DestinationCard } from '../../molecules/DestinationCard';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type Destination = { id: string; name: string; image: ImageSourcePropType };

export type DestinationsProps = {
  destinations: Destination[];
  onBack?: () => void;
  onPressDestination?: (id: string) => void;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * Destinations — "Destinos em alta" (Ver todos): header + grade 2 colunas de
 * DestinationCard + bottom nav. Apresentacional; dados por props.
 * Reproduz `_figma/destinos`.
 */
export const Destinations = ({
  destinations,
  onBack,
  onPressDestination,
  onNavigate,
}: DestinationsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Destinos em alta" titleIcon="fire-destinos" onBack={onBack} />
      <View className="flex-row flex-wrap px-[10px] py-[10px]">
        {destinations.map((d) => (
          <View key={d.id} className="w-1/2 p-[6px]">
            <DestinationCard
              fill
              name={d.name}
              image={d.image}
              onPress={() => onPressDestination?.(d.id)}
            />
          </View>
        ))}
      </View>
    </ScrollView>
    <BottomNav onNavigate={onNavigate} />
  </View>
);
