import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { Input } from '../../atoms/Input';
import { RadioOption } from '../../molecules/RadioOption';

export type PersonalDataContactType = 'celular' | 'telefone';

export type PersonalDataFormProps = {
  avatar: ImageSourcePropType;
  onChangePhoto?: () => void;
  firstName?: string;
  onChangeFirstName?: (value: string) => void;
  lastName?: string;
  onChangeLastName?: (value: string) => void;
  nickname?: string;
  onChangeNickname?: (value: string) => void;
  /** Erro de validação do apelido (ex.: "Este nome está indisponível"). */
  nicknameError?: string;
  email?: string;
  onChangeEmail?: (value: string) => void;
  /** Formato "00/00/0000". */
  birthDate?: string;
  onChangeBirthDate?: (value: string) => void;
  cpf?: string;
  onChangeCpf?: (value: string) => void;
  contactType?: PersonalDataContactType;
  onChangeContactType?: (type: PersonalDataContactType) => void;
  phone?: string;
  onChangePhone?: (value: string) => void;
};

/**
 * PersonalDataForm — formulário de "Dados pessoais" da tela Minha conta: foto
 * + nome/sobrenome/apelido/e-mail/nascimento/CPF + tipo de contato (celular/
 * telefone) e telefone. Apresentacional e controlado: todo valor entra por
 * prop, sem estado interno (integração/validação ficam no app consumidor).
 * Reproduz `_figma/minha-conta` (Conta - Dados pessoais).
 */
export const PersonalDataForm = ({
  avatar,
  onChangePhoto,
  firstName,
  onChangeFirstName,
  lastName,
  onChangeLastName,
  nickname,
  onChangeNickname,
  nicknameError,
  email,
  onChangeEmail,
  birthDate,
  onChangeBirthDate,
  cpf,
  onChangeCpf,
  contactType = 'celular',
  onChangeContactType,
  phone,
  onChangePhone,
}: PersonalDataFormProps): React.ReactElement => (
  <View className="w-full gap-xl px-xxl">
    <View className="items-center gap-sm">
      <Avatar size="lg" source={avatar} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Alterar foto"
        onPress={onChangePhoto}
      >
        <Text className="font-sans text-caption text-fg-link">Alterar foto</Text>
      </Pressable>
    </View>

    <Input
      label="Primeiro nome"
      placeholder="Nome"
      type="name"
      value={firstName}
      onChangeText={onChangeFirstName}
    />
    <Input
      label="Último nome"
      placeholder="Sobrenome"
      type="name"
      value={lastName}
      onChangeText={onChangeLastName}
    />
    <Input
      label="Apelido da comunidade"
      placeholder="@nomesobrenome"
      type="username"
      value={nickname}
      onChangeText={onChangeNickname}
      error={nicknameError}
    />
    <Input
      label="E-mail"
      placeholder="seuemail@exemplo.com"
      type="email"
      value={email}
      onChangeText={onChangeEmail}
    />
    <Input
      label="Data de Nascimento"
      placeholder="00/00/0000"
      type="numeric"
      value={birthDate}
      onChangeText={onChangeBirthDate}
    />
    <Input
      label="CPF"
      placeholder="000.000.000-00"
      type="numeric"
      value={cpf}
      onChangeText={onChangeCpf}
    />

    <View className="gap-lg">
      <Text className="font-sans text-inputLabel text-fg-secondary">Contato</Text>
      <View className="flex-row gap-xxl">
        <RadioOption
          label="Celular"
          selected={contactType === 'celular'}
          onPress={() => onChangeContactType?.('celular')}
        />
        <RadioOption
          label="Telefone"
          selected={contactType === 'telefone'}
          onPress={() => onChangeContactType?.('telefone')}
        />
      </View>
      <Input
        placeholder="(00) 00000-0000"
        type="phone"
        value={phone}
        onChangeText={onChangePhone}
      />
    </View>
  </View>
);
