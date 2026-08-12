import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type ClearableFieldProps = {
  /** Título acima do campo (ex.: "Ida", "Volta"). */
  label: string;
  /** Valor já formatado para exibição (ex.: "Qua, 24 Maio"). Vazio = placeholder. */
  value?: string | null;
  /** Texto quando não há valor. */
  placeholder?: string;
  /** Toque no campo — normalmente abre o seletor. Sem ele, o campo não é tocável. */
  onPress?: () => void;
  /**
   * Limpa o valor. O botão "×" só aparece quando há `value` **e** `onClear` —
   * não faz sentido oferecer limpar um campo vazio.
   */
  onClear?: () => void;
  /** Desabilita campo e botão de limpar. */
  disabled?: boolean;
};

/**
 * ClearableField — campo de leitura com rótulo, valor e ação de limpar. É o par
 * "Ida"/"Volta" do rodapé da seleção de datas, mas não sabe nada de data: recebe
 * a string **já formatada** pelo app.
 *
 * Não é um `Input`: aqui não se digita. O `Input` é `TextInput` editável e o
 * ícone da direita dele é o olho da senha (com rótulo de acessibilidade fixo
 * nisso). Este primitivo é somente leitura — o valor entra pelo `onPress` (que
 * abre um seletor) e sai pelo `onClear`.
 */
export const ClearableField = ({
  label,
  value,
  placeholder = 'Selecione',
  onPress,
  onClear,
  disabled = false,
}: ClearableFieldProps): React.ReactElement => {
  const hasValue = Boolean(value);

  return (
    <View className="w-full flex-1 gap-xs">
      <Text className="font-sans text-paragraphMd text-fg-secondary">{label}</Text>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${label}: ${hasValue ? value : placeholder}`}
        accessibilityState={{ disabled }}
        disabled={disabled || !onPress}
        onPress={onPress}
        className={`w-full flex-row items-center justify-between rounded-md border border-border-default px-md py-lg ${
          disabled ? 'bg-surface-tag' : 'bg-surface-default'
        }`}
      >
        <Text
          numberOfLines={1}
          className={`flex-1 font-sans text-paragraphMd ${
            disabled || !hasValue ? 'text-fg-muted' : 'text-fg-secondary'
          }`}
        >
          {hasValue ? value : placeholder}
        </Text>

        {hasValue && onClear ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Limpar ${label}`}
            disabled={disabled}
            onPress={onClear}
            className="pl-md"
          >
            <Icon name="clear-field" size={iconSize.lg} />
          </Pressable>
        ) : null}
      </Pressable>
    </View>
  );
};
