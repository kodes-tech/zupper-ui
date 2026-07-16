import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { CheckboxOption } from '../../molecules/CheckboxOption';

export type TermsAcceptanceProps = {
  receiveNews?: boolean;
  onToggleReceiveNews?: () => void;
  termsAccepted?: boolean;
  onToggleTerms?: () => void;
  termsError?: string;
  onPressTermsOfUse?: () => void;
  onPressFareRules?: () => void;
};

/**
 * TermsAcceptance — "Informações importantes": opt-in de novidades por
 * e-mail + aceite dos termos de uso/regras da tarifa. Extraído do
 * CheckoutImportantInformation do zupper-app (libs/checkout/components) —
 * variante AERIAL (voos); a variante HOTEL tem um texto de termos diferente,
 * fora do escopo aqui. "Termos de uso" e "Regras da Tarifa" são texto tocável
 * (o app real abre modal/URL) — a navegação fica pro app consumidor.
 */
export const TermsAcceptance = ({
  receiveNews = false,
  onToggleReceiveNews,
  termsAccepted = false,
  onToggleTerms,
  termsError,
  onPressTermsOfUse,
  onPressFareRules,
}: TermsAcceptanceProps): React.ReactElement => (
  <View className="gap-lg">
    <Text className="font-sans text-cardTitle text-fg-secondary">Informações importantes</Text>

    <CheckboxOption
      label="Quero receber novidades, promoções e ofertas especiais por e-mail."
      checked={receiveNews}
      onPress={onToggleReceiveNews}
    />

    <View className="gap-xs">
      <View className="flex-row items-start gap-sm">
        <Pressable
          accessibilityRole="checkbox"
          accessibilityState={{ checked: termsAccepted }}
          accessibilityLabel="Aceito os termos e condições"
          onPress={onToggleTerms}
        >
          <Icon name={termsAccepted ? 'checkbox-check' : 'checkbox-empty'} size={20} />
        </Pressable>
        <Text className="flex-1 font-sans text-md font-normal text-fg-subtle">
          Li e aceito as condições dos{' '}
          <Text onPress={onPressTermsOfUse} className="font-bold underline">
            Termos de uso
          </Text>{' '}
          e tenho conhecimento das{' '}
          <Text onPress={onPressFareRules} className="font-bold underline">
            Regras da Tarifa.
          </Text>
        </Text>
      </View>
      {termsError ? (
        <Text className="self-end font-sans text-inputError text-feedback-danger">{termsError}</Text>
      ) : null}
    </View>
  </View>
);
