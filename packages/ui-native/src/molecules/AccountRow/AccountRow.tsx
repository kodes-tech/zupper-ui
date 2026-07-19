import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';

export type AccountRowStatus = { label: string; tone: 'success' | 'warning' };

export type AccountRowProps = {
  icon: IconName;
  title: string;
  /** Rótulo do CTA à direita (ex.: "Editar", "Ver", "Ir agora"). */
  cta?: string;
  subtitle?: string;
  /** Selo de status (ex.: "Completo"/"Pendente"). */
  status?: AccountRowStatus;
  /**
   * `true` (padrão) — ícone dentro de uma caixa, com subtítulo (Meu perfil/
   * Comunidade). `false` — ícone simples em linha única (Ajuda/Privacidade).
   */
  boxed?: boolean;
  onPress?: () => void;
};

const statusClass: Record<AccountRowStatus['tone'], string> = {
  success: 'text-feedback-success',
  warning: 'text-feedback-warning',
};

const CtaHint = ({ label }: { label: string }) => (
  <View className="flex-row items-center gap-md">
    <Text className="font-sans text-caption text-fg-secondary">{label}</Text>
    <Icon name="chevron-right-dark" size={iconSize.xs} />
  </View>
);

/**
 * AccountRow — item de lista da tela "Minha conta". `boxed` (padrão) mostra o
 * ícone numa caixa + subtítulo/status; a variante em linha (`boxed={false}`) é o
 * item simples de Ajuda/Privacidade. Apresentacional: ação por `onPress`.
 */
export const AccountRow = ({
  icon,
  title,
  cta,
  subtitle,
  status,
  boxed = true,
  onPress,
}: AccountRowProps): React.ReactElement => {
  if (!boxed) {
    return (
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={title}
        onPress={onPress}
        className="w-full flex-row items-center justify-between gap-md"
      >
        <View className="flex-row items-center gap-lg">
          <Icon name={icon} size={iconSize.lg} />
          <Text className="font-sans text-authorName text-fg-secondary">{title}</Text>
        </View>
        {cta ? <CtaHint label={cta} /> : null}
      </Pressable>
    );
  }

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={title}
      onPress={onPress}
      className="flex-row items-start gap-lg"
    >
      <View className="h-[43px] w-[43px] items-center justify-center rounded-[14px] border border-border-subtle bg-surface-default">
        <Icon name={icon} size={iconSize.lg} />
      </View>
      <View className="flex-1 gap-xs">
        <View className="flex-row items-center justify-between gap-md">
          <Text className="font-sans text-authorName text-fg-secondary">{title}</Text>
          {cta ? <CtaHint label={cta} /> : null}
        </View>
        {subtitle || status ? (
          <View className="flex-row items-center justify-between gap-md">
            <Text className="font-sans text-caption text-fg-subtle">{subtitle}</Text>
            {status ? (
              <Text className={`font-sans text-caption ${statusClass[status.tone]}`}>
                {status.label}
              </Text>
            ) : null}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
};
