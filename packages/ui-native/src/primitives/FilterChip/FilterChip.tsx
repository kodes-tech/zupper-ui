import React from 'react';
import { Pressable, Text } from 'react-native';

/** Contrato próprio — não estende `PressableProps` (regra de ouro do wrapper). */
export type FilterChipProps = {
  label: string;
  /** Chip selecionado ou não — controlado pelo consumidor (sem estado interno). */
  selected?: boolean;
  /** Ícone opcional (via `<Icon />`). */
  icon?: React.ReactNode;
  onPress?: () => void;
  /** Ocupa a largura disponível (flex-1) — ex.: chips lado a lado. */
  fill?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

/**
 * FilterChip — chip de filtro selecionável (ex.: "Gastronomia", "Passeios").
 * Corresponde ao "Filter icon button" do Figma (variants Default/Select).
 */
export const FilterChip = ({
  label,
  selected = false,
  icon,
  onPress,
  fill = false,
  accessibilityLabel,
  testID = 'filter-chip',
}: FilterChipProps): React.ReactElement => {
  const borderClassName = selected ? 'border-brand-strong' : 'border-border-subtle';
  const labelClassName = selected ? 'text-brand-strong' : 'text-fg-subtle';

  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={accessibilityLabel ?? label}
      onPress={onPress}
      className={`flex-row items-center justify-center gap-xs rounded-md border bg-surface-default px-md py-md ${
        fill ? 'flex-1' : ''
      } ${borderClassName}`}
    >
      {icon}
      <Text className={`font-sans text-sm font-medium ${labelClassName}`}>{label}</Text>
    </Pressable>
  );
};
