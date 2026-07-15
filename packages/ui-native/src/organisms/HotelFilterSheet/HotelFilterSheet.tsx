import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { FilterChip } from '../../atoms/FilterChip';
import { Checkbox } from '../../atoms/Checkbox';
import { Icon } from '../../atoms/Icon';
import { ExpansionPanel } from '../../molecules/ExpansionPanel';
import { RangeSlider } from '../../molecules/RangeSlider';
import { BottomSheet } from '../BottomSheet';

/** Opção de seleção múltipla (comodidade, região) com estado marcado. */
export type FilterOption = { id: string; label: string; selected?: boolean };

export type HotelFilterSheetProps = {
  /** Estrelas disponíveis (ex.: [1,2,3,4,5]) e as selecionadas. */
  starOptions?: number[];
  selectedStars?: number[];
  /** Faixa de preço: limites do trilho e valores atuais. */
  price: { min: number; max: number; values: [number, number] };
  /** Formata o preço nos rótulos (ex.: "R$ 1.234"). */
  formatPrice?: (value: number) => string;
  amenities: FilterOption[];
  districts: FilterOption[];
  onToggleStar?: (star: number) => void;
  onToggleAmenity?: (id: string) => void;
  onToggleDistrict?: (id: string) => void;
  onClear?: () => void;
  onApply?: () => void;
  onDismiss?: () => void;
};

/**
 * HotelFilterSheet — sheet de filtros da lista de hotéis: avaliação (estrelas),
 * faixa de preço (slider), comodidades e região (seções colapsáveis com
 * checkboxes), e o rodapé "Limpar"/"Aplicar filtro". Apresentacional: seleção
 * e faixa vêm por props; abrir/fechar seções é estado local de disclosure.
 * Reproduz HotelFilter do zupper-app.
 */
export const HotelFilterSheet = ({
  starOptions = [1, 2, 3, 4, 5],
  selectedStars = [],
  price,
  formatPrice = (v) => `R$ ${v}`,
  amenities,
  districts,
  onToggleStar,
  onToggleAmenity,
  onToggleDistrict,
  onClear,
  onApply,
  onDismiss,
}: HotelFilterSheetProps): React.ReactElement => {
  const [openAmenities, setOpenAmenities] = React.useState(true);
  const [openDistricts, setOpenDistricts] = React.useState(true);
  return (
    <BottomSheet title="Filtrar" onDismiss={onDismiss}>
      <ScrollView showsVerticalScrollIndicator={false} className="max-h-[460px] px-screenMargin">
        <View className="gap-md py-lg">
          <View className="flex-row items-center justify-between">
            {starOptions.map((star) => (
              <FilterChip
                key={star}
                label={String(star)}
                selected={selectedStars.includes(star)}
                icon={
                  <Icon
                    name="star"
                    size={16}
                    color={selectedStars.includes(star) ? colors.brand.strong : colors.text.subtle}
                  />
                }
                onPress={() => onToggleStar?.(star)}
              />
            ))}
          </View>
        </View>

        <Divider />

        <View className="gap-md py-lg">
          <RangeSlider
            min={price.min}
            max={price.max}
            values={price.values}
            formatLabel={formatPrice}
          />
        </View>

        <Divider />

        <ExpansionPanel
          title="Comodidades"
          expanded={openAmenities}
          onToggle={() => setOpenAmenities((v) => !v)}
        >
          <View className="gap-xs">
            {amenities.map((amenity) => (
              <Checkbox
                key={amenity.id}
                label={amenity.label}
                checked={amenity.selected}
                onPress={() => onToggleAmenity?.(amenity.id)}
              />
            ))}
          </View>
        </ExpansionPanel>

        <Divider />

        <ExpansionPanel
          title="Região"
          expanded={openDistricts}
          onToggle={() => setOpenDistricts((v) => !v)}
        >
          <View className="gap-xs">
            {districts.map((district) => (
              <Checkbox
                key={district.id}
                label={district.label}
                checked={district.selected}
                onPress={() => onToggleDistrict?.(district.id)}
              />
            ))}
          </View>
        </ExpansionPanel>
      </ScrollView>

      <View className="gap-md px-screenMargin pt-lg">
        <Button label="Aplicar filtro" variant="secondary" fullWidth onPress={onApply} />
        <Pressable accessibilityRole="button" onPress={onClear} className="items-center py-xs">
          <Text className="font-sans text-md font-medium text-fg-subtle">Limpar filtros</Text>
        </Pressable>
      </View>
    </BottomSheet>
  );
};
