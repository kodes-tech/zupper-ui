import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';
import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import type { TextInputProps } from 'react-native';
import { useTheme } from '../../theme/ThemeProvider';

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
  /**
   * Ícone à esquerda, dentro do campo (ex.: `email`, `lock`). Ativa a variante
   * com moldura (borda no container, campo interno sem borda). Usado nas telas
   * de auth (Login/Cadastro/Senha).
   */
  leadingIcon?: IconName;
  /**
   * Ícone à direita, pressionável (ex.: `eye`/`eye-slash` para revelar a senha).
   * Ativa a variante com moldura.
   */
  trailingIcon?: IconName;
  /**
   * Ação do ícone à direita. Para revelar a senha, o app alterna o `type` entre
   * `password` e `text` e troca o `trailingIcon` entre `eye` e `eye-slash` — o
   * primitivo não guarda estado.
   */
  onPressTrailingIcon?: () => void;
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
 * desabilitado. Suporta a variante com moldura (`leadingIcon`/`trailingIcon`):
 * a borda passa para o container e o campo fica limpo, com ícone à esquerda e
 * um ícone pressionável à direita (ex.: olho da senha). Apresentacional: valor,
 * mudanças e erro entram por props; validação/integração ficam no app (RHF + zod).
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
  leadingIcon,
  trailingIcon,
  onPressTrailingIcon,
  onSubmit,
  onFocus,
  onBlur,
  testID,
}: InputProps): React.ReactElement => {
  const hasAffix = Boolean(leadingIcon || trailingIcon);
  // selectionColor é lido em JS (não acompanha a cascata de classes) — pega do tema ativo.
  const { colors } = useTheme();

  // cor do texto por estado (usada pelo campo nos dois modos).
  const textStateClass = disabled ? 'text-fg-muted' : 'text-fg-primary';
  // bg + borda por estado — no modo com moldura vão no container.
  const boxStateClass = disabled
    ? 'bg-surface-tag border-border-subtle'
    : error
      ? 'bg-surface-default border-feedback-danger'
      : 'bg-surface-default border-border-subtle';

  const field = (
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
      // moldura: campo limpo (borda/bg/altura ficam no container). sem moldura:
      // estado visual completo no próprio campo (comportamento original, sem regressão).
      className={
        hasAffix
          ? `flex-1 font-sans text-bodyText placeholder:text-fg-muted web:selection:bg-surface-selection web:outline-none ${textStateClass}`
          : `h-control w-full rounded-md border px-md py-lg font-sans text-bodyText placeholder:text-fg-muted web:selection:bg-surface-selection web:outline-none ${
              disabled
                ? 'bg-surface-tag text-fg-muted border-border-subtle'
                : error
                  ? 'bg-surface-default text-fg-primary border-feedback-danger'
                  : 'bg-surface-default text-fg-primary border-border-subtle focus:border-border-focus'
            }`
      }
      {...TYPE_MAP[type]}
    />
  );

  return (
    <View className="w-full gap-md">
      {label ? <Text className="font-sans text-inputLabel text-fg-label">{label}</Text> : null}
      {hasAffix ? (
        <View
          className={`h-control w-full flex-row items-center gap-md rounded-md border px-md ${boxStateClass}`}
        >
          {leadingIcon ? <Icon name={leadingIcon} size={iconSize.md} /> : null}
          {field}
          {trailingIcon ? (
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={label ? `Alternar visibilidade: ${label}` : 'Alternar visibilidade'}
              disabled={disabled}
              onPress={onPressTrailingIcon}
            >
              <Icon name={trailingIcon} size={iconSize.md} />
            </Pressable>
          ) : null}
        </View>
      ) : (
        field
      )}
      {error ? (
        <Text className="self-end font-sans text-inputError text-feedback-danger">{error}</Text>
      ) : null}
    </View>
  );
};
