import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { FilterChip } from '../../atoms/FilterChip';
import { Input } from '../../atoms/Input';

export type RoteiroPeriod = { id: string; label: string };

export type RoteiroDayFormProps = {
  /** Rótulo do dia sendo editado (ex.: "Dia 1"). */
  day: string;
  title?: string;
  onChangeTitle?: (text: string) => void;
  /** Períodos do dia (Manhã / Tarde / Noite). */
  periods: RoteiroPeriod[];
  selectedPeriodId?: string;
  onSelectPeriod?: (id: string) => void;
  local?: string;
  onChangeLocal?: (text: string) => void;
  tip?: string;
  onChangeTip?: (text: string) => void;
  /** Habilita o "Próximo" (pill sólido); desabilitado fica outline, como no Figma. */
  canGoNext?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
};

const Label = ({ children }: { children: string }) => (
  <Text className="font-sans text-authorName text-fg-primary">{children}</Text>
);

const OutlinePill = ({ label, onPress }: { label: string; onPress?: () => void }) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    className="rounded-pill border border-border-default bg-surface-default px-[16px] py-[12px]"
  >
    <Text className="font-sans text-buttonLabel text-fg-muted">{label}</Text>
  </Pressable>
);

/**
 * RoteiroDayForm — card de edição de um dia do roteiro (o "wizard" de adicionar
 * dia): Título do dia, seletor de Período (Manhã/Tarde/Noite), Local, Dica breve
 * e a navegação Anterior/Próximo. Apresentacional: valores e ações por props.
 * Reproduz o "card-roteiro" em modo edição de `_figma/publicar-conteudo`.
 */
export const RoteiroDayForm = ({
  day,
  title,
  onChangeTitle,
  periods,
  selectedPeriodId,
  onSelectPeriod,
  local,
  onChangeLocal,
  tip,
  onChangeTip,
  canGoNext = false,
  onPrev,
  onNext,
}: RoteiroDayFormProps): React.ReactElement => (
  <View className="w-full gap-[14px] rounded-lg border border-border-default bg-surface-default p-lg">
    <Text className="font-sans text-[18px] font-bold text-brand-strong">{day}</Text>

    <Label>Título do dia</Label>
    <Input
      value={title}
      placeholder="Digite um título breve para este dia do roteiro"
      onChangeText={onChangeTitle}
    />

    <Label>Período</Label>
    <View className="flex-row gap-md">
      {periods.map((period) => (
        <FilterChip
          key={period.id}
          label={period.label}
          selected={period.id === selectedPeriodId}
          fill
          onPress={() => onSelectPeriod?.(period.id)}
        />
      ))}
    </View>

    <Label>Local</Label>
    <Input
      value={local}
      placeholder="Insira o local específico, se houver"
      onChangeText={onChangeLocal}
    />

    <Label>Dica breve</Label>
    <Input
      value={tip}
      placeholder="Digite uma dica breve sobre o local"
      onChangeText={onChangeTip}
    />

    <View className="flex-row items-center justify-between">
      <OutlinePill label="Anterior" onPress={onPrev} />
      {canGoNext ? (
        <Button label="Próximo" onPress={onNext} />
      ) : (
        <OutlinePill label="Próximo" onPress={onNext} />
      )}
    </View>
  </View>
);
