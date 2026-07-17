import React from 'react';
import { Pressable, Text } from 'react-native';
import type { PressableProps } from 'react-native';

import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';

export type QuickActionProps = PressableProps & {
  /** Nome do ícone do design system (SVG). Ex.: 'oferta-passagens'. */
  icon: IconName;
  label: string;
};

/**
 * QuickAction — card de atalho da Home (Buscar Voos / Hospedagens / Pacotes).
 * O ícone entra por nome (set do DS, via `Icon`); layout/tokens no card.
 */
export const QuickAction = ({ icon, label, ...rest }: QuickActionProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    className="h-[100px] flex-1 items-center justify-end gap-xs rounded-xxl border border-border-default bg-surface-default p-xl"
    {...rest}
  >
    <Icon name={icon} size={48} />
    <Text className="font-sans text-xs font-bold text-fg-primary">{label}</Text>
  </Pressable>
);
