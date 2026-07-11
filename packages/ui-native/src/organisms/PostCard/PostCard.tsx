import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { Badge } from '../../atoms/Badge';
import { RoleBadge } from '../../atoms/RoleBadge';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';
import { LikeButton } from '../../molecules/LikeButton';

export type PostType = 'dica' | 'foto' | 'roteiro';

export type PostCardProps = {
  authorName: string;
  authorAvatar: ImageSourcePropType;
  /** Papel do autor — reaproveita o RoleBadge (traveler/partner). */
  role: Extract<RoleBadgeVariant, 'traveler' | 'partner'>;
  verified?: boolean;
  type: PostType;
  /** Título/resumo do post. */
  text: string;
  /** Imagem opcional (posts do tipo "foto"). */
  image?: ImageSourcePropType;
  location?: string;
  likes: number;
  liked?: boolean;
  onPress?: () => void;
  onLike?: () => void;
};

const typeLabel: Record<PostType, string> = {
  dica: 'Dica local',
  foto: 'Foto',
  roteiro: 'Roteiro',
};

/**
 * PostCard — card de publicação do feed da comunidade (organism).
 * Compõe atoms (Avatar, RoleBadge, Badge) + a molécula LikeButton. Apresentacional:
 * dados por props; ações por `onPress`/`onLike`.
 */
export const PostCard = ({
  authorName,
  authorAvatar,
  role,
  verified = false,
  type,
  text,
  image,
  location,
  likes,
  liked,
  onPress,
  onLike,
}: PostCardProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    onPress={onPress}
    className="w-full gap-md rounded-sm border border-border-default bg-surface-default p-lg"
  >
    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-md">
        <Avatar size="sm" source={authorAvatar} />
        <View className="flex-row items-center gap-xs">
          <Text className="font-sans text-authorName text-fg-primary">{authorName}</Text>
          {verified ? (
            <Text accessibilityLabel="Perfil verificado" className="text-xs text-brand-strong">
              ✓
            </Text>
          ) : null}
        </View>
      </View>
      <RoleBadge variant={role} />
    </View>

    <Text className="font-sans text-bodyText text-fg-secondary">{text}</Text>

    {image ? (
      <Image source={image} resizeMode="cover" className="h-[180px] w-full rounded-sm" />
    ) : null}

    <View className="flex-row items-center justify-between">
      <View className="flex-row items-center gap-md">
        <Badge label={typeLabel[type]} tone="brand" />
        {location ? (
          <Text className="font-sans text-caption text-fg-muted">{location}</Text>
        ) : null}
      </View>
      <LikeButton count={likes} liked={liked} onPress={onLike} />
    </View>
  </Pressable>
);
