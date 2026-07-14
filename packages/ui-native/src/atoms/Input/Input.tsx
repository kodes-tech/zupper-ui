import { colors } from '@kodes-tech/tokens';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { Icon } from '../Icon';
import type { IconName } from '../Icon';

export type InputProps = {
  /** Título exibido acima do campo (ex.: "Título do roteiro"). */
  label?: string;
  /** Mensagem de erro de validação — pinta a borda e aparece abaixo do campo. */
  error?: string;
  /** Ícone à esquerda do campo (ex.: "id-card", "email", "phone" do Checkout). */
  icon?: IconName;
} & Omit<TextInputProps, 'style'>;

/**
 * Input — campo de texto de linha única com título opcional, estado de erro e
 * desabilitado (`editable={false}`, como no Input do app antigo).
 * Apresentacional: valor, mudanças e erro entram por props (`value`,
 * `onChangeText`, `error`); validação e integração ficam no app consumidor
 * (react-hook-form + zod no zupper-app).
 */
export const Input = ({
  label,
  error,
  icon,
  editable = true,
  ...textInputProps
}: InputProps): React.ReactElement => {
  // estado visual do campo: desabilitado > erro > normal.
  // Desabilitado suprime a borda de erro (paridade com o app antigo) e o foco.
  const stateClasses = !editable
    ? 'bg-surface-tag border-border-subtle'
    : error
      ? 'bg-surface-default border-feedback-danger'
      : 'bg-surface-default border-border-subtle focus:border-border-focus';
  const textClasses = editable ? 'text-fg-primary' : 'text-fg-muted';

  const field = (
    <TextInput
      accessibilityLabel={label}
      accessibilityState={{ disabled: !editable }}
      editable={editable}
      // seleção de texto: no nativo é prop (selectionColor); no web é o
      // pseudo-elemento ::selection, só alcançável via classe (selection:)
      selectionColor={colors.surface.selection}
      // web:outline-none tira o anel de foco do navegador; o indicador de foco
      // passa a ser a troca de cor da borda (border.focus)
      className={
        icon
          ? `h-full flex-1 font-sans text-bodyText placeholder:text-fg-muted selection:bg-surface-selection web:outline-none ${textClasses}`
          : `h-control w-full rounded-md border px-md py-lg font-sans text-bodyText placeholder:text-fg-muted selection:bg-surface-selection web:outline-none ${stateClasses} ${textClasses}`
      }
      {...textInputProps}
    />
  );

  return (
    <View className="w-full gap-md">
      {label ? <Text className="font-sans text-inputLabel text-fg-label">{label}</Text> : null}
      {icon ? (
        <View className={`h-control w-full flex-row items-center gap-sm rounded-md border px-md ${stateClasses}`}>
          <Icon name={icon} size={20} color={colors.text.muted} />
          {field}
        </View>
      ) : (
        field
      )}
      {/* mensagem alinhada à direita, como no Input do app antigo (@zupper/app-ui) */}
      {error ? <Text className="self-end font-sans text-inputError text-feedback-danger">{error}</Text> : null}
    </View>
  );
};
