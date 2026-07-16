import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '../../atoms/Input';
import { SelectField } from '../../molecules/SelectField';
import { CheckboxOption } from '../../molecules/CheckboxOption';
import { RadioOption } from '../../molecules/RadioOption';
import { AddressForm } from '../AddressForm';
import type { AddressFormProps } from '../AddressForm';

export type CardContactMethod = 'cellphone' | 'phone';

export type CreditCardFormProps = {
  cardNumber?: string;
  cardNumberError?: string;
  onChangeCardNumber?: (value: string) => void;
  cardName?: string;
  cardNameError?: string;
  onChangeCardName?: (value: string) => void;
  /** Formato "MM/AA". */
  expiration?: string;
  expirationError?: string;
  onChangeExpiration?: (value: string) => void;
  cvv?: string;
  cvvError?: string;
  onChangeCvv?: (value: string) => void;
  /** Rótulo já resolvido da opção de parcelas escolhida (ex.: "3x Sem juros"). */
  installmentsLabel?: string;
  installmentsError?: string;
  onPressInstallments?: () => void;
  isCardOwner?: boolean;
  onToggleIsCardOwner?: () => void;
  holderName?: string;
  holderNameError?: string;
  onChangeHolderName?: (value: string) => void;
  holderDocument?: string;
  holderDocumentError?: string;
  onChangeHolderDocument?: (value: string) => void;
  holderContactMethod?: CardContactMethod;
  onChangeHolderContactMethod?: (method: CardContactMethod) => void;
  holderPhone?: string;
  holderPhoneError?: string;
  onChangeHolderPhone?: (value: string) => void;
  addressForm?: AddressFormProps;
};

/**
 * CreditCardForm — dados do cartão, contato do titular e endereço de
 * cobrança. Extraído do CreditCardForm do zupper-app
 * (libs/checkout/components/payments). Simplificações documentadas no PR:
 * sem detecção de bandeira (ícone fixo "card") e sem preview visual do
 * cartão — o app real também não tem um.
 */
export const CreditCardForm = ({
  cardNumber,
  cardNumberError,
  onChangeCardNumber,
  cardName,
  cardNameError,
  onChangeCardName,
  expiration,
  expirationError,
  onChangeExpiration,
  cvv,
  cvvError,
  onChangeCvv,
  installmentsLabel,
  installmentsError,
  onPressInstallments,
  isCardOwner = false,
  onToggleIsCardOwner,
  holderName,
  holderNameError,
  onChangeHolderName,
  holderDocument,
  holderDocumentError,
  onChangeHolderDocument,
  holderContactMethod = 'cellphone',
  onChangeHolderContactMethod,
  holderPhone,
  holderPhoneError,
  onChangeHolderPhone,
  addressForm,
}: CreditCardFormProps): React.ReactElement => (
  <View className="gap-xl pt-xl">
    <Text className="font-sans text-cardTitle text-fg-secondary">Cartão de Crédito</Text>

    <Input
      label="Número do cartão *"
      placeholder="Digite o número do seu cartão"
      icon="card"
      keyboardType="numeric"
      value={cardNumber}
      onChangeText={onChangeCardNumber}
      error={cardNumberError}
    />

    <Input
      label="Nome impresso no cartão *"
      placeholder="Insira o nome completo"
      icon="id-card"
      autoCapitalize="words"
      maxLength={30}
      value={cardName}
      onChangeText={onChangeCardName}
      error={cardNameError}
    />

    <View className="flex-row gap-xl">
      <View className="flex-1">
        <Input
          label="Validade *"
          placeholder="MM/AA"
          icon="calendar"
          keyboardType="numeric"
          value={expiration}
          onChangeText={onChangeExpiration}
          error={expirationError}
        />
      </View>
      <View className="flex-1">
        <Input
          label="CVV *"
          placeholder="CVV"
          icon="lock"
          keyboardType="numeric"
          value={cvv}
          onChangeText={onChangeCvv}
          error={cvvError}
        />
      </View>
    </View>

    <View className="gap-xs">
      <Text className="font-sans text-inputLabel text-fg-label">Parcelamento *</Text>
      <SelectField
        value={installmentsLabel}
        placeholder="Selecione o número de parcelas"
        onPress={onPressInstallments}
      />
      {installmentsError ? (
        <Text className="self-end font-sans text-inputError text-feedback-danger">{installmentsError}</Text>
      ) : null}
    </View>

    <Text className="font-sans text-cardTitle text-fg-secondary">Contato do titular do cartão</Text>

    <CheckboxOption label="Eu sou o titular do cartão" checked={isCardOwner} onPress={onToggleIsCardOwner} />

    <Input
      label="Nome Completo *"
      placeholder="Insira o nome completo"
      icon="id-card"
      autoCapitalize="words"
      value={holderName}
      onChangeText={onChangeHolderName}
      error={holderNameError}
    />

    <View className="gap-xs">
      <Text className="font-sans text-inputLabel text-fg-label">CPF *</Text>
      <Input
        placeholder="000.000.000-00"
        icon="card"
        keyboardType="numeric"
        value={holderDocument}
        onChangeText={onChangeHolderDocument}
        error={holderDocumentError}
      />
    </View>

    <View className="gap-md">
      <Text className="font-sans text-inputLabel text-fg-label">Contato *</Text>
      <View className="flex-row items-center gap-xl">
        <RadioOption
          label="Celular"
          selected={holderContactMethod === 'cellphone'}
          onPress={() => onChangeHolderContactMethod?.('cellphone')}
        />
        <RadioOption
          label="Telefone"
          selected={holderContactMethod === 'phone'}
          onPress={() => onChangeHolderContactMethod?.('phone')}
        />
      </View>
      <Input
        placeholder={holderContactMethod === 'phone' ? '(00) 3333-3333' : '(00) 99999-9999'}
        icon="phone"
        keyboardType="numeric"
        value={holderPhone}
        onChangeText={onChangeHolderPhone}
        error={holderPhoneError}
      />
    </View>

    <AddressForm title="Endereço da fatura do cartão" {...addressForm} />
  </View>
);
