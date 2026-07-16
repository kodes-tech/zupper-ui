import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CheckoutHeader } from '../../organisms/CheckoutHeader';
import { NextStepFooter } from '../../organisms/NextStepFooter';
import { TripSummaryFooter } from '../../organisms/TripSummaryFooter';
import { InvoiceDocumentForm } from '../../organisms/InvoiceDocumentForm';
import type { InvoiceDocumentFormProps } from '../../organisms/InvoiceDocumentForm';
import { AddressForm } from '../../organisms/AddressForm';
import type { AddressFormProps } from '../../organisms/AddressForm';
import { TermsAcceptance } from '../../organisms/TermsAcceptance';
import type { TermsAcceptanceProps } from '../../organisms/TermsAcceptance';

export type CheckoutInvoiceProps = {
  currentStep?: number;
  totalSteps?: number;
  offerDuration?: string;
  document?: InvoiceDocumentFormProps;
  address?: AddressFormProps;
  terms?: TermsAcceptanceProps;
  securityBadge?: React.ReactNode;
  route: string;
  tripDate: string;
  totalPrice: string;
  onBack?: () => void;
  /** Última etapa: dispara a finalização real da compra (não avança de step). */
  onPressFinish?: () => void;
  onPressTripDetails?: () => void;
};

/**
 * CheckoutInvoice — etapa 4 de 4 do Checkout (emissão de nota fiscal).
 * Extraído do CheckoutInvoice + CheckoutInvoiceForm do zupper-app
 * (libs/checkout/components): dados fiscais (PF/PJ), endereço da fatura e o
 * aceite dos termos. É a única etapa em que o app real não avança de step —
 * o clique já finaliza a compra (`isLastStep`), por isso o CTA usa
 * "Finalizar compra".
 */
export const CheckoutInvoice = ({
  currentStep = 4,
  totalSteps = 4,
  offerDuration,
  document,
  address,
  terms,
  securityBadge,
  route,
  tripDate,
  totalPrice,
  onBack,
  onPressFinish,
  onPressTripDetails,
}: CheckoutInvoiceProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <CheckoutHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} offerDuration={offerDuration} />

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="gap-xl bg-surface-default px-xl py-xl">
        <Text className="font-sans text-checkoutStepTitle text-fg-secondary">Emissão de nota fiscal</Text>
        <Text className="font-sans text-cardTitle text-fg-secondary">Situação fiscal</Text>

        <InvoiceDocumentForm {...document} />
        <AddressForm {...address} />
        <TermsAcceptance {...terms} />
      </View>

      <NextStepFooter buttonLabel="Finalizar compra" onPressNext={onPressFinish} securityBadge={securityBadge} />
    </ScrollView>

    <TripSummaryFooter
      route={route}
      dateLabel={tripDate}
      totalPrice={totalPrice}
      onPressDetails={onPressTripDetails}
    />
  </View>
);
