import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type AuthTextFieldProps = {
  /** Título acima do campo (ex.: "Email", "Senha"). */
  label: string;
  /** Ícone à esquerda (ex.: "email", "lock"). */
  icon: IconName;
  /** Ícone à direita, pressionável — usado para alternar a visibilidade da senha. */
  trailingIcon?: IconName;
  onPressTrailingIcon?: () => void;
  /** Mensagem de erro — pinta a borda e aparece abaixo do campo. */
  error?: string;
} & Omit<TextInputProps, 'style'>;

/**
 * AuthTextField — campo de texto das telas de auth (Login/Cadastro/Senha):
 * label, ícone à esquerda, ícone opcional à direita (olho da senha) e borda
 * que reage ao estado (padrão/preenchido/erro). Apresentacional: valor,
 * mudanças e erro entram por props. Segue "Input Cadastro" do Figma.
 */
export const AuthTextField = ({
  label,
  icon,
  trailingIcon,
  onPressTrailingIcon,
  error,
  value,
  ...textInputProps
}: AuthTextFieldProps): React.ReactElement => {
  const borderClassName = error
    ? 'border-feedback-danger'
    : value
      ? 'border-brand-strong'
      : 'border-border-subtle';

  return (
    <View className="w-full gap-xs">
      <Text className="font-sans text-paragraphMd text-fg-subtle">{label}</Text>
      <View
        className={`w-full flex-row items-center gap-md rounded-md border bg-surface-default px-md py-lg ${borderClassName}`}
      >
        <Icon name={icon} size={24} color={colors.text.subtle} />
        <TextInput
          accessibilityLabel={label}
          value={value}
          selectionColor={colors.surface.selection}
          placeholderTextColor={colors.border.default}
          className="flex-1 font-sans text-paragraphMd text-fg-secondary web:outline-none"
          {...textInputProps}
        />
        {trailingIcon ? (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Alternar visibilidade: ${label}`}
            onPress={onPressTrailingIcon}
          >
            <Icon name={trailingIcon} size={24} color={colors.border.default} />
          </Pressable>
        ) : null}
      </View>
      {error ? <Text className="font-sans text-caption text-feedback-danger">{error}</Text> : null}
    </View>
  );
};
