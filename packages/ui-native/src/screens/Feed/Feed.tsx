import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { SearchField } from '../../molecules/SearchField';
import { QuickAction } from '../../molecules/QuickAction';
import { DestinationCard } from '../../molecules/DestinationCard';
import { GreetingHeader } from '../../organisms/GreetingHeader';
import type { GreetingHeaderProps } from '../../organisms/GreetingHeader';
import { CommunityCTA } from '../../organisms/CommunityCTA';
import type { CommunityCTAProps } from '../../organisms/CommunityCTA';
import { PostCard } from '../../organisms/PostCard';
import type { PostCardProps } from '../../organisms/PostCard';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';

export type FeedQuickAction = { key: string; icon: IconName; label: string; onPress?: () => void };
export type FeedDestination = { id: string; name: string; image: ImageSourcePropType; onPress?: () => void };
export type FeedPost = PostCardProps & { id: string };

export type FeedProps = {
  greeting: GreetingHeaderProps;
  quickActions?: FeedQuickAction[];
  destinations?: FeedDestination[];
  posts?: FeedPost[];
  /** Card de publicar (omitido para visitante). */
  cta?: CommunityCTAProps;
  active?: BottomNavKey;
  onSearch?: () => void;
  onSeeAllDestinations?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

const SectionTitle = ({ icon, label }: { icon: 'fire' | 'community'; label: string }) => (
  <View className="flex-row items-center gap-xs">
    <Icon name={icon} size={24} />
    <Text className="font-sans text-[18px] font-bold text-fg-primary">{label}</Text>
  </View>
);

/**
 * Feed — tela Home da comunidade (mockada): saudação, busca, atalhos, card de
 * publicar, destinos e o feed "Comunidade Zupper", com a barra inferior fixa.
 * Apresentacional: todos os dados entram por props. Reproduz `_figma/feed`.
 */
export const Feed = ({
  greeting,
  quickActions = [],
  destinations = [],
  posts = [],
  cta,
  active = 'inicio',
  onSearch,
  onSeeAllDestinations,
  onNavigate,
}: FeedProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="gap-xxl py-xxl">
        <GreetingHeader {...greeting} />

        <View className="px-xl">
          <SearchField onPress={onSearch} />
        </View>

        {quickActions.length > 0 ? (
          <View className="flex-row gap-lg px-xl">
            {quickActions.map((q) => (
              <QuickAction key={q.key} icon={q.icon} label={q.label} onPress={q.onPress} />
            ))}
          </View>
        ) : null}

        {cta ? (
          <View className="px-xl">
            <CommunityCTA {...cta} />
          </View>
        ) : null}

        {destinations.length > 0 ? (
          <View className="gap-lg">
            <View className="flex-row items-center justify-between px-screenMargin">
              <SectionTitle icon="fire" label="Destinos em alta" />
              <Pressable
                accessibilityRole="button"
                onPress={onSeeAllDestinations}
                className="flex-row items-center gap-md"
              >
                <Text className="font-sans text-caption text-fg-link">Ver todos</Text>
                <Icon name="chevron-right" size={12} />
              </Pressable>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20, gap: 12 }}
            >
              {destinations.map((d) => (
                <DestinationCard key={d.id} name={d.name} image={d.image} onPress={d.onPress} />
              ))}
            </ScrollView>
          </View>
        ) : null}

        {posts.length > 0 ? (
          <View className="gap-lg px-screenMargin">
            <SectionTitle icon="community" label="Comunidade Zupper" />
            {posts.map(({ id, ...post }) => (
              <PostCard key={id} {...post} />
            ))}
          </View>
        ) : null}
      </View>
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
