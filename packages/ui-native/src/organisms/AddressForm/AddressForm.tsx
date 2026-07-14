import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Input } from '../../atoms/Input';
import { SelectField } from '../../molecules/SelectField';
import { CheckboxOption } from '../../molecules/CheckboxOption';

export type AddressFormProps = {
  /** Título da seção (ex.: "Endereço da fatura do cartão"). Omitido = sem título próprio. */
  title?: string;
  zipCode?: string;
  zipCodeError?: string;
  onChangeZipCode?: (value: string) => void;
  onPressZipCodeHelp?: () => void;
  street?: string;
  streetError?: string;
  onChangeStreet?: (value: string) => void;
  neighborhood?: string;
  neighborhoodError?: string;
  onChangeNeighborhood?: (value: string) => void;
  number?: string;
  numberError?: string;
  onChangeNumber?: (value: string) => void;
  complement?: string;
  onChangeComplement?: (value: string) => void;
  state?: string;
  stateError?: string;
  onPressState?: () => void;
  city?: string;
  cityError?: string;
  onPressCity?: () => void;
  /** "O Endereço é o mesmo do cadastro Zupper" — só aparece se o cliente tiver endereço salvo. */
  showSameAsProfileOption?: boolean;
  sameAsProfile?: boolean;
  onToggleSameAsProfile?: () => void;
};

/**
 * AddressForm — bloco de endereço (CEP, rua, bairro, número/complemento,
 * estado/cidade). Extraído do CheckoutAddressForm do zupper-app
 * (libs/checkout/components), reaproveitado tanto no endereço de cobrança do
 * cartão (etapa 3) quanto no endereço da fatura (etapa 4). Estado/Cidade
 * usam `SelectField` (o app real também não oferece uma lista real de
 * UF/cidades aqui — o campo só exibe o valor já resolvido via CEP/perfil).
 */
export const AddressForm = ({
  title,
  zipCode,
  zipCodeError,
  onChangeZipCode,
  onPressZipCodeHelp,
  street,
  streetError,
  onChangeStreet,
  neighborhood,
  neighborhoodError,
  onChangeNeighborhood,
  number,
  numberError,
  onChangeNumber,
  complement,
  onChangeComplement,
  state,
  stateError,
  onPressState,
  city,
  cityError,
  onPressCity,
  showSameAsProfileOption = false,
  sameAsProfile = false,
  onToggleSameAsProfile,
}: AddressFormProps): React.ReactElement => (
  <View className="gap-xl">
    {title ? <Text className="font-sans text-cardTitle text-fg-secondary">{title}</Text> : null}

    {showSameAsProfileOption ? (
      <CheckboxOption
        label="O Endereço é o mesmo do cadastro Zupper"
        checked={sameAsProfile}
        onPress={onToggleSameAsProfile}
      />
    ) : null}

    <View className="gap-md">
      <View className="flex-row items-center justify-between">
        <Text className="font-sans text-inputLabel text-fg-label">CEP</Text>
        <Pressable accessibilityRole="button" accessibilityLabel="Não sei meu CEP" onPress={onPressZipCodeHelp}>
          <Text className="font-sans text-xs font-medium text-brand-zupper underline">Não sei meu CEP</Text>
        </Pressable>
      </View>
      <Input
        placeholder="00000-000"
        keyboardType="numeric"
        value={zipCode}
        onChangeText={onChangeZipCode}
        error={zipCodeError}
      />
    </View>

    <Input
      label="Endereço da fatura"
      placeholder="Endereço"
      value={street}
      onChangeText={onChangeStreet}
      error={streetError}
    />

    <Input
      label="Bairro"
      placeholder="Bairro"
      value={neighborhood}
      onChangeText={onChangeNeighborhood}
      error={neighborhoodError}
    />

    <View className="flex-row gap-lg">
      <View className="flex-1">
        <Input
          label="Número"
          placeholder="Nº"
          keyboardType="numeric"
          value={number}
          onChangeText={onChangeNumber}
          error={numberError}
        />
      </View>
      <View className="flex-1">
        <Input label="Complemento" placeholder="Complemento" value={complement} onChangeText={onChangeComplement} />
      </View>
    </View>

    <View className="gap-xs">
      <Text className="font-sans text-inputLabel text-fg-label">Estado *</Text>
      <SelectField value={state} placeholder="Selecione o estado" onPress={onPressState} />
      {stateError ? <Text className="self-end font-sans text-inputError text-feedback-danger">{stateError}</Text> : null}
    </View>

    <View className="gap-xs">
      <Text className="font-sans text-inputLabel text-fg-label">Cidade *</Text>
      <SelectField value={city} placeholder="Selecione a cidade" onPress={onPressCity} />
      {cityError ? <Text className="self-end font-sans text-inputError text-feedback-danger">{cityError}</Text> : null}
    </View>
  </View>
);
