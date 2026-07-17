import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';
import { Icon } from '@kodes-tech/icons';

export type LikeButtonProps = PressableProps & {
  /** Número de curtidas exibido ao lado do coração. */
  count: number;
  /** Estado curtido (reflete em accessibilityState). */
  liked?: boolean;
};

/**
 * LikeButton — coração (Icon) + contador de curtidas (molécula do feed).
 * Apresentacional: `count`/`liked` por props; ação por `onPress`.
 */
export const LikeButton = ({
  count,
  liked = false,
  ...rest
}: LikeButtonProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ selected: liked }}
    accessibilityLabel={`Curtir — ${count} curtidas`}
    className="flex-row items-center gap-xs"
    {...rest}
  >
    <Icon name="heart" size={16} />
    <Text className="font-sans text-caption text-fg-secondary">{count}</Text>
  </Pressable>
);
