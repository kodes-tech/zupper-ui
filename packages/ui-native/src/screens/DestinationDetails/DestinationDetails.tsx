import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { OfferCard } from '../../molecules/OfferCard';
import type { OfferCardProps } from '../../molecules/OfferCard';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { PostCard } from '../../organisms/PostCard';
import type { PostCardProps } from '../../organisms/PostCard';
import { ProfileTabs } from '../../organisms/ProfileTabs';
import type { ProfileTab } from '../../organisms/ProfileTabs';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type DestinationOffer = OfferCardProps & { id: string };
export type DestinationPost = PostCardProps & { id: string };

const TABS: ProfileTab[] = ['ver-tudo', 'dicas', 'fotos', 'roteiros'];

export type DestinationDetailsProps = {
  /** Título da barra (ex.: "Fernando de Noronha, PE"). */
  title: string;
  /** Banner do destino no topo. */
  banner: ImageSourcePropType;
  tab?: ProfileTab;
  /** Ofertas exibidas na aba "Ver tudo" (passagens/hospedagens/pacotes). */
  offers?: DestinationOffer[];
  /** Publicações da aba atual (dica/foto/roteiro). */
  posts?: DestinationPost[];
  active?: BottomNavKey;
  onBack?: () => void;
  onTabChange?: (tab: ProfileTab) => void;
  onPressOffer?: (id: string) => void;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * DestinationDetails — "Detalhes do destino": header + banner + abas
 * (Ver tudo/Dicas/Fotos/Roteiros) + conteúdo da aba + bottom nav. Na aba
 * "Ver tudo" mostra o carrossel de ofertas antes das publicações.
 * Apresentacional; dados por props. Reproduz `_figma/detalhes-destino`.
 */
export const DestinationDetails = ({
  title,
  banner,
  tab = 'ver-tudo',
  offers = [],
  posts = [],
  active,
  onBack,
  onTabChange,
  onPressOffer,
  onNavigate,
}: DestinationDetailsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <View className="bg-surface-default">
        <ScreenHeader title={title} onBack={onBack} />
        <Image source={banner} resizeMode="cover" className="mt-xl h-[152px] w-full" />
        <ProfileTabs active={tab} tabs={TABS} onChange={onTabChange} />
      </View>

      <View className="gap-lg p-xl">
        {tab === 'ver-tudo' && offers.length > 0 ? (
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 8 }}
          >
            {offers.map(({ id, ...offer }) => (
              <OfferCard key={id} {...offer} onPress={() => onPressOffer?.(id)} />
            ))}
          </ScrollView>
        ) : null}

        {posts.map(({ id, ...post }) => (
          <PostCard key={id} {...post} />
        ))}
      </View>
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
