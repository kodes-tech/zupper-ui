import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '../../atoms/Input';
import { CheckboxOption } from '../../molecules/CheckboxOption';
import { RadioOption } from '../../molecules/RadioOption';
import { SegmentedControl } from '../../molecules/SegmentedControl';
import { InlineAlert } from '../../molecules/InlineAlert';

export type PixContactMethod = 'cellphone' | 'phone';
export type PixPersonType = 'CPF' | 'CNPJ';

export type PixFormProps = {
  personType?: PixPersonType;
  onChangePersonType?: (type: PixPersonType) => void;
  /** "O pagamento será feito com os meus dados" — só faz sentido para Pessoa Física. */
  isSelfPayer?: boolean;
  onToggleSelfPayer?: () => void;
  name?: string;
  nameError?: string;
  onChangeName?: (value: string) => void;
  document?: string;
  documentError?: string;
  onChangeDocument?: (value: string) => void;
  /** Só exibido para Pessoa Jurídica. */
  municipalRegistration?: string;
  onChangeMunicipalRegistration?: (value: string) => void;
  email?: string;
  emailError?: string;
  onChangeEmail?: (value: string) => void;
  contactMethod?: PixContactMethod;
  onChangeContactMethod?: (method: PixContactMethod) => void;
  phone?: string;
  phoneError?: string;
  onChangePhone?: (value: string) => void;
};

/**
 * PixForm — dados do pagador pra transferência via PIX. Extraído do PixForm +
 * PayerContact do zupper-app (libs/checkout/components/payments). O app
 * real não mostra QR code nem código copia-e-cola nesta etapa — só o
 * formulário de contato do pagador e o aviso de prazo.
 */
export const PixForm = ({
  personType = 'CPF',
  onChangePersonType,
  isSelfPayer = false,
  onToggleSelfPayer,
  name,
  nameError,
  onChangeName,
  document,
  documentError,
  onChangeDocument,
  municipalRegistration,
  onChangeMunicipalRegistration,
  email,
  emailError,
  onChangeEmail,
  contactMethod = 'cellphone',
  onChangeContactMethod,
  phone,
  phoneError,
  onChangePhone,
}: PixFormProps): React.ReactElement => {
  const isPF = personType === 'CPF';

  return (
    <View className="gap-xl pt-xl">
      <Text className="font-sans text-cardTitle text-fg-secondary">Transferência via PIX</Text>

      <SegmentedControl
        options={[
          { key: 'CPF', label: 'Pessoa Física' },
          { key: 'CNPJ', label: 'Pessoa Jurídica' },
        ]}
        selectedKey={personType}
        onChange={(key) => onChangePersonType?.(key as PixPersonType)}
      />

      {isPF ? (
        <CheckboxOption
          label="O pagamento será feito com os meus dados"
          checked={isSelfPayer}
          onPress={onToggleSelfPayer}
        />
      ) : null}

      <Input
        label={isPF ? 'Nome Completo *' : 'Razão Social *'}
        placeholder="Insira o nome completo"
        icon="id-card"
        autoCapitalize="words"
        value={name}
        onChangeText={onChangeName}
        error={nameError}
      />

      <View className="gap-xs">
        <Text className="font-sans text-inputLabel text-fg-label">{isPF ? 'CPF *' : 'CNPJ *'}</Text>
        <Input
          placeholder={isPF ? '000.000.000-00' : '00.000.000/0000-00'}
          icon="card"
          keyboardType="numeric"
          value={document}
          onChangeText={onChangeDocument}
          error={documentError}
        />
      </View>

      {!isPF ? (
        <Input
          label="Inscrição Municipal"
          placeholder="00000000000"
          icon="card"
          keyboardType="numeric"
          value={municipalRegistration}
          onChangeText={onChangeMunicipalRegistration}
        />
      ) : null}

      <Input
        label="E-mail *"
        placeholder="Insira seu e-mail"
        icon="email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={onChangeEmail}
        error={emailError}
      />

      <View className="gap-md">
        <Text className="font-sans text-inputLabel text-fg-label">Contato *</Text>
        <View className="flex-row items-center gap-xl">
          <RadioOption
            label="Celular"
            selected={contactMethod === 'cellphone'}
            onPress={() => onChangeContactMethod?.('cellphone')}
          />
          <RadioOption
            label="Telefone"
            selected={contactMethod === 'phone'}
            onPress={() => onChangeContactMethod?.('phone')}
          />
        </View>
        <Input
          placeholder={contactMethod === 'phone' ? '(00) 3333-3333' : '(00) 99999-9999'}
          icon="phone"
          keyboardType="numeric"
          value={phone}
          onChangeText={onChangePhone}
          error={phoneError}
        />
      </View>

      <InlineAlert message="Lembre-se que o pagamento deverá ser efetuado em até 3h depois da compra." />
    </View>
  );
};
