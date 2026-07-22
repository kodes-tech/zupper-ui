import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';
import React from 'react';
import { Text, View } from 'react-native';

export type StatusMessageTone = 'success' | 'warning';

// Ícone por tom — cada glifo já traz a cor de marca baked (success-check verde,
// warning-triangle vermelho); o Icon não recoloriza, então o tom escolhe o
// glifo, não uma cor aplicada por cima.
const iconByTone: Record<StatusMessageTone, IconName> = {
  success: 'success-check',
  warning: 'warning-triangle',
};

// Superfície do círculo atrás do ícone (par claro do tom).
const circleClassByTone: Record<StatusMessageTone, string> = {
  success: 'bg-feedback-successSurface',
  warning: 'bg-feedback-warningSurface',
};

export type StatusMessageProps = {
  /** Tom do feedback — define o ícone e a cor do círculo. */
  tone: StatusMessageTone;
  title: string;
  description?: string;
};

/**
 * StatusMessage — círculo de ícone (sucesso/atenção) + título + descrição,
 * centralizados. Bloco reutilizado nas telas/sheets de feedback (conta criada,
 * erro de login social, senha redefinida). Apresentacional.
 */
export const StatusMessage = ({
  tone,
  title,
  description,
}: StatusMessageProps): React.ReactElement => (
  <View className="items-center gap-xxl">
    <View
      className={`h-[72px] w-[72px] items-center justify-center rounded-pill ${circleClassByTone[tone]}`}
    >
      {/* 44 é tamanho de ILUSTRAÇÃO (feedback), fora da escala iconSize de UI
          (ver sizes.ts) — por isso literal, não token. */}
      <Icon name={iconByTone[tone]} size={44} />
    </View>
    <View className="items-center gap-lg">
      <Text className="text-center font-sans text-heading text-fg-secondary">{title}</Text>
      {description ? (
        <Text className="text-center font-sans text-bodyMd text-fg-subtle">{description}</Text>
      ) : null}
    </View>
  </View>
);
