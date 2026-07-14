import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CheckoutHeader } from '../../organisms/CheckoutHeader';
import { NextStepFooter } from '../../organisms/NextStepFooter';
import { TripSummaryFooter } from '../../organisms/TripSummaryFooter';
import { PaymentMethodSelector } from '../../organisms/PaymentMethodSelector';
import type { PaymentMethod } from '../../organisms/PaymentMethodSelector';
import { CreditCardForm } from '../../organisms/CreditCardForm';
import type { CreditCardFormProps } from '../../organisms/CreditCardForm';
import { PixForm } from '../../organisms/PixForm';
import type { PixFormProps } from '../../organisms/PixForm';

export type CheckoutPaymentProps = {
  currentStep?: number;
  totalSteps?: number;
  offerDuration?: string;
  paymentMethod?: PaymentMethod;
  paymentMethodError?: string;
  onChangePaymentMethod?: (method: PaymentMethod) => void;
  creditCard?: CreditCardFormProps;
  pix?: PixFormProps;
  securityBadge?: React.ReactNode;
  route: string;
  tripDate: string;
  totalPrice: string;
  onBack?: () => void;
  onPressNextStep?: () => void;
  onPressTripDetails?: () => void;
};

/**
 * CheckoutPayment — etapa 3 de 4 do Checkout (seleção de pagamento).
 * Extraído do CheckoutPaymentForm do zupper-app (libs/checkout/components):
 * escolha entre Cartão de Crédito e PIX, com o formulário correspondente
 * exibido condicionalmente. Bancária e dinheiro existem no modelo do app
 * real mas ficam sempre desabilitadas lá — fora do escopo aqui também.
 */
export const CheckoutPayment = ({
  currentStep = 3,
  totalSteps = 4,
  offerDuration,
  paymentMethod,
  paymentMethodError,
  onChangePaymentMethod,
  creditCard,
  pix,
  securityBadge,
  route,
  tripDate,
  totalPrice,
  onBack,
  onPressNextStep,
  onPressTripDetails,
}: CheckoutPaymentProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <CheckoutHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} offerDuration={offerDuration} />

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="gap-lg bg-surface-default px-xl py-xl">
        <Text className="font-sans text-checkoutStepTitle text-fg-secondary">Como prefere pagar?</Text>
        <Text className="font-sans text-cardTitle text-fg-secondary">Forma de pagamento</Text>

        <PaymentMethodSelector
          selected={paymentMethod}
          onChange={onChangePaymentMethod}
          error={paymentMethodError}
        />

        {paymentMethod === 'creditCard' ? <CreditCardForm {...creditCard} /> : null}
        {paymentMethod === 'pix' ? <PixForm {...pix} /> : null}
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
