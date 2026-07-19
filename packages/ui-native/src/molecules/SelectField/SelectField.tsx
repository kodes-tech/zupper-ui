import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type SelectFieldProps = {
  /** Valor selecionado (ex.: "Recife, PE"). */
  value?: string;
  /** Texto quando nada foi selecionado. */
  placeholder?: string;
  onPress?: () => void;
};

/**
 * SelectField — campo tipo "dropdown" que abre um seletor no app consumidor
 * (ex.: destino da publicação). Apresentacional: mostra o valor e a seta; a
 * ação de abrir vem por `onPress`. Reproduz o "dropdown" de `_figma/publicar-conteudo`.
 * A seta é o ícone padrão de dropdown girado -90° (como no Figma).
 */
export const SelectField = ({
  value,
  placeholder = 'Selecione',
  onPress,
}: SelectFieldProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={value ?? placeholder}
    onPress={onPress}
    className="w-full flex-row items-center justify-between rounded-md border border-border-default bg-surface-default px-md py-lg"
  >
    <Text className={`font-sans text-authorName ${value ? 'text-fg-secondary' : 'text-fg-muted'}`}>
      {value ?? placeholder}
    </Text>
    {/* rotação no View (não no Icon): estilo de RN não é portável entre os
        renderers do @kodes-tech/icons — no web o <svg> ignorava o transform */}
    <View style={{ transform: [{ rotate: '-90deg' }] }}>
      <Icon name="dropdown-arrow" size={iconSize.lg} />
    </View>
  </Pressable>
);
