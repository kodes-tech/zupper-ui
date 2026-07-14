import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type NumberStepperProps = {
  value: number;
  /** Desabilita o "−" (ex.: mínimo 1 adulto). */
  canDecrement?: boolean;
  /** Desabilita o "+" (ex.: quarto lotado). */
  canIncrement?: boolean;
  onDecrement?: () => void;
  onIncrement?: () => void;
  /** Rótulo acessível do controle (ex.: "Adultos"). */
  label?: string;
};

/**
 * Botão quadrado do stepper. No app o "+"/"−" são glifos de texto (não ícones),
 * 32×32, borda 1px e o sinal na cor da marca — reproduzido aqui.
 */
const StepButton = ({
  sign,
  disabled,
  onPress,
  accessibilityLabel,
}: {
  sign: '+' | '−';
  disabled?: boolean;
  onPress?: () => void;
  accessibilityLabel: string;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={accessibilityLabel}
    accessibilityState={{ disabled }}
    disabled={disabled}
    onPress={onPress}
    className="h-[32px] w-[32px] items-center justify-center rounded-md border border-border-subtle"
  >
    <Text className={`font-sans text-md ${disabled ? 'text-fg-muted' : 'text-brand-zupper'}`}>{sign}</Text>
  </Pressable>
);

/**
 * NumberStepper — controle numérico +/− da config de hóspedes/quartos.
 * Apresentacional: o valor e os limites (can*) vêm por props. Extraído do
 * NumberSpinner do zupper-app.
 */
export const NumberStepper = ({
  value,
  canDecrement = true,
  canIncrement = true,
  onDecrement,
  onIncrement,
  label = '',
}: NumberStepperProps): React.ReactElement => (
  <View className="flex-row items-center gap-[10px]">
    <StepButton
      sign="−"
      disabled={!canDecrement}
      onPress={onDecrement}
      accessibilityLabel={`Diminuir ${label}`.trim()}
    />
    <Text className="min-w-[16px] text-center font-sans text-md text-fg-secondary">{value}</Text>
    <StepButton
      sign="+"
      disabled={!canIncrement}
      onPress={onIncrement}
      accessibilityLabel={`Aumentar ${label}`.trim()}
    />
  </View>
);
