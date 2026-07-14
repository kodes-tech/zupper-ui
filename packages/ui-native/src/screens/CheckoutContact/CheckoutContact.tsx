import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Input } from '../../atoms/Input';
import { RadioOption } from '../../molecules/RadioOption';
import { CheckboxOption } from '../../molecules/CheckboxOption';
import { CheckoutHeader } from '../../organisms/CheckoutHeader';
import { NextStepFooter } from '../../organisms/NextStepFooter';
import { TripSummaryFooter } from '../../organisms/TripSummaryFooter';

export type ContactMethod = 'cellphone' | 'phone';

export type CheckoutContactProps = {
  currentStep?: number;
  totalSteps?: number;
  /** Tempo restante da oferta (ex.: "14:38"). Omitido = sem banner. */
  offerDuration?: string;
  /** Nome usado na saudação do texto explicativo. Padrão: "Viajante". */
  travelerName?: string;
  /** E-mail já confirmado do viajante — muda o texto explicativo. */
  confirmationEmail?: string;
  fullName?: string;
  fullNameError?: string;
  email?: string;
  emailError?: string;
  contactMethod?: ContactMethod;
  phone?: string;
  phoneError?: string;
  smsOptIn?: boolean;
  /** Selo de segurança do parceiro (logo real), injetado pelo app consumidor. */
  securityBadge?: React.ReactNode;
  /** Rota da viagem no rodapé fixo (ex.: "GRU - REC"). */
  route: string;
  /** Data da viagem no rodapé fixo (ex.: "15 de julho"). */
  tripDate: string;
  /** Preço total no rodapé fixo (ex.: "R$ 2.434,67"). */
  totalPrice: string;
  onBack?: () => void;
  onChangeFullName?: (value: string) => void;
  onChangeEmail?: (value: string) => void;
  onChangeContactMethod?: (method: ContactMethod) => void;
  onChangePhone?: (value: string) => void;
  onToggleSmsOptIn?: () => void;
  onPressNextStep?: () => void;
  onPressTripDetails?: () => void;
};

/**
 * CheckoutContact — etapa 1 de 4 do Checkout (dados de contato). Extraído do
 * CheckoutContactForm do zupper-app (libs/checkout/components), com o header
 * (CheckoutHeader), o CTA + aviso de segurança (NextStepFooter) e o resumo
 * fixo da viagem (TripSummaryFooter, compartilhado pelas 4 etapas do fluxo
 * real). Apresentacional: validação (obrigatório, formato de e-mail/telefone)
 * fica no app consumidor (react-hook-form + zod no zupper-app) — aqui só
 * recebe as mensagens de erro já resolvidas.
 */
export const CheckoutContact = ({
  currentStep = 1,
  totalSteps = 4,
  offerDuration,
  travelerName = 'Viajante',
  confirmationEmail,
  fullName,
  fullNameError,
  email,
  emailError,
  contactMethod = 'cellphone',
  phone,
  phoneError,
  smsOptIn = false,
  securityBadge,
  route,
  tripDate,
  totalPrice,
  onBack,
  onChangeFullName,
  onChangeEmail,
  onChangeContactMethod,
  onChangePhone,
  onToggleSmsOptIn,
  onPressNextStep,
  onPressTripDetails,
}: CheckoutContactProps): React.ReactElement => (
  <View className="flex-1 bg-surface-default">
    <CheckoutHeader
      currentStep={currentStep}
      totalSteps={totalSteps}
      onBack={onBack}
      offerDuration={offerDuration}
    />

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="gap-xl px-xl py-xl">
        <Text className="font-sans text-checkoutStepTitle text-fg-secondary">Como falamos com você?</Text>

        <Text className="font-sans text-bodyText text-fg-subtle">
          <Text className="font-bold text-fg-secondary">{travelerName}</Text>
          {
            ', todas as informações importantes (acompanhamento do pedido e vouchers) serão enviadas para seu endereço de e-mail'
          }
          {confirmationEmail ? (
            <Text className="font-bold text-fg-secondary"> {confirmationEmail}</Text>
          ) : (
            '.'
          )}
        </Text>

        <Input
          label="Nome Completo *"
          placeholder="Insira seu nome"
          icon="id-card"
          value={fullName}
          onChangeText={onChangeFullName}
          error={fullNameError}
        />

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

        {contactMethod === 'cellphone' ? (
          <CheckboxOption
            label="Aceito receber o status do meu pedido por SMS"
            checked={smsOptIn}
            onPress={onToggleSmsOptIn}
          />
        ) : null}
      </View>

      <NextStepFooter onPressNext={onPressNextStep} securityBadge={securityBadge} />
    </ScrollView>

    <TripSummaryFooter
      route={route}
      dateLabel={tripDate}
      totalPrice={totalPrice}
      onPressDetails={onPressTripDetails}
    />
  </View>
);
