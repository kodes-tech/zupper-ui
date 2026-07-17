import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Button } from '../../atoms/Button';
import { PreferenceTile } from '../../molecules/PreferenceTile';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type TravelPreferenceOption = {
  id: string;
  label: string;
  image: ImageSourcePropType;
};

export type TravelPreferencesStepProps = {
  /** Passo atual (1-based) — controla o preenchimento da barra de progresso. */
  step: number;
  totalSteps: number;
  /** Pergunta do passo (ex.: "Como você gosta de viajar?"). */
  heading: string;
  options: TravelPreferenceOption[];
  selectedIds?: string[];
  onToggleOption?: (id: string) => void;
  /** Padrão "Avançar"; o último passo do quiz usa "Concluir". */
  ctaLabel?: string;
  onPressCta?: () => void;
  onBack?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

const SUBTITLE =
  'Escolha seus favoritos para personalizar sua experiência na comunidade Zupper. Você pode selecionar quantos desejar.';

/**
 * TravelPreferencesStep — um passo do quiz "Preferências de viagem": header +
 * barra de progresso + título + grade de opções selecionáveis + CTA + bottom
 * nav. Apresentacional; reproduz a seção "🟡Preferências de viagem" do Figma
 * (9 passos, cada um uma story deste mesmo componente).
 */
export const TravelPreferencesStep = ({
  step,
  totalSteps,
  heading,
  options,
  selectedIds = [],
  onToggleOption,
  ctaLabel = 'Avançar',
  onPressCta,
  onBack,
  onNavigate,
}: TravelPreferencesStepProps): React.ReactElement => {
  const hasSelection = selectedIds.length > 0;

  return (
    <View className="flex-1 bg-surface-tag">
      <ScreenHeader title="Preferências de viagem" onBack={onBack} />
      <View className="h-[2px] w-full bg-surface-default">
        <View className="h-[2px] bg-brand-strong" style={{ width: `${(step / totalSteps) * 100}%` }} />
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="gap-xxl rounded-t-md border-b border-border-subtle p-xxl">
          <View className="gap-lg">
            <Text className="font-sans text-bodyMd text-fg-subtle">{SUBTITLE}</Text>
            <Text className="font-sans text-heading text-fg-secondary">{heading}</Text>
          </View>
          <View className="flex-row flex-wrap gap-[10px]">
            {options.map((option) => {
              const selected = selectedIds.includes(option.id);
              return (
                <PreferenceTile
                  key={option.id}
                  label={option.label}
                  image={option.image}
                  selected={selected}
                  muted={hasSelection && !selected}
                  onPress={() => onToggleOption?.(option.id)}
                />
              );
            })}
          </View>
          <Button label={ctaLabel} fullWidth disabled={!hasSelection} onPress={onPressCta} />
        </View>
      </ScrollView>
      <BottomNav onNavigate={onNavigate} />
    </View>
  );
};
