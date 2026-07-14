import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { CheckoutHeader } from '../../organisms/CheckoutHeader';
import { NextStepFooter } from '../../organisms/NextStepFooter';
import { TripSummaryFooter } from '../../organisms/TripSummaryFooter';
import { PassengerForm } from '../../organisms/PassengerForm';
import type { PassengerGender } from '../../organisms/PassengerForm';

export type PassengerField = 'firstName' | 'lastName' | 'birthDate' | 'document' | 'gender';

export type Passenger = {
  /** Identificador estável do passageiro (não vem do app real — é dado). */
  id: string;
  /** Título do card, já resolvido (ex.: "Adulto 1", "Criança 1 / Quarto 2"). */
  title: string;
  firstName?: string;
  firstNameError?: string;
  lastName?: string;
  lastNameError?: string;
  birthDate?: string;
  birthDateError?: string;
  document?: string;
  documentError?: string;
  gender?: PassengerGender;
  genderError?: string;
};

export type CheckoutTravelersProps = {
  currentStep?: number;
  totalSteps?: number;
  offerDuration?: string;
  passengers: Passenger[];
  /** Ids expandidos. Omitido = todos expandidos (estado inicial do app real). */
  expandedPassengerIds?: string[];
  onToggleExpanded?: (id: string) => void;
  onChangePassengerField?: (id: string, field: PassengerField, value: string) => void;
  securityBadge?: React.ReactNode;
  route: string;
  tripDate: string;
  totalPrice: string;
  onBack?: () => void;
  onPressNextStep?: () => void;
  onPressTripDetails?: () => void;
};

/**
 * CheckoutTravelers — etapa 2 de 4 do Checkout (identificação dos
 * viajantes). Extraído do CheckoutTravelersForm do zupper-app
 * (libs/checkout/components): um card recolhível (PassengerForm) por
 * passageiro — adulto, criança e bebê usam os mesmos 5 campos, só muda o
 * título do card e a validação de idade (que fica no app consumidor).
 */
export const CheckoutTravelers = ({
  currentStep = 2,
  totalSteps = 4,
  offerDuration,
  passengers,
  expandedPassengerIds,
  onToggleExpanded,
  onChangePassengerField,
  securityBadge,
  route,
  tripDate,
  totalPrice,
  onBack,
  onPressNextStep,
  onPressTripDetails,
}: CheckoutTravelersProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <CheckoutHeader currentStep={currentStep} totalSteps={totalSteps} onBack={onBack} offerDuration={offerDuration} />

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="gap-lg bg-surface-default px-xl py-xl">
        <Text className="font-sans text-checkoutStepTitle text-fg-secondary">Quem vai viajar?</Text>

        <View className="gap-lg">
          {passengers.map((passenger) => (
            <PassengerForm
              key={passenger.id}
              title={passenger.title}
              expanded={!expandedPassengerIds || expandedPassengerIds.includes(passenger.id)}
              onToggleExpanded={() => onToggleExpanded?.(passenger.id)}
              firstName={passenger.firstName}
              firstNameError={passenger.firstNameError}
              onChangeFirstName={(value) => onChangePassengerField?.(passenger.id, 'firstName', value)}
              lastName={passenger.lastName}
              lastNameError={passenger.lastNameError}
              onChangeLastName={(value) => onChangePassengerField?.(passenger.id, 'lastName', value)}
              birthDate={passenger.birthDate}
              birthDateError={passenger.birthDateError}
              onChangeBirthDate={(value) => onChangePassengerField?.(passenger.id, 'birthDate', value)}
              document={passenger.document}
              documentError={passenger.documentError}
              onChangeDocument={(value) => onChangePassengerField?.(passenger.id, 'document', value)}
              gender={passenger.gender}
              genderError={passenger.genderError}
              onChangeGender={(gender) => onChangePassengerField?.(passenger.id, 'gender', gender)}
            />
          ))}
        </View>
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
