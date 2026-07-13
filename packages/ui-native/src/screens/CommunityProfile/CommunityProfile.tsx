import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';
import { PhotoGrid } from '../../molecules/PhotoGrid';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { GreetingHeader } from '../../organisms/GreetingHeader';
import { PostCard } from '../../organisms/PostCard';
import type { PostCardProps } from '../../organisms/PostCard';
import { ProfileTabs } from '../../organisms/ProfileTabs';
import type { ProfileTab } from '../../organisms/ProfileTabs';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type ProfilePost = PostCardProps & { id: string };
export type ProfilePostSection = { location: string; posts: ProfilePost[] };

export type CommunityProfileProps = {
  name: string;
  subtitle: string;
  role: RoleBadgeVariant;
  avatar?: ImageSourcePropType;
  initials?: string;
  tab: ProfileTab;
  photos?: ImageSourcePropType[];
  dicaSections?: ProfilePostSection[];
  roteiroSections?: ProfilePostSection[];
  onBack?: () => void;
  onTabChange?: (tab: ProfileTab) => void;
  onPublish?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * CommunityProfile — "Meu Perfil - Comunidade": header + saudação + abas
 * (Dicas/Fotos/Roteiros) + conteúdo da aba + FAB Publicar + bottom nav.
 * Apresentacional; dados por props. Reproduz `_figma/comunidade`.
 */
export const CommunityProfile = ({
  name,
  subtitle,
  role,
  avatar,
  initials,
  tab,
  photos = [],
  dicaSections = [],
  roteiroSections = [],
  onBack,
  onTabChange,
  onPublish,
  onNavigate,
}: CommunityProfileProps): React.ReactElement => {
  const sections = tab === 'dicas' ? dicaSections : roteiroSections;
  return (
    <View className="flex-1 bg-surface-tag">
      <ScrollView showsVerticalScrollIndicator={false}>
        <View className="bg-surface-default">
          <ScreenHeader title="Meu Perfil - Comunidade" onBack={onBack} />
          <GreetingHeader
            title={name}
            subtitle={subtitle}
            role={role}
            avatar={avatar}
            initials={initials}
          />
          <ProfileTabs active={tab} onChange={onTabChange} />
        </View>

        {tab === 'fotos' ? (
          <PhotoGrid photos={photos} />
        ) : (
          <View className="gap-lg p-xl">
            {sections.map((section) => (
              <React.Fragment key={section.location}>
                <Text className="font-sans text-cardTitle text-fg-primary">{section.location}</Text>
                {section.posts.map(({ id, ...post }) => (
                  <PostCard key={id} {...post} />
                ))}
              </React.Fragment>
            ))}
          </View>
        )}

        <View className="h-[112px]" />
      </ScrollView>

      <View
        pointerEvents="box-none"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 96,
          alignItems: 'flex-end',
          paddingHorizontal: 24,
        }}
      >
        <Button
          label="Publicar"
          icon={<Icon name="publish" size={20} />}
          iconPosition="right"
          onPress={onPublish}
        />
      </View>

      <BottomNav onNavigate={onNavigate} />
    </View>
  );
};
