import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import React from 'react';
import { Text, View } from 'react-native';

export type PasswordRequirement = {
  /** Rótulo da regra (ex.: "Letra maiúscula", "8 caracteres"). */
  label: string;
  /** `true` = atendida (check verde); `false` = não atendida (x vermelho). */
  met: boolean;
};

export type PasswordRequirementsListProps = {
  /** Regras a exibir; o estado `met` é calculado pelo app consumidor. */
  requirements: PasswordRequirement[];
};

/**
 * PasswordRequirementsList — checklist de regras de senha em grid de 2 colunas
 * fixas (`w-1/2`). Cada item mostra `success-check` (verde, atendida) ou
 * `close-circle` (vermelho, não atendida) — a cor é intrínseca do ícone (o DS
 * não recolore). Apresentacional: o estado de cada regra entra por props; a
 * validação fica no app. Reaproveitado em Cadastro e Redefinir senha.
 */
export const PasswordRequirementsList = ({
  requirements,
}: PasswordRequirementsListProps): React.ReactElement => (
  <View className="w-full flex-row flex-wrap gap-y-md rounded-sm border border-border-subtle bg-surface-default px-md py-lg">
    {requirements.map((requirement) => (
      <View key={requirement.label} className="w-1/2 flex-row items-center gap-xs pr-xs">
        <Icon name={requirement.met ? 'success-check' : 'close-circle'} size={iconSize.md} />
        <Text className="font-sans text-caption text-fg-secondary">{requirement.label}</Text>
      </View>
    ))}
  </View>
);
