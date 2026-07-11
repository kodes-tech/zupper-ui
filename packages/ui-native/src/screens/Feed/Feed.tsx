import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { PostCard } from '../../organisms/PostCard';
import type { PostCardProps } from '../../organisms/PostCard';

export type FeedPost = PostCardProps & { id: string };

export type FeedProps = {
  posts?: FeedPost[];
  loading?: boolean;
  error?: string;
  onRetry?: () => void;
};

/**
 * Feed — tela mockada do feed da comunidade (nível screen). Compõe PostCards.
 * Apresentacional: dados por props, sem API/navegação. Cobre os estados
 * loading / error / empty / conteúdo.
 */
export const Feed = ({
  posts = [],
  loading = false,
  error,
  onRetry,
}: FeedProps): React.ReactElement => {
  if (loading) {
    return (
      <View accessibilityLabel="Carregando" className="w-full items-center p-xxl">
        <ActivityIndicator />
      </View>
    );
  }

  if (error) {
    return (
      <View className="w-full items-center gap-md p-xxl">
        <Text className="font-sans text-bodyText text-feedback-danger">{error}</Text>
        {onRetry ? (
          <Text
            accessibilityRole="button"
            onPress={onRetry}
            className="font-sans text-bodyText text-fg-link"
          >
            Tentar novamente
          </Text>
        ) : null}
      </View>
    );
  }

  if (posts.length === 0) {
    return (
      <View className="w-full items-center p-xxl">
        <Text className="font-sans text-bodyText text-fg-muted">
          Nenhuma publicação por aqui ainda.
        </Text>
      </View>
    );
  }

  return (
    <View className="w-full gap-md p-screenMargin">
      {posts.map((post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </View>
  );
};
