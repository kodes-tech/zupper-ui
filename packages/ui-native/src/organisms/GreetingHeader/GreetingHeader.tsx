import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { AvatarFallback } from '../../atoms/AvatarFallback';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import { RoleBadge } from '../../atoms/RoleBadge';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';

export type GreetingHeaderProps = {
  /** "Olá, Carlos" / "Olá, viajante". */
  title: string;
  /** "@carlosviaja" / "seja bem-vindo". */
  subtitle: string;
  role: RoleBadgeVariant;
  /** Foto do usuário; se ausente, usa AvatarFallback com as iniciais. */
  avatar?: ImageSourcePropType;
  initials?: string;
  /** "Meu perfil" / "Fazer login". Omitido = sem link de CTA (ex.: tela de perfil). */
  ctaLabel?: string;
  onCtaPress?: () => void;
};

/**
 * GreetingHeader — saudação do topo da Home: avatar + nome/handle + RoleBadge + CTA.
 */
export const GreetingHeader = ({
  title,
  subtitle,
  role,
  avatar,
  initials = '',
  ctaLabel,
  onCtaPress,
}: GreetingHeaderProps): React.ReactElement => (
  <View className="flex-row items-center gap-md p-xl">
    {avatar ? (
      <Avatar size="lg" source={avatar} />
    ) : (
      <AvatarFallback size="lg" initials={initials} />
    )}
    <View className="flex-1">
      <Text numberOfLines={1} className="font-sans text-heading text-fg-primary">
        {title}
      </Text>
      <Text className="font-sans text-bodyMd text-fg-secondary">{subtitle}</Text>
    </View>
    <View className="items-end gap-md">
      <RoleBadge variant={role} />
      {ctaLabel ? (
        <Pressable
          accessibilityRole="button"
          onPress={onCtaPress}
          className="flex-row items-center gap-md"
        >
          <Text className="font-sans text-caption text-fg-link">{ctaLabel}</Text>
          <Icon name="chevron-right" size={iconSize.xs} />
        </Pressable>
      ) : null}
    </View>
  </View>
);
