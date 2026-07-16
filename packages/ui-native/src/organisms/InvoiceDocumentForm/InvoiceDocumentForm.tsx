import React from 'react';
import { Text, View } from 'react-native';
import { Input } from '../../atoms/Input';
import { CheckboxOption } from '../../molecules/CheckboxOption';
import { SegmentedControl } from '../../molecules/SegmentedControl';

export type InvoicePersonType = 'CPF' | 'CNPJ';

export type InvoiceDocumentFormProps = {
  personType?: InvoicePersonType;
  onChangePersonType?: (type: InvoicePersonType) => void;
  name?: string;
  nameError?: string;
  onChangeName?: (value: string) => void;
  document?: string;
  documentError?: string;
  onChangeDocument?: (value: string) => void;
  /** Só aplicável à Pessoa Jurídica. */
  hasMunicipalRegistration?: boolean;
  onToggleMunicipalRegistration?: () => void;
  municipalRegistration?: string;
  onChangeMunicipalRegistration?: (value: string) => void;
};

/**
 * InvoiceDocumentForm — dados fiscais da nota (Pessoa Física/Jurídica) da
 * etapa de fatura do Checkout. Extraído do CheckoutInvoiceForm do zupper-app
 * (libs/checkout/components): toggle PF/PJ (o app real usa o mesmo `Tab`
 * reaproveitado aqui como SegmentedControl), nome/razão social, CPF/CNPJ e,
 * só em PJ, a inscrição municipal opcional.
 */
export const InvoiceDocumentForm = ({
  personType = 'CPF',
  onChangePersonType,
  name,
  nameError,
  onChangeName,
  document,
  documentError,
  onChangeDocument,
  hasMunicipalRegistration = false,
  onToggleMunicipalRegistration,
  municipalRegistration,
  onChangeMunicipalRegistration,
}: InvoiceDocumentFormProps): React.ReactElement => {
  const isPF = personType === 'CPF';

  return (
    <View className="gap-xl">
      <SegmentedControl
        options={[
          { key: 'CPF', label: 'Pessoa Física' },
          { key: 'CNPJ', label: 'Pessoa Jurídica' },
        ]}
        selectedKey={personType}
        onChange={(key) => onChangePersonType?.(key as InvoicePersonType)}
      />

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
        <View className="gap-md">
          <CheckboxOption
            label="Informar a inscrição municipal"
            checked={hasMunicipalRegistration}
            onPress={onToggleMunicipalRegistration}
          />
          {hasMunicipalRegistration ? (
            <Input
              label="Inscrição Municipal"
              placeholder="00000000000"
              icon="card"
              keyboardType="numeric"
              value={municipalRegistration}
              onChangeText={onChangeMunicipalRegistration}
            />
          ) : null}
        </View>
      ) : null}
    </View>
  );
};
