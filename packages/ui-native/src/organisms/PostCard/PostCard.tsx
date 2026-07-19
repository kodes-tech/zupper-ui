import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';
import { RoleBadge } from '../../atoms/RoleBadge';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';
import { LikeButton } from '../../molecules/LikeButton';

export type PostType = 'dica' | 'foto' | 'roteiro';

export type PostCardProps = {
  authorName: string;
  authorAvatar: ImageSourcePropType;
  role: Extract<RoleBadgeVariant, 'traveler' | 'partner'>;
  verified?: boolean;
  type: PostType;
  /** Corpo (dica/foto). */
  text?: string;
  /** Título (roteiro). */
  title?: string;
  /** Paradas do roteiro (preview-rota). */
  stops?: string[];
  /** "+N paradas" ao fim do preview-rota. */
  extraStops?: number;
  /** Imagem (foto). */
  image?: ImageSourcePropType;
  location?: string;
  likes: number;
  liked?: boolean;
  onPress?: () => void;
  onLike?: () => void;
};

const typeLabel: Record<PostType, string> = { dica: 'Dica', foto: 'Foto', roteiro: 'Roteiro' };
const typeIcon: Record<PostType, IconName> = {
  dica: 'content-dica',
  foto: 'content-foto',
  roteiro: 'content-roteiro',
};

/**
 * PostCard — card de publicação do feed (organism). Suporta dica, foto e roteiro
 * (com preview de paradas). Compõe Avatar, RoleBadge, Icon e LikeButton.
 * Apresentacional: dados por props; ações por onPress/onLike.
 */
export const PostCard = ({
  authorName,
  authorAvatar,
  role,
  verified = false,
  type,
  text,
  title,
  stops = [],
  extraStops,
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
    className="w-full gap-lg rounded-sm border border-border-default bg-surface-default p-lg"
  >
    <View className="flex-row items-start justify-between">
      <View className="flex-row items-center gap-md">
        <Avatar size="sm" source={authorAvatar} />
        <View className="flex-row items-center gap-xs">
          <Text className="font-sans text-authorName text-fg-primary">{authorName}</Text>
          {verified ? <Icon name="verified" size={iconSize.sm} /> : null}
        </View>
      </View>
      <RoleBadge variant={role} />
    </View>

    {type === 'roteiro' ? (
      <>
        {title ? (
          <Text className="font-sans text-roteiroTitle text-fg-secondary">{title}</Text>
        ) : null}
        <View className="flex-row flex-wrap items-center gap-sm rounded-md border border-border-default px-[10px] py-md">
          {stops.map((stop, i) => (
            <React.Fragment key={`${stop}-${i}`}>
              <Icon name="dot-separator" size={8} />
              <Text className="font-sans text-caption text-fg-secondary">{stop}</Text>
            </React.Fragment>
          ))}
          {extraStops ? (
            <>
              <Icon name="dot-separator" size={8} />
              <Text className="font-sans text-caption text-fg-muted">+{extraStops} paradas</Text>
            </>
          ) : null}
        </View>
      </>
    ) : (
      text && <Text className="font-sans text-bodyText text-fg-secondary">{text}</Text>
    )}

    {image ? (
      <Image source={image} resizeMode="cover" className="h-[338px] w-full rounded-xs" />
    ) : null}

    <View className="flex-row items-end justify-between gap-xs">
      <View className="flex-row flex-wrap items-center gap-xs">
        <View className="flex-row items-center gap-xs rounded-xs bg-surface-tag px-md py-xs">
          <Icon name={typeIcon[type]} size={14} />
          <Text className="font-sans text-caption text-fg-primary">{typeLabel[type]}</Text>
        </View>
        {location ? (
          <View className="flex-row items-center gap-xs">
            <Icon name="location" size={iconSize.sm} />
            <Text className="font-sans text-caption text-fg-secondary">{location}</Text>
          </View>
        ) : null}
      </View>
      <LikeButton count={likes} liked={liked} onPress={onLike} />
    </View>
  </Pressable>
);
