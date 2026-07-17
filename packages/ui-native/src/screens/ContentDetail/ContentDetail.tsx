import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Icon } from '@kodes-tech/icons';
import { CommentInput } from '../../molecules/CommentInput';
import { CommentThread } from '../../molecules/CommentThread';
import type { Comment } from '../../molecules/CommentThread';
import { ContentAuthor } from '../../molecules/ContentAuthor';
import type { ContentAuthorProps } from '../../molecules/ContentAuthor';
import { OfferCard } from '../../molecules/OfferCard';
import type { OfferCardProps } from '../../molecules/OfferCard';
import { RoteiroDayCard } from '../../molecules/RoteiroDayCard';
import type { RoteiroDayCardProps } from '../../molecules/RoteiroDayCard';
import { SocialBar } from '../../molecules/SocialBar';
import { StatusBanner } from '../../molecules/StatusBanner';
import type { StatusBannerProps } from '../../molecules/StatusBanner';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type ContentType = 'foto' | 'dica' | 'roteiro';
export type ContentOffer = OfferCardProps & { id: string };

export type ContentDetailProps = {
  type: ContentType;
  /** Título da barra de topo (ex.: "Foto" / "Dica" / "Roteiro"). */
  title: string;
  /**
   * Aviso de moderação exibido ao autor acima do conteúdo ("Publicação em
   * análise" / "Publicação removida"). Só o autor vê — quem decide é o app.
   */
  banner?: StatusBannerProps;
  author: ContentAuthorProps;
  /** Foto em tela cheia (variante `foto`). */
  photo?: ImageSourcePropType;
  /** Título do conteúdo (variantes `dica`/`roteiro`). */
  contentTitle?: string;
  /** Data de publicação (ex.: "02/07/2026"). */
  date?: string;
  /** Tempo de leitura (ex.: "2 min de leitura"). */
  readingTime?: string;
  description?: string;
  /** Metadados do roteiro (ex.: ["3 dias", "8 paradas", "Família"]). */
  metadata?: string[];
  /** Dias do roteiro. */
  days?: RoteiroDayCardProps[];
  /** Título da seção de ofertas do roteiro. */
  offersTitle?: string;
  offers?: ContentOffer[];
  likes: number;
  /** Contador da barra social (pode diferir do total de respostas exibidas). */
  commentCount: number;
  liked?: boolean;
  /** Legenda do autor exibida acima dos comentários. */
  authorComment?: { name: string; text: string };
  comments?: Comment[];
  commentDraft?: string;
  active?: BottomNavKey;
  /**
   * Camada sobreposta à tela — o bottom sheet aberto no momento (menu de ações,
   * motivos da denúncia, denúncia enviada, "não tenho interesse"). Quem controla
   * qual sheet está aberto é o app; a tela só o renderiza por cima.
   */
  overlay?: React.ReactNode;
  onBack?: () => void;
  onLike?: () => void;
  onComment?: () => void;
  onShare?: () => void;
  onMore?: () => void;
  onPressOffer?: (id: string) => void;
  onWriteComment?: () => void;
  onSendComment?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

const MetaRow = ({ date, readingTime }: { date?: string; readingTime?: string }) => {
  if (!date && !readingTime) return null;
  return (
    <View className="w-full flex-row gap-xl">
      {date ? (
        <View className="flex-row items-center gap-md">
          <Icon name="calendar-03" size={16} />
          <Text className="font-sans text-caption text-fg-muted">{date}</Text>
        </View>
      ) : null}
      {readingTime ? (
        <View className="flex-row items-center gap-md">
          <Icon name="clock" size={16} />
          <Text className="font-sans text-caption text-fg-muted">{readingTime}</Text>
        </View>
      ) : null}
    </View>
  );
};

/**
 * ContentDetail — "5. Conteúdo": visualização individual de um post (Foto / Dica
 * / Roteiro). Header + autor + corpo por tipo + barra social + comentários +
 * composer + bottom nav. No roteiro, mostra os cards de dia e as ofertas.
 * Apresentacional; dados por props. Reproduz `_figma/conteudo`.
 */
export const ContentDetail = ({
  type,
  title,
  banner,
  author,
  photo,
  contentTitle,
  date,
  readingTime,
  description,
  metadata = [],
  days = [],
  offersTitle,
  offers = [],
  likes,
  commentCount,
  liked,
  authorComment,
  comments = [],
  commentDraft,
  active,
  overlay,
  onBack,
  onLike,
  onComment,
  onShare,
  onMore,
  onPressOffer,
  onWriteComment,
  onSendComment,
  onNavigate,
}: ContentDetailProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScreenHeader title={title} onBack={onBack} />
      {banner ? (
        <View className="bg-surface-default px-xl pt-md">
          <StatusBanner {...banner} />
        </View>
      ) : null}
      <ContentAuthor {...author} />

      {type === 'foto' && photo ? (
        <Image source={photo} resizeMode="cover" className="h-[404px] w-full" />
      ) : null}

      {type !== 'foto' ? (
        <View className="items-center gap-xl px-xxl py-[20px]">
          {contentTitle ? (
            <Text className="w-full font-sans text-[18px] font-bold text-fg-primary">
              {contentTitle}
            </Text>
          ) : null}
          <MetaRow date={date} readingTime={readingTime} />
          {metadata.length > 0 ? (
            <View className="w-full flex-row gap-sm">
              {metadata.map((item) => (
                <Text key={item} className="font-sans text-caption text-brand-strong">
                  {item}
                </Text>
              ))}
            </View>
          ) : null}
          {description ? (
            <Text className="w-full font-sans text-bodyText text-fg-secondary">{description}</Text>
          ) : null}

          {days.map((day) => (
            <RoteiroDayCard key={day.day} {...day} />
          ))}

          {offers.length > 0 ? (
            <>
              {offersTitle ? (
                <Text className="w-full font-sans text-[18px] font-bold text-fg-primary">
                  {offersTitle}
                </Text>
              ) : null}
              <View className="w-full flex-row gap-lg">
                {offers.map(({ id, ...offer }) => (
                  <OfferCard key={id} fill {...offer} onPress={() => onPressOffer?.(id)} />
                ))}
              </View>
            </>
          ) : null}
        </View>
      ) : null}

      <View className="gap-[10px] px-xl pb-xl">
        <SocialBar
          likes={likes}
          comments={commentCount}
          liked={liked}
          onLike={onLike}
          onComment={onComment}
          onShare={onShare}
          onMore={onMore}
        />
        <CommentThread authorComment={authorComment} comments={comments} />
      </View>

      <View className="p-xl">
        <CommentInput value={commentDraft} onPress={onWriteComment} onSend={onSendComment} />
      </View>
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />

    {overlay}
  </View>
);
