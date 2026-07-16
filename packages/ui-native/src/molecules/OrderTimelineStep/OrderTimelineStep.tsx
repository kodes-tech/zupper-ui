import React from 'react';
import { Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

/** Tom do passo — casa com as cores de situação (success/warning/danger). */
export type OrderTimelineTone = 'success' | 'warning' | 'danger';

export type OrderTimelineStepProps = {
  title: string;
  /** Data/hora do passo (ex.: "28/02/2023 às 15:55"), mostrada abaixo do título. */
  timestamp?: string;
  tone?: OrderTimelineTone;
  /** Ícone do círculo; por padrão deriva do tom (feito/pendente/falha). */
  icon?: IconName;
  /** Último passo — não desenha o conector abaixo. */
  last?: boolean;
};

const iconByTone: Record<OrderTimelineTone, IconName> = {
  success: 'order-step-done',
  warning: 'order-step-pending',
  danger: 'order-step-failed',
};

const circleByTone: Record<OrderTimelineTone, string> = {
  success: 'bg-feedback-successSurface',
  warning: 'bg-feedback-warningSurface',
  danger: 'bg-feedback-dangerSurface',
};

const colorByTone: Record<OrderTimelineTone, string> = {
  success: colors.feedback.successStrong,
  warning: colors.feedback.warningStrong,
  danger: colors.feedback.dangerStrong,
};

/**
 * OrderTimelineStep — um passo da linha do tempo do pedido: ícone de situação
 * num círculo colorido + título e data/hora, com conector tracejado abaixo
 * (exceto no último). Apresentacional. Segue "Timeline checkout" do Figma
 * (Detalhes Pedido).
 */
export const OrderTimelineStep = ({
  title,
  timestamp,
  tone = 'success',
  icon,
  last = false,
}: OrderTimelineStepProps): React.ReactElement => (
  <View className="flex-row gap-md">
    <View className="items-center">
      <View className={`h-[30px] w-[30px] items-center justify-center rounded-pill ${circleByTone[tone]}`}>
        <Icon name={icon ?? iconByTone[tone]} size={18} color={colorByTone[tone]} />
      </View>
      {!last ? (
        <Icon
          name="order-timeline-connector"
          width={2}
          height={14}
          color={colors.border.default}
        />
      ) : null}
    </View>

    <View className="gap-xxs pt-xs">
      <Text className="font-sans text-paragraphMd font-medium text-fg-secondary">{title}</Text>
      {timestamp ? <Text className="font-sans text-caption text-fg-subtle">{timestamp}</Text> : null}
    </View>
  </View>
);
