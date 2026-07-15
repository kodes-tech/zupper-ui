import React from 'react';
import { Text, View } from 'react-native';

export type TravelerEntry = {
  /** Papel + quarto (ex.: "Adulto 1 (Quarto 1)", "Criança (Quarto 1)"). */
  role: string;
  /** Nome + data de nascimento (ex.: "Maria Joaquina Silva, 30/11/1991"). */
  details: string;
};

export type TravelersListProps = {
  travelers: TravelerEntry[];
};

/**
 * TravelersList — bloco "Viajantes": lista de viajantes do pacote com o papel
 * (adulto/criança + quarto) e nome/nascimento, separados por divisórias.
 * Apresentacional: dados já formatados vêm por props. Reproduz "Viajantes" do
 * resumo do pacote (Figma).
 */
export const TravelersList = ({ travelers }: TravelersListProps): React.ReactElement => (
  <View className="gap-lg bg-surface-default px-xxl py-xl">
    <Text className="font-sans text-xl font-bold text-fg-secondary">Viajantes</Text>
    <View className="gap-md">
      {travelers.map((traveler, index) => (
        <View key={`${traveler.role}-${index}`} className="gap-md">
          <View className="gap-xxs">
            <Text className="font-sans text-md font-bold text-fg-secondary">{traveler.role}</Text>
            <Text className="font-sans text-md font-medium text-fg-subtle">{traveler.details}</Text>
          </View>
          {index < travelers.length - 1 ? <View className="border-b border-border-subtle" /> : null}
        </View>
      ))}
    </View>
  </View>
);
