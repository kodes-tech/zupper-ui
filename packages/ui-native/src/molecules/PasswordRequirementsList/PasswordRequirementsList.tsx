import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';

export type PasswordRequirement = {
  label: string;
  met: boolean;
};

export type PasswordRequirementsListProps = {
  requirements: PasswordRequirement[];
};

/**
 * PasswordRequirementsList — checklist de regras de senha (ex.: "Letra
 * maiúscula", "8 caracteres") em grid de 2 colunas fixas — `w-1/2` em vez de
 * `flex-wrap` por largura de conteúdo, senão as colunas desalinham conforme o
 * tamanho de cada label. Reaproveitado em `SignUp` e `ResetPassword`.
 * Apresentacional. Segue "Cadastro Senha"/"Senha - Active" do Figma.
 */
export const PasswordRequirementsList = ({
  requirements,
}: PasswordRequirementsListProps): React.ReactElement => (
  <View className="flex-row flex-wrap gap-y-md rounded-sm border border-border-subtle bg-surface-default px-md py-lg">
    {requirements.map((requirement) => (
      <View key={requirement.label} className="w-1/2 flex-row items-center gap-xs pr-xs">
        <Icon
          name={requirement.met ? 'success-check' : 'close-circle'}
          size={24}
          color={requirement.met ? colors.feedback.success : colors.feedback.danger}
        />
        <Text className="font-sans text-caption text-fg-caption">{requirement.label}</Text>
      </View>
    ))}
  </View>
);
