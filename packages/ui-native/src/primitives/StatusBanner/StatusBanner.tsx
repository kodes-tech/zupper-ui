import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type StatusBannerTone = 'warning' | 'danger';

export type StatusBannerProps = {
  /** `warning` — publicação em análise. `danger` — publicação removida. */
  tone: StatusBannerTone;
  title: string;
  description: string;
  /** CTA outline (ex.: "Entenda as regras da comunidade" / "Contestar decisão"). */
  actionLabel?: string;
  onPressAction?: () => void;
};

/** Emoji do cabeçalho — no Figma o ícone do banner é texto, não vetor. */
const EMOJI: Record<StatusBannerTone, string> = {
  warning: '⏳',
  danger: '⚠',
};

const surfaceClass: Record<StatusBannerTone, string> = {
  warning: 'bg-feedback-warningSurface',
  danger: 'bg-feedback-dangerSurface',
};

const contentClass: Record<StatusBannerTone, string> = {
  warning: 'text-feedback-warningStrong',
  danger: 'text-feedback-dangerStrong',
};

const actionBorderClass: Record<StatusBannerTone, string> = {
  warning: 'border-feedback-warningStrong',
  danger: 'border-feedback-dangerStrong',
};

/**
 * StatusBanner — aviso de moderação exibido ao autor no topo do seu próprio
 * conteúdo: "Publicação em análise" (`warning`) e "Publicação removida"
 * (`danger`). Apresentacional: texto e ação por props. Reproduz o `status-banner`
 * de `_figma/conteudo`.
 */
export const StatusBanner = ({
  tone,
  title,
  description,
  actionLabel,
  onPressAction,
}: StatusBannerProps): React.ReactElement => (
  <View className={`w-full gap-md rounded-lg px-xl py-[14px] ${surfaceClass[tone]}`}>
    <View className="flex-row items-center gap-md">
      <Text className={`font-sans text-[16px] ${contentClass[tone]}`}>{EMOJI[tone]}</Text>
      <Text className={`font-sans text-authorName ${contentClass[tone]}`}>{title}</Text>
    </View>
    <Text className={`font-sans text-[14px] leading-[18px] ${contentClass[tone]}`}>
      {description}
    </Text>
    {actionLabel ? (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={actionLabel}
        onPress={onPressAction}
        className={`self-start rounded-pill border bg-surface-default px-[14px] py-md ${actionBorderClass[tone]}`}
      >
        <Text className={`font-sans text-actionLabel ${contentClass[tone]}`}>{actionLabel}</Text>
      </Pressable>
    ) : null}
  </View>
);
