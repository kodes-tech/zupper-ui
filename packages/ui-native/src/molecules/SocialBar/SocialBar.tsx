import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type SocialBarProps = {
  likes: number;
  comments: number;
  liked?: boolean;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onMore?: () => void;
};

/**
 * SocialBar — barra de ações do conteúdo: curtir (com contador), comentar (com
 * contador), compartilhar e "mais opções". Reproduz o "social-bar" de
 * `_figma/conteudo`. Apresentacional: contadores por props; ações por callbacks.
 */
export const SocialBar = ({
  likes,
  comments,
  liked = false,
  onLike,
  onComment,
  onShare,
  onMore,
}: SocialBarProps): React.ReactElement => (
  <View className="h-[52px] flex-row items-center justify-between">
    <View className="flex-row items-center gap-xxl">
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ selected: liked }}
        accessibilityLabel={`Curtir — ${likes} curtidas`}
        onPress={onLike}
        className="flex-row items-center gap-xs"
      >
        <Icon name="heart" size={24} />
        <Text className="font-sans text-authorName text-fg-secondary">{likes}</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Comentar — ${comments} comentários`}
        onPress={onComment}
        className="flex-row items-center gap-xs"
      >
        <Icon name="social-comment" size={24} />
        <Text className="font-sans text-authorName text-fg-secondary">{comments}</Text>
      </Pressable>
      <Pressable accessibilityRole="button" accessibilityLabel="Compartilhar" onPress={onShare}>
        <Icon name="social-share" size={24} />
      </Pressable>
    </View>
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Mais opções"
      onPress={onMore}
      className="h-[24px] w-[24px] items-center justify-center"
    >
      <Icon name="social-more" size={20} />
    </Pressable>
  </View>
);
