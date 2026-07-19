import React from 'react';
import { Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Avatar } from '../../atoms/Avatar';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type BlockedAccountAction = 'block' | 'unblock';

export type BlockedAccountRowProps = {
  name: string;
  /** Arroba do usuário (ex.: "@carlosviaja"). */
  handle: string;
  avatar: ImageSourcePropType;
  /** Ação disponível pro usuário: 'unblock' (padrão) ou 'block'. */
  action?: BlockedAccountAction;
  onPress?: () => void;
};

const actionByType: Record<
  BlockedAccountAction,
  { icon: 'account-unblock' | 'account-block'; label: (name: string) => string }
> = {
  unblock: { icon: 'account-unblock', label: (name) => `Desbloquear ${name}` },
  block: { icon: 'account-block', label: (name) => `Bloquear ${name}` },
};

/**
 * BlockedAccountRow — item da lista de "Contas bloqueadas": avatar + nome/@handle
 * + ícone de ação (desbloquear/bloquear). Reproduz a variante block/unblock do
 * `greeting-header` em `_figma/minha-conta`.
 */
export const BlockedAccountRow = ({
  name,
  handle,
  avatar,
  action = 'unblock',
  onPress,
}: BlockedAccountRowProps): React.ReactElement => {
  const { icon, label } = actionByType[action];

  return (
    <View className="w-full flex-row items-center gap-md">
      <Avatar size="md" source={avatar} />
      <View className="flex-1">
        <Text className="font-sans text-cardTitle text-fg-primary">{name}</Text>
        <Text className="font-sans text-bodyMd text-fg-secondary">{handle}</Text>
      </View>
      <Pressable accessibilityRole="button" accessibilityLabel={label(name)} onPress={onPress}>
        <Icon name={icon} size={iconSize.lg} />
      </Pressable>
    </View>
  );
};
