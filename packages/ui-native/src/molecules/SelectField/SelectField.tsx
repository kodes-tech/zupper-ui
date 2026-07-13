import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type SelectOption = { id: string; label: string };

export type SelectFieldProps = {
  /** Valor selecionado (ex.: "Recife, PE"). */
  value?: string;
  /** Texto quando nada foi selecionado. */
  placeholder?: string;
  /**
   * Lista expandida (variante `open` do Figma). Quem controla o aberto/fechado é
   * o app: `onPress` avisa o toque no campo, `onSelectOption` a escolha.
   */
  open?: boolean;
  options?: SelectOption[];
  onSelectOption?: (id: string) => void;
  onPress?: () => void;
};

/** Altura do quadro aberto no Figma (`dropdown`, variante `open`). */
const OPEN_HEIGHT = 218;

/**
 * SelectField — campo tipo "dropdown" (ex.: destino da publicação). Cobre as
 * três variantes do `dropdown` do Figma: `default` (placeholder), `selected`
 * (valor escolhido) e `open` (lista de opções). Apresentacional: as opções e o
 * estado de aberto vêm por props. A seta é o ícone de dropdown girado -90°
 * (fechado) / 90° (aberto), como no Figma.
 */
export const SelectField = ({
  value,
  placeholder = 'Selecione',
  open = false,
  options = [],
  onSelectOption,
  onPress,
}: SelectFieldProps): React.ReactElement => {
  const header = (
    <>
      <Text className={`font-sans text-authorName ${value ? 'text-fg-secondary' : 'text-fg-muted'}`}>
        {value ?? placeholder}
      </Text>
      <Icon
        name="dropdown-arrow"
        size={24}
        style={{ transform: [{ rotate: open ? '90deg' : '-90deg' }] }}
      />
    </>
  );

  if (!open) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={value ?? placeholder}
        onPress={onPress}
        className="w-full flex-row items-center justify-between rounded-md border border-border-default bg-surface-default px-md py-lg"
      >
        {header}
      </Pressable>
    );
  }

  return (
    <View
      style={{ height: OPEN_HEIGHT }}
      className="w-full rounded-md border border-border-default bg-surface-default px-md py-lg"
    >
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={value ?? placeholder}
        accessibilityState={{ expanded: true }}
        onPress={onPress}
        className="w-full flex-row items-center justify-between"
      >
        {header}
      </Pressable>

      <ScrollView className="mt-xl" showsVerticalScrollIndicator>
        {options.map((option, index) => (
          <React.Fragment key={option.id}>
            {index > 0 ? <View className="h-px w-full bg-border-default" /> : null}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={option.label}
              onPress={() => onSelectOption?.(option.id)}
              className="py-lg"
            >
              <Text numberOfLines={1} className="font-sans text-bodyText text-fg-secondary">
                {option.label}
              </Text>
            </Pressable>
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};
