import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';

export type LikeButtonProps = PressableProps & {
  /** Número de curtidas exibido ao lado do coração. */
  count: number;
  /** Estado curtido — pinta o coração. */
  liked?: boolean;
};

/**
 * LikeButton — coração + contador de curtidas (molécula do feed).
 * Apresentacional: `count`/`liked` vêm por props; a ação vem por `onPress`.
 * (O design system ainda não tem sistema de ícone — o coração é um glifo até lá.)
 */
export const LikeButton = ({ count, liked = false, ...rest }: LikeButtonProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={`Curtir — ${count} curtidas`}
    className="flex-row items-center gap-xs"
    {...rest}
  >
    <Text className={`text-lg ${liked ? 'text-feedback-danger' : 'text-fg-muted'}`}>♥</Text>
    <Text className="font-sans text-caption text-fg-muted">{count}</Text>
  </Pressable>
);
