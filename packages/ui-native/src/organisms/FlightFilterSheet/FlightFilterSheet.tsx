import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Checkbox } from '../../atoms/Checkbox';
import { ExpansionPanel } from '../../molecules/ExpansionPanel';
import { RangeSlider } from '../../molecules/RangeSlider';
import type { FilterOption } from '../HotelFilterSheet/HotelFilterSheet';
import { BottomSheet } from '../BottomSheet';

export type FlightRange = { min: number; max: number; values: [number, number] };

export type FlightFilterSheetProps = {
  baggage: FilterOption[];
  airlines: FilterOption[];
  stops: FilterOption[];
  airports: FilterOption[];
  duration: FlightRange;
  departureTime: FlightRange;
  arrivalTime: FlightRange;
  price: FlightRange;
  formatPrice?: (value: number) => string;
  formatHour?: (value: number) => string;
  onToggleBaggage?: (id: string) => void;
  onToggleAirline?: (id: string) => void;
  onToggleStop?: (id: string) => void;
  onToggleAirport?: (id: string) => void;
  onClear?: () => void;
  onApply?: () => void;
  onDismiss?: () => void;
};

/** Painel colapsável de checkboxes com estado de disclosure local. */
const CheckboxPanel = ({
  title,
  options,
  onToggle,
  defaultOpen = true,
}: {
  title: string;
  options: FilterOption[];
  onToggle?: (id: string) => void;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <ExpansionPanel title={title} expanded={open} onToggle={() => setOpen((v) => !v)}>
      <View className="gap-xs">
        {options.map((option) => (
          <Checkbox
            key={option.id}
            label={option.label}
            checked={option.selected}
            onPress={() => onToggle?.(option.id)}
          />
        ))}
      </View>
    </ExpansionPanel>
  );
};

/** Painel colapsável de faixa (slider) com estado de disclosure local. */
const RangePanel = ({
  title,
  range,
  format,
  defaultOpen = true,
}: {
  title: string;
  range: FlightRange;
  format: (value: number) => string;
  defaultOpen?: boolean;
}) => {
  const [open, setOpen] = React.useState(defaultOpen);
  return (
    <ExpansionPanel title={title} expanded={open} onToggle={() => setOpen((v) => !v)}>
      <RangeSlider min={range.min} max={range.max} values={range.values} formatLabel={format} />
    </ExpansionPanel>
  );
};

/**
 * FlightFilterSheet — sheet de filtros da lista de voos: bagagem, cias,
 * paradas e aeroportos (checkboxes) e duração, horários de saída/chegada e
 * preço (sliders de faixa), em seções colapsáveis, com "Limpar"/"Aplicar".
 * Apresentacional: seleção e faixas vêm por props. Reproduz AerialFilter do
 * zupper-app.
 */
export const FlightFilterSheet = ({
  baggage,
  airlines,
  stops,
  airports,
  duration,
  departureTime,
  arrivalTime,
  price,
  formatPrice = (v) => `R$ ${v}`,
  formatHour = (v) => `${v}h`,
  onToggleBaggage,
  onToggleAirline,
  onToggleStop,
  onToggleAirport,
  onClear,
  onApply,
  onDismiss,
}: FlightFilterSheetProps): React.ReactElement => (
  <BottomSheet title="Filtrar voos" onDismiss={onDismiss}>
    <ScrollView showsVerticalScrollIndicator={false} className="max-h-[500px] px-screenMargin">
      <CheckboxPanel title="Bagagem" options={baggage} onToggle={onToggleBaggage} />
      <Divider />
      <CheckboxPanel title="Cias aéreas" options={airlines} onToggle={onToggleAirline} />
      <Divider />
      <CheckboxPanel title="Paradas" options={stops} onToggle={onToggleStop} />
      <Divider />
      <RangePanel title="Duração do voo" range={duration} format={formatHour} />
      <Divider />
      <RangePanel title="Horários de saída" range={departureTime} format={formatHour} />
      <Divider />
      <RangePanel title="Horários de chegada" range={arrivalTime} format={formatHour} />
      <Divider />
      <CheckboxPanel title="Aeroportos" options={airports} onToggle={onToggleAirport} />
      <Divider />
      <RangePanel title="Preços" range={price} format={formatPrice} />
    </ScrollView>

    <View className="gap-md px-screenMargin pt-lg">
      <Button label="Aplicar filtros" variant="secondary" fullWidth onPress={onApply} />
      <Pressable accessibilityRole="button" onPress={onClear} className="items-center py-xs">
        <Text className="font-sans text-md font-medium text-fg-subtle">Limpar filtros</Text>
      </Pressable>
    </View>
  </BottomSheet>
);
