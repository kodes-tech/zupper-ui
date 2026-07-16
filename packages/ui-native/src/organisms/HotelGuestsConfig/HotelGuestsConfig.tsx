import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { NumberStepper } from '../../molecules/NumberStepper';
import { SelectField } from '../../molecules/SelectField';
import { HotelModalSheet } from '../HotelModalSheet';

export type HotelGuestsRoom = {
  adultQty: number;
  /** Uma entrada por criança; o valor é a idade (0 = "Até 1 ano"). */
  childAges: number[];
};

export type HotelGuestsConfigProps = {
  rooms: HotelGuestsRoom[];
  /** Máximo de quartos; padrão 3 (como no app). */
  maxRooms?: number;
  /** Máximo de hóspedes (adultos+crianças) por quarto; padrão 5. */
  maxGuestsPerRoom?: number;
  /** Erro de validação (ex.: "Selecione ao menos 1 hóspede"). */
  error?: string;
  onIncrementAdults?: (roomIndex: number) => void;
  onDecrementAdults?: (roomIndex: number) => void;
  onIncrementChildren?: (roomIndex: number) => void;
  onDecrementChildren?: (roomIndex: number) => void;
  /** Abre o seletor de idade da criança (o app consumidor decide como). */
  onPressChildAge?: (roomIndex: number, childIndex: number) => void;
  onRemoveRoom?: (roomIndex: number) => void;
  onAddRoom?: () => void;
  onApply?: () => void;
  onClose?: () => void;
};

const ageLabel = (age: number): string => (age === 0 ? 'Até 1 ano' : `${age} ano${age > 1 ? 's' : ''}`);

/**
 * HotelGuestsConfig — modal "Viajantes e Classe de voo" / config de
 * hóspedes: adultos e crianças por quarto (stepper), idade de cada criança
 * (abre um seletor externo, como o SelectField já faz noutras telas),
 * remover/adicionar quarto e o rodapé "Aplicar filtros". Apresentacional:
 * quantidades e limites vêm por props. Reproduz HotelSearchConfiguration do
 * zupper-app.
 */
export const HotelGuestsConfig = ({
  rooms,
  maxRooms = 3,
  maxGuestsPerRoom = 5,
  error,
  onIncrementAdults,
  onDecrementAdults,
  onIncrementChildren,
  onDecrementChildren,
  onPressChildAge,
  onRemoveRoom,
  onAddRoom,
  onApply,
  onClose,
}: HotelGuestsConfigProps): React.ReactElement => (
  <HotelModalSheet
    title="Viajantes e Classe de voo"
    showDivider
    onClose={onClose}
    footer={<Button label="Aplicar filtros" variant="secondary" fullWidth onPress={onApply} />}
  >
    <View className="gap-[22px]">
      {rooms.map((room, roomIndex) => {
        const totalGuests = room.adultQty + room.childAges.length;
        return (
          <View key={roomIndex} className="gap-lg">
            <View className="flex-row items-center justify-between">
              <Text className="font-sans text-lg font-medium text-fg-secondary">Quarto {roomIndex + 1}</Text>
              {rooms.length > 1 ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`Remover quarto ${roomIndex + 1}`}
                  onPress={() => onRemoveRoom?.(roomIndex)}
                  className="flex-row items-center gap-xs"
                >
                  <Text className="font-sans text-md font-medium text-fg-subtle">Remover quarto</Text>
                  <Icon name="hotel-trash" size={20} color={colors.text.subtle} />
                </Pressable>
              ) : null}
            </View>

            <View className="flex-row items-center justify-between">
              <Text className="font-sans text-md font-medium text-fg-secondary">Adultos</Text>
              <NumberStepper
                label={`Adultos do quarto ${roomIndex + 1}`}
                value={room.adultQty}
                canDecrement={room.adultQty > 1}
                canIncrement={totalGuests < maxGuestsPerRoom}
                onDecrement={() => onDecrementAdults?.(roomIndex)}
                onIncrement={() => onIncrementAdults?.(roomIndex)}
              />
            </View>

            <Divider />

            <View className="flex-row items-center justify-between">
              <Text className="font-sans text-md font-medium text-fg-secondary">Crianças</Text>
              <NumberStepper
                label={`Crianças do quarto ${roomIndex + 1}`}
                value={room.childAges.length}
                canDecrement={room.childAges.length > 0}
                canIncrement={totalGuests < maxGuestsPerRoom}
                onDecrement={() => onDecrementChildren?.(roomIndex)}
                onIncrement={() => onIncrementChildren?.(roomIndex)}
              />
            </View>

            {room.childAges.map((age, childIndex) => (
              <View key={childIndex} className="gap-md">
                <Text className="font-sans text-md font-medium text-fg-secondary">
                  Idade da criança {childIndex + 1}
                </Text>
                <SelectField
                  value={ageLabel(age)}
                  placeholder="Selecione a idade"
                  onPress={() => onPressChildAge?.(roomIndex, childIndex)}
                />
                {childIndex < room.childAges.length - 1 ? (
                  <View className="border-b border-dashed border-border-subtle" />
                ) : null}
              </View>
            ))}

            {roomIndex === rooms.length - 1 && rooms.length < maxRooms ? (
              <Pressable
                accessibilityRole="button"
                onPress={onAddRoom}
                className="w-[160px] items-center self-end rounded-md bg-surface-tag px-lg py-md"
              >
                <Text className="font-sans text-md font-medium text-fg-subtle">Adicionar quarto</Text>
              </Pressable>
            ) : null}
          </View>
        );
      })}

      {error ? (
        <Text className="text-right font-sans text-xs font-medium text-feedback-danger">{error}</Text>
      ) : null}
    </View>
  </HotelModalSheet>
);
