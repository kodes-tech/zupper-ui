import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';

export type FilterChipProps = PressableProps & {
  label: string;
  /** Chip selecionado ou não — controlado pelo consumidor (sem estado interno). */
  selected?: boolean;
  /** Ícone opcional, fornecido pelo consumidor (ainda não há um sistema de ícone no design system). */
  icon?: React.ReactNode;
};

/**
 * FilterChip — chip de filtro selecionável (ex.: "Gastronomia", "Passeios").
 * Corresponde ao "Filter icon button" do Figma (variants Default/Select).
 */
export const FilterChip = ({ label, selected = false, icon, ...rest }: FilterChipProps) => {
  const borderClassName = selected ? 'border-brand-strong' : 'border-border-subtle';
  const labelClassName = selected ? 'text-brand-strong' : 'text-fg-subtle';

  return (
    <Pressable
      testID="filter-chip"
      className={`flex-row items-center justify-center gap-xs rounded-md border bg-surface-default px-md py-md ${borderClassName}`}
      {...rest}
    >
      {icon}
      <Text className={`font-sans text-sm font-medium ${labelClassName}`}>{label}</Text>
    </Pressable>
  );
};
