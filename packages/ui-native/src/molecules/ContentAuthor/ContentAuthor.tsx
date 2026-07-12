import React from 'react';
import { Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { Icon } from '../../atoms/Icon';
import { RoleBadge } from '../../atoms/RoleBadge';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';

export type ContentAuthorProps = {
  name: string;
  /** Arroba do usuário (ex.: "@carlosviaja"). */
  handle: string;
  avatar: ImageSourcePropType;
  role: RoleBadgeVariant;
  /** Localização opcional, exibida abaixo do autor (só na variante Foto). */
  location?: string;
};

/**
 * ContentAuthor — cabeçalho do autor na visualização de um conteúdo: avatar (44),
 * nome, @handle e RoleBadge; opcionalmente uma linha de localização. Reproduz o
 * bloco "greeting-sm" de `_figma/conteudo`.
 */
export const ContentAuthor = ({
  name,
  handle,
  avatar,
  role,
  location,
}: ContentAuthorProps): React.ReactElement => (
  <View className="items-end gap-md bg-surface-default px-xl py-md">
    <View className="w-full flex-row items-center gap-md">
      <Avatar size="md" source={avatar} />
      <View className="flex-1 p-xs">
        <Text className="font-sans text-cardTitle text-fg-primary">{name}</Text>
        <Text className="font-sans text-caption text-fg-secondary">{handle}</Text>
      </View>
      <RoleBadge variant={role} />
    </View>
    {location ? (
      <View className="flex-row items-center gap-xs">
        <Icon name="location" size={16} />
        <Text className="font-sans text-caption text-fg-secondary">{location}</Text>
      </View>
    ) : null}
  </View>
);
