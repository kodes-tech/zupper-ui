import React from 'react';
import { Pressable, Text } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type CheckboxOptionProps = {
  label: string;
  checked?: boolean;
  disabled?: boolean;
  onPress?: () => void;
};

/**
 * CheckboxOption — checkbox com rótulo (ex.: "Aceito receber o status do meu
 * pedido por SMS" no Checkout). Extraído do Checkbox do zupper-app
 * (libs/app-ui/molecules/checkbox): quadrado preenchido + check branco quando
 * marcado, só contorno cinza quando não.
 */
export const CheckboxOption = ({
  label,
  checked = false,
  disabled = false,
  onPress,
}: CheckboxOptionProps): React.ReactElement => (
  <Pressable
    accessibilityRole="checkbox"
    accessibilityState={{ checked, disabled }}
    accessibilityLabel={label}
    disabled={disabled}
    onPress={onPress}
    className="flex-row items-center gap-sm"
  >
    <Icon name={checked ? 'checkbox-check' : 'checkbox-empty'} size={20} />
    <Text className="flex-1 font-sans text-md font-normal text-fg-subtle">{label}</Text>
  </Pressable>
);
