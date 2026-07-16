import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type StatusMessageTone = 'success' | 'warning';

const iconByTone: Record<StatusMessageTone, IconName> = {
  success: 'success-check',
  warning: 'warning-triangle',
};

const circleClassByTone: Record<StatusMessageTone, string> = {
  success: 'bg-feedback-successSurface',
  warning: 'bg-feedback-warningSurface',
};

const iconColorByTone: Record<StatusMessageTone, string> = {
  success: colors.feedback.success,
  warning: colors.feedback.warning,
};

export type StatusMessageProps = {
  tone: StatusMessageTone;
  title: string;
  description?: string;
};

/**
 * StatusMessage — círculo de ícone (sucesso/atenção) + título + descrição,
 * centralizados. Bloco reutilizado nas telas/sheets de feedback (conta
 * criada, erro de login social, cancelamento de pedido). Apresentacional.
 * Segue o "status-pedidos"/"danger" do Figma.
 */
export const StatusMessage = ({ tone, title, description }: StatusMessageProps): React.ReactElement => (
  <View className="items-center gap-xxl">
    <View className={`h-[72px] w-[72px] items-center justify-center rounded-pill ${circleClassByTone[tone]}`}>
      <Icon name={iconByTone[tone]} size={44} color={iconColorByTone[tone]} />
    </View>
    <View className="items-center gap-lg">
      <Text className="text-center font-sans text-[22px] font-bold tracking-[0.44px] text-fg-secondary">
        {title}
      </Text>
      {description ? (
        <Text className="text-center font-sans text-bodyMd text-fg-subtle">{description}</Text>
      ) : null}
    </View>
  </View>
);
