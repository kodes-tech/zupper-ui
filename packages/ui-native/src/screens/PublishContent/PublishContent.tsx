import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Button } from '../../atoms/Button';
import { FilterChip } from '../../atoms/FilterChip';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';
import { Input } from '../../atoms/Input';
import { Textarea } from '../../atoms/Textarea';
import { RoteiroDayCard } from '../../molecules/RoteiroDayCard';
import type { RoteiroStop } from '../../molecules/RoteiroDayCard';
import { RoteiroDayForm } from '../../molecules/RoteiroDayForm';
import type { RoteiroDayFormProps } from '../../molecules/RoteiroDayForm';
import { SelectField } from '../../molecules/SelectField';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type PublishType = 'foto' | 'dica' | 'roteiro';
export type PublishCategory = { id: string; label: string };
export type PublishDay = { id: string; day: string; title: string; stops: RoteiroStop[] };

export type PublishContentProps = {
  type: PublishType;
  /** Destino selecionado (ex.: "Recife, PE"). */
  destination?: string;
  categories?: PublishCategory[];
  selectedCategoryId?: string;
  /** Foto selecionada (variante `foto`). */
  media?: ImageSourcePropType;
  /** Legenda da foto (variante `foto`). */
  caption?: string;
  /** Título (variantes `dica`/`roteiro`). */
  contentTitle?: string;
  /** Corpo da dica (variante `dica`). */
  tipText?: string;
  /** Resumo do roteiro (variante `roteiro`). */
  summary?: string;
  /** Dias do roteiro (variante `roteiro`). */
  days?: PublishDay[];
  /**
   * Dia em edição (wizard "adicionar dia", variante `roteiro`). Quando definido,
   * abre o formulário do dia e esconde "Adicionar novo dia" e "Publicar".
   */
  editingDay?: RoteiroDayFormProps;
  /** Localização (variantes `foto`/`dica`). */
  location?: string;
  /** Habilita o botão de publicar (no roteiro começa desabilitado, como no Figma). */
  canPublish?: boolean;
  active?: BottomNavKey;
  onBack?: () => void;
  onSelectDestination?: () => void;
  /** Trocar a mídia já selecionada (lápis, variante `foto` preenchida). */
  onChangeMedia?: () => void;
  /** Abrir a galeria (variante `foto` vazia). */
  onPickGallery?: () => void;
  /** Abrir a câmera (variante `foto` vazia). */
  onPickCamera?: () => void;
  onChangeCaption?: (text: string) => void;
  onChangeTitle?: (text: string) => void;
  onChangeTip?: (text: string) => void;
  onChangeSummary?: (text: string) => void;
  onChangeLocation?: (text: string) => void;
  onSelectCategory?: (id: string) => void;
  onEditDay?: (id: string) => void;
  onAddDay?: () => void;
  onPublish?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

const NAV_TITLE: Record<PublishType, string> = {
  foto: 'Publicar uma foto',
  dica: 'Publicar uma dica',
  roteiro: 'Publicar um roteiro',
};

const TYPE_ICON: Record<PublishType, IconName> = {
  foto: 'content-foto',
  dica: 'content-dica',
  roteiro: 'content-roteiro',
};

const FieldLabel = ({ children }: { children: string }) => (
  <Text className="font-sans text-authorName text-fg-primary">{children}</Text>
);

/** Quadro do picker de mídia (Galeria / Tirar Foto) do estado vazio da variante `foto`. */
const MediaPickerBox = ({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress?: () => void;
}) => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    className="h-[111px] flex-1 items-center justify-center gap-[12px] rounded-[10px] border border-brand-borderHighlight bg-surface-default"
  >
    <Icon name={icon} size={40} />
    <Text className="font-sans text-authorName text-fg-secondary">{label}</Text>
  </Pressable>
);

/**
 * PublishContent — "Publicar conteúdo": formulário de criação de post nas três
 * variantes (Foto / Dica / Roteiro). Header + campos por tipo + categorias +
 * CTA de publicar + bottom nav. Apresentacional: valores e ações por props;
 * validação/estado ficam no app consumidor. Reproduz `_figma/publicar-conteudo`.
 */
export const PublishContent = ({
  type,
  destination,
  categories = [],
  selectedCategoryId,
  media,
  caption,
  contentTitle,
  tipText,
  summary,
  days = [],
  editingDay,
  location,
  canPublish = false,
  active,
  onBack,
  onSelectDestination,
  onChangeMedia,
  onPickGallery,
  onPickCamera,
  onChangeCaption,
  onChangeTitle,
  onChangeTip,
  onChangeSummary,
  onChangeLocation,
  onSelectCategory,
  onEditDay,
  onAddDay,
  onPublish,
  onNavigate,
}: PublishContentProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScreenHeader
        title={NAV_TITLE[type]}
        trailingIcon={TYPE_ICON[type]}
        background="transparent"
        onBack={onBack}
      />

      <View className="gap-[14px] p-xl">
        <FieldLabel>Sobre qual destino você deseja publicar?</FieldLabel>
        <SelectField
          value={destination}
          placeholder="Selecione o destino"
          onPress={onSelectDestination}
        />

        {type === 'foto' ? (
          <>
            <View className="flex-row items-center justify-between gap-md">
              <FieldLabel>Selecione a mídia que deseja publicar</FieldLabel>
              {media ? (
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Trocar mídia"
                  onPress={onChangeMedia}
                >
                  <Icon name="edit" size={24} />
                </Pressable>
              ) : null}
            </View>
            {media ? (
              <Image
                source={media}
                resizeMode="cover"
                className="h-[314px] w-full rounded-[10px]"
              />
            ) : (
              <View className="w-full flex-row gap-md">
                <MediaPickerBox icon="media-gallery" label="Galeria" onPress={onPickGallery} />
                <MediaPickerBox icon="media-camera" label="Tirar Foto" onPress={onPickCamera} />
              </View>
            )}
            <FieldLabel>Legenda</FieldLabel>
            <Textarea
              value={caption}
              minHeight={84}
              placeholder="Escreva uma legenda..."
              onChangeText={onChangeCaption}
            />
          </>
        ) : (
          <>
            <FieldLabel>{type === 'dica' ? 'Título da dica' : 'Título do roteiro'}</FieldLabel>
            <Input
              value={contentTitle}
              placeholder="Digite o título"
              onChangeText={onChangeTitle}
            />
          </>
        )}

        <FieldLabel>{type === 'dica' ? 'Categoria' : 'Categoria (opcional)'}</FieldLabel>
        <View className="flex-row flex-wrap items-start gap-md">
          {categories.map((category) => (
            <FilterChip
              key={category.id}
              label={category.label}
              selected={category.id === selectedCategoryId}
              onPress={() => onSelectCategory?.(category.id)}
            />
          ))}
        </View>

        {type === 'dica' ? (
          <>
            <FieldLabel>Sua dica</FieldLabel>
            <Textarea
              value={tipText}
              minHeight={84}
              placeholder="Escreva sua dica..."
              onChangeText={onChangeTip}
            />
          </>
        ) : null}

        {type === 'roteiro' ? (
          <>
            <FieldLabel>Resumo</FieldLabel>
            <Textarea
              value={summary}
              minHeight={72}
              placeholder="Escreva um resumo..."
              onChangeText={onChangeSummary}
            />
            {days.map((dayItem) => (
              <RoteiroDayCard
                key={dayItem.id}
                day={dayItem.day}
                title={dayItem.title}
                stops={dayItem.stops}
                onEdit={() => onEditDay?.(dayItem.id)}
              />
            ))}
            {editingDay ? (
              <RoteiroDayForm {...editingDay} />
            ) : (
              <Pressable
                accessibilityRole="button"
                onPress={onAddDay}
                className="w-full flex-row items-center justify-between rounded-pill border border-brand-borderHighlight bg-surface-default p-lg"
              >
                <Text className="font-sans text-buttonLabel text-brand-strong">
                  Adicionar novo dia no roteiro
                </Text>
                <Icon name="add-day" size={20} />
              </Pressable>
            )}
          </>
        ) : null}

        {type !== 'roteiro' ? (
          <>
            <FieldLabel>Localização (opcional)</FieldLabel>
            <Input
              value={location}
              placeholder="Adicione uma localização"
              onChangeText={onChangeLocation}
            />
          </>
        ) : null}

        {/* No wizard de adicionar dia, a navegação é do próprio formulário (Anterior/Próximo). */}
        {type === 'roteiro' && editingDay ? null : type === 'roteiro' && !canPublish ? (
          <View className="w-full rounded-pill border border-border-default bg-surface-default p-lg">
            <Text className="text-center font-sans text-buttonLabel text-fg-muted">
              Publicar roteiro
            </Text>
          </View>
        ) : (
          <Button
            label={type === 'roteiro' ? 'Publicar roteiro' : 'Publicar'}
            fullWidth
            onPress={onPublish}
          />
        )}
      </View>
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
