import { colors } from '@kodes-tech/tokens';
import React from 'react';
import { Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';

/**
 * Tipo semântico do campo. Esconde as props do RN (`keyboardType`,
 * `autoCapitalize`, `secureTextEntry`…) atrás de uma intenção — trocar o
 * `TextInput` por outra lib no futuro mexe só no mapa interno, não no contrato.
 */
export type InputType = 'text' | 'name' | 'username' | 'email' | 'phone' | 'numeric' | 'password';

/**
 * Contrato PRÓPRIO do Input — não estende `TextInputProps` e não repassa props
 * cruas do RN. O que o app precisa entra por props explícitas; o RN é detalhe
 * interno (encapsulado neste primitivo). Ver a "regra de ouro do wrapper".
 */
export type InputProps = {
  /** Título exibido acima do campo. */
  label?: string;
  /** Mensagem de erro de validação — pinta a borda e aparece abaixo do campo. */
  error?: string;
  /** Valor controlado. */
  value?: string;
  /** Valor inicial não-controlado. */
  defaultValue?: string;
  /** Notifica digitação (assinatura neutra: recebe a string, não o evento do RN). */
  onChangeText?: (value: string) => void;
  placeholder?: string;
  /** Intenção do campo — define teclado/capitalização/segurança internamente. Default: `text`. */
  type?: InputType;
  /** Desabilita o campo (não editável, sem borda de erro). */
  disabled?: boolean;
  autoFocus?: boolean;
  maxLength?: number;
  /** Ação ao confirmar (Enter / "done") — sem vazar o evento do RN. */
  onSubmit?: () => void;
  onFocus?: () => void;
  onBlur?: () => void;
  testID?: string;
};

// Detalhe interno: mapeia a intenção semântica para as props do RN TextInput.
// Se um dia o TextInput sair, é aqui (e só aqui) que a tradução muda.
type NativeTypeProps = Pick<
  TextInputProps,
  'keyboardType' | 'autoCapitalize' | 'secureTextEntry' | 'autoComplete' | 'textContentType'
>;
const TYPE_MAP: Record<InputType, NativeTypeProps> = {
  text: { autoCapitalize: 'sentences' },
  name: { autoCapitalize: 'words', autoComplete: 'name' },
  username: { autoCapitalize: 'none', autoComplete: 'username' },
  email: {
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
    textContentType: 'emailAddress',
  },
  phone: { keyboardType: 'phone-pad', autoComplete: 'tel', textContentType: 'telephoneNumber' },
  numeric: { keyboardType: 'number-pad' },
  password: {
    secureTextEntry: true,
    autoCapitalize: 'none',
    autoComplete: 'password',
    textContentType: 'password',
  },
};

/**
 * Input — campo de texto de linha única com título opcional, estado de erro e
 * desabilitado. Apresentacional: valor, mudanças e erro entram por props;
 * validação/integração ficam no app consumidor (react-hook-form + zod).
 */
export const Input = ({
  label,
  error,
  value,
  defaultValue,
  onChangeText,
  placeholder,
  type = 'text',
  disabled = false,
  autoFocus,
  maxLength,
  onSubmit,
  onFocus,
  onBlur,
  testID,
}: InputProps): React.ReactElement => {
  // estado visual: desabilitado > erro > normal (suprime borda de erro/foco quando off).
  const stateClasses = disabled
    ? 'bg-surface-tag text-fg-muted border-border-subtle'
    : error
      ? 'bg-surface-default text-fg-primary border-feedback-danger'
      : 'bg-surface-default text-fg-primary border-border-subtle focus:border-border-focus';

  return (
    <View className="w-full gap-md">
      {label ? <Text className="font-sans text-inputLabel text-fg-label">{label}</Text> : null}
      <TextInput
        accessibilityLabel={label}
        accessibilityState={{ disabled }}
        editable={!disabled}
        value={value}
        defaultValue={defaultValue}
        onChangeText={onChangeText}
        placeholder={placeholder}
        autoFocus={autoFocus}
        maxLength={maxLength}
        onSubmitEditing={onSubmit ? () => onSubmit() : undefined}
        onFocus={onFocus ? () => onFocus() : undefined}
        onBlur={onBlur ? () => onBlur() : undefined}
        testID={testID}
        // seleção de texto: nativo via selectionColor; web via ::selection (classe).
        selectionColor={colors.surface.selection}
        // web:outline-none tira o anel do navegador; o foco vira troca de cor da borda.
        className={`h-control w-full rounded-md border px-md py-lg font-sans text-bodyText placeholder:text-fg-muted selection:bg-surface-selection web:outline-none ${stateClasses}`}
        {...TYPE_MAP[type]}
      />
      {error ? (
        <Text className="self-end font-sans text-inputError text-feedback-danger">{error}</Text>
      ) : null}
    </View>
  );
};
