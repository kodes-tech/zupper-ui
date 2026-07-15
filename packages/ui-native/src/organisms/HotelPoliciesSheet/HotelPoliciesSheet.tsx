import React from 'react';
import { Text, View } from 'react-native';
import { BottomSheet } from '../BottomSheet';

export type HotelPoliciesSheetProps = {
  title: string;
  description: string;
  onDismiss?: () => void;
};

/**
 * HotelPoliciesSheet — sheet de regras/políticas da tarifa: apenas um título
 * (ex.: "Regras da tarifa do adulto") e um parágrafo descritivo, sem lista.
 * Reproduz HotelAccommodationPolicies do zupper-app.
 */
export const HotelPoliciesSheet = ({
  title,
  description,
  onDismiss,
}: HotelPoliciesSheetProps): React.ReactElement => (
  <BottomSheet onDismiss={onDismiss}>
    <View className="gap-md px-screenMargin pb-lg pt-md">
      <Text className="font-sans text-[17px] font-bold text-fg-primary">{title}</Text>
      <Text className="font-sans text-md leading-[20px] text-fg-secondary">{description}</Text>
    </View>
  </BottomSheet>
);
