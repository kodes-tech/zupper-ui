import React from 'react';
import { Pressable, Text } from 'react-native';
import { iconSize } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type LikeButtonProps = {
  /** Número de curtidas exibido ao lado do coração. */
  count: number;
  /** Estado curtido (reflete em accessibilityState). */
  liked?: boolean;
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
  testID?: string;
};

/**
 * LikeButton — coração (Icon) + contador de curtidas (molécula do feed).
 * Apresentacional: `count`/`liked` por props; ação por `onPress`.
 */
export const LikeButton = ({
  count,
  liked = false,
  onPress,
  disabled = false,
  accessibilityLabel,
  testID,
}: LikeButtonProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityState={{ selected: liked, disabled }}
    accessibilityLabel={accessibilityLabel ?? `Curtir — ${count} curtidas`}
    disabled={disabled}
    onPress={onPress}
    testID={testID}
    className="flex-row items-center gap-xs"
  >
    <Icon name="heart" size={iconSize.sm} />
    <Text className="font-sans text-caption text-fg-secondary">{count}</Text>
  </Pressable>
);
