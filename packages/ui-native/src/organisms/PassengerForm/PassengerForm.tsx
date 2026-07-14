import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Input } from '../../atoms/Input';
import { RadioOption } from '../../molecules/RadioOption';

export type PassengerGender = 'male' | 'female';

export type PassengerFormProps = {
  /** Título do card (ex.: "Adulto 1", "Criança 1 / Quarto 2"). */
  title: string;
  /** Recolhido/expandido. Padrão do app real: expandido. */
  expanded?: boolean;
  onToggleExpanded?: () => void;
  firstName?: string;
  firstNameError?: string;
  onChangeFirstName?: (value: string) => void;
  lastName?: string;
  lastNameError?: string;
  onChangeLastName?: (value: string) => void;
  /** Formato "00/00/0000". */
  birthDate?: string;
  birthDateError?: string;
  onChangeBirthDate?: (value: string) => void;
  document?: string;
  documentError?: string;
  onChangeDocument?: (value: string) => void;
  gender?: PassengerGender;
  genderError?: string;
  onChangeGender?: (gender: PassengerGender) => void;
};

/**
 * PassengerForm — card recolhível de um viajante (adulto/criança/bebê), com
 * os 5 campos usados por qualquer tipo de passageiro no zupper-app: nome,
 * sobrenome, data de nascimento, CPF e sexo. Extraído do
 * CheckoutTravelersForm (libs/checkout/components) — lá o "accordion" é
 * artesanal (não é um componente de biblioteca), reproduzido aqui do mesmo
 * jeito: cabeçalho tocável + corpo condicional.
 */
export const PassengerForm = ({
  title,
  expanded = true,
  onToggleExpanded,
  firstName,
  firstNameError,
  onChangeFirstName,
  lastName,
  lastNameError,
  onChangeLastName,
  birthDate,
  birthDateError,
  onChangeBirthDate,
  document,
  documentError,
  onChangeDocument,
  gender,
  genderError,
  onChangeGender,
}: PassengerFormProps): React.ReactElement => (
  <View>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      accessibilityState={{ expanded }}
      onPress={onToggleExpanded}
      className="flex-row items-center justify-between py-xl"
    >
      <Text className="font-sans text-cardTitle text-fg-secondary">{title}</Text>
      <Icon name={expanded ? 'chevron-up' : 'chevron-down'} size={24} color={colors.text.secondary} />
    </Pressable>

    {expanded ? (
      <View className="gap-xxl border-b border-border-default pb-xxxl">
        <Input
          label="Primeiro Nome *"
          placeholder="Insira seu nome"
          icon="id-card"
          autoCapitalize="words"
          value={firstName}
          onChangeText={onChangeFirstName}
          error={firstNameError}
        />
        <Input
          label="Último Sobrenome *"
          placeholder="Insira seu sobrenome"
          icon="id-card"
          autoCapitalize="words"
          value={lastName}
          onChangeText={onChangeLastName}
          error={lastNameError}
        />
        <Input
          label="Data de Nascimento *"
          placeholder="00/00/0000"
          icon="calendar"
          keyboardType="number-pad"
          value={birthDate}
          onChangeText={onChangeBirthDate}
          error={birthDateError}
        />
        <View className="gap-xs">
          <Text className="font-sans text-inputLabel text-fg-label">CPF *</Text>
          <Input
            placeholder="000.000.000-00"
            icon="card"
            keyboardType="numeric"
            value={document}
            onChangeText={onChangeDocument}
            error={documentError}
          />
        </View>
        <View className="gap-md">
          <Text className="font-sans text-inputLabel text-fg-label">Sexo *</Text>
          <View className="flex-row items-center gap-xl">
            <RadioOption label="Masculino" selected={gender === 'male'} onPress={() => onChangeGender?.('male')} />
            <RadioOption
              label="Feminino"
              selected={gender === 'female'}
              onPress={() => onChangeGender?.('female')}
            />
          </View>
          {genderError ? (
            <Text className="self-end font-sans text-inputError text-feedback-danger">{genderError}</Text>
          ) : null}
        </View>
      </View>
    ) : null}
  </View>
);
