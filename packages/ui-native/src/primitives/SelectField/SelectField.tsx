import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type SelectOption = { id: string; label: string };

export type SelectFieldProps = {
  /** Valor selecionado (ex.: "Recife, PE"). */
  value?: string;
  /** Texto quando nada foi selecionado. */
  placeholder?: string;
  /**
   * Abre a lista de opções (variante `open` do Figma). Controlado pelo app:
   * `onPress` avisa o toque no campo, `onSelectOption` a escolha. Sem `open`, é o
   * campo fechado (retrocompatível).
   */
  open?: boolean;
  options?: SelectOption[];
  onSelectOption?: (id: string) => void;
  onPress?: () => void;
};

/** Altura máx. do card aberto (header + lista): mostra ~4–5 opções e rola o resto. */
const OPEN_MAX_HEIGHT = 300;

/**
 * SelectField — campo tipo "dropdown". Cobre as três variantes do Figma:
 * `default` (placeholder + seta pra baixo), `selected` (valor) e `open` (lista de
 * opções, seta pra cima). Apresentacional/controlado: o app decide aberto/fechado
 * e trata a escolha.
 *
 * Aberto = **um único card** (header + lista com scroll) sobreposto ao campo
 * (`absolute`, `top:0`), como no Figma — não empurra o layout (o campo fechado
 * embaixo segura a altura). Seta: `dropdown-arrow` (↓) fechado, `chevron-up` (↑)
 * aberto — ícones dedicados, sem rotação.
 */
export const SelectField = ({
  value,
  placeholder = 'Selecione',
  open = false,
  options = [],
  onSelectOption,
  onPress,
}: SelectFieldProps): React.ReactElement => {
  const label = (
    <Text className={`font-sans text-authorName ${value ? 'text-fg-secondary' : 'text-fg-muted'}`}>
      {value ?? placeholder}
    </Text>
  );

  return (
    <View className="w-full">
      {/* Campo fechado — sempre no fluxo pra segurar a altura; quando aberto, o
          card de opções cobre por cima (some da acessibilidade). */}
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={value ?? placeholder}
        accessibilityElementsHidden={open}
        importantForAccessibility={open ? 'no-hide-descendants' : 'auto'}
        onPress={onPress}
        className="w-full flex-row items-center justify-between rounded-md border border-border-default bg-surface-default px-md py-lg"
      >
        {label}
        <Icon name="dropdown-arrow" size={iconSize.lg} />
      </Pressable>

      {open ? (
        <View
          className="absolute inset-x-0 top-0 z-10 rounded-md border border-border-default bg-surface-default"
          style={{ maxHeight: OPEN_MAX_HEIGHT }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={value ?? placeholder}
            accessibilityState={{ expanded: true }}
            onPress={onPress}
            className="w-full flex-row items-center justify-between px-md py-lg"
          >
            {label}
            <Icon name="chevron-up" size={iconSize.lg} />
          </Pressable>

          <ScrollView showsVerticalScrollIndicator>
            {options.map((option, index) => (
              <React.Fragment key={option.id}>
                {index > 0 ? <View className="mx-md h-px bg-border-default" /> : null}
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={option.label}
                  onPress={() => onSelectOption?.(option.id)}
                  className="px-md py-lg"
                >
                  <Text numberOfLines={1} className="font-sans text-bodyText text-fg-secondary">
                    {option.label}
                  </Text>
                </Pressable>
              </React.Fragment>
            ))}
          </ScrollView>
        </View>
      ) : null}
    </View>
  );
};
