import { colors } from '@zupper/tokens';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

export type TextareaProps = {
  /** Título exibido acima do campo (ex.: "Sua dica"). */
  label?: string;
  /** Mensagem de erro de validação — pinta a borda e aparece abaixo do campo. */
  error?: string;
  /** Altura mínima do campo em dp (padrão 84). */
  minHeight?: number;
} & Omit<TextInputProps, 'style' | 'multiline'>;

/**
 * Textarea — campo de texto de múltiplas linhas (legenda, dica, resumo), irmão
 * multiline do `Input`: mesmo visual (borda, radius, tokens), com texto alinhado
 * ao topo e altura mínima configurável. Apresentacional: `value`/`onChangeText`/
 * `error` por props; validação fica no app consumidor.
 */
export const Textarea = ({
  label,
  error,
  minHeight = 84,
  editable = true,
  ...textInputProps
}: TextareaProps): React.ReactElement => {
  const stateClasses = !editable
    ? 'bg-surface-tag text-fg-muted border-border-subtle'
    : error
      ? 'bg-surface-default text-fg-primary border-feedback-danger'
      : 'bg-surface-default text-fg-primary border-border-subtle focus:border-border-focus';

  return (
    <View className="w-full gap-md">
      {label ? <Text className="font-sans text-inputLabel text-fg-label">{label}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        accessibilityState={{ disabled: !editable }}
        editable={editable}
        multiline
        textAlignVertical="top"
        selectionColor={colors.surface.selection}
        style={{ minHeight }}
        className={`w-full rounded-md border px-md py-lg font-sans text-bodyText placeholder:text-fg-muted selection:bg-surface-selection web:outline-none ${stateClasses}`}
        {...textInputProps}
      />
      {error ? (
        <Text className="self-end font-sans text-inputError text-feedback-danger">{error}</Text>
      ) : null}
    </View>
  );
};
