import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type CalendarYearSelectProps = {
  /** Ano exibido no gatilho. */
  value: number;
  /** Anos oferecidos na lista, na ordem em que devem aparecer. */
  years: number[];
  /** Lista aberta. Controlado pelo app, como no `SelectField`. */
  open?: boolean;
  /** Toque no gatilho — o app decide abrir/fechar. */
  onToggle?: () => void;
  onSelect?: (year: number) => void;
};

/**
 * CalendarYearSelect — o "2026 ⌄" do topo da tela de datas, para saltar de ano
 * sem rolar mês a mês.
 *
 * Vive separado do `Calendar` porque no Figma ele fica na **mesma linha** do
 * botão voltar e do título: o app pluga este primitivo no slot `right` do
 * `AppHeader` e liga os dois por `year`/`onYearChange` do `Calendar`.
 *
 * Tipografia igual à do título do `AppHeader` (`text-cardTitle`), pra dupla ficar
 * alinhada na mesma barra.
 */
export const CalendarYearSelect = ({
  value,
  years,
  open = false,
  onToggle,
  onSelect,
}: CalendarYearSelectProps): React.ReactElement => (
  <View>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Ano: ${value}`}
      accessibilityState={{ expanded: open }}
      onPress={onToggle}
      className="flex-row items-center gap-xs"
    >
      <Text className="font-sans text-cardTitle text-fg-primary">{value}</Text>
      <Icon name={open ? 'chevron-up' : 'dropdown-arrow'} size={iconSize.lg} />
    </Pressable>

    {open ? (
      // Sobreposto e ancorado à direita: o header não pode crescer de altura ao abrir.
      <View className="absolute right-0 top-full z-10 mt-xs rounded-md border border-border-default bg-surface-default">
        {years.map((year, index) => (
          <React.Fragment key={year}>
            {index > 0 ? <View className="mx-md h-px bg-border-default" /> : null}
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`Selecionar ${year}`}
              accessibilityState={{ selected: year === value }}
              onPress={() => onSelect?.(year)}
              className="px-lg py-md"
            >
              <Text
                className={`font-sans text-bodyText ${
                  year === value ? 'text-fg-primary' : 'text-fg-secondary'
                }`}
              >
                {year}
              </Text>
            </Pressable>
          </React.Fragment>
        ))}
      </View>
    ) : null}
  </View>
);
