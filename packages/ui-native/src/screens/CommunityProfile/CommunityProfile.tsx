import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
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
  /**
   * Ilustração do estado vazio ("Sem conteúdo"). Como as imagens, entra por
   * prop (o pacote não empacota assets do `_figma`); a story fornece o arquivo.
   */
  emptyIllustration?: ImageSourcePropType;
  /**
   * Camada sobreposta à tela — hoje, o modal de "conteúdo publicado" que aparece
   * ao voltar de "Publicar conteúdo". Quem decide se está aberto é o app.
   */
  overlay?: React.ReactNode;
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
  emptyIllustration,
  overlay,
  onBack,
  onTabChange,
  onPublish,
  onNavigate,
}: CommunityProfileProps): React.ReactElement => {
  const sections = tab === 'dicas' ? dicaSections : roteiroSections;
  const isEmpty =
    tab === 'fotos'
      ? photos.length === 0
      : sections.every((section) => section.posts.length === 0);
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

        {isEmpty ? (
          <View className="flex-1 items-center gap-[32px] px-md py-xl">
            {emptyIllustration ? (
              <Image
                source={emptyIllustration}
                resizeMode="contain"
                style={{ width: 236, height: 257 }}
                accessibilityIgnoresInvertColors
              />
            ) : null}
            <View className="w-full items-center gap-md">
              <Text className="text-center font-sans text-[16px] leading-[24px] text-fg-subtle">
                Você ainda não tem publicações
              </Text>
              <Text className="text-center font-sans text-[22px] font-bold leading-[32px] text-fg-secondary">
                Compartilhe conteúdo na comunidade Zupper
              </Text>
            </View>
          </View>
        ) : tab === 'fotos' ? (
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

      {overlay}
    </View>
  );
};
