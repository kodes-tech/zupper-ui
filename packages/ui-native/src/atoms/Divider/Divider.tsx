import React from 'react';
import { View } from 'react-native';
import type { ViewProps } from 'react-native';

export type DividerProps = ViewProps;

/**
 * Divider — linha divisória de 1px (cor `border.default`), usada entre seções e
 * itens de lista (ex.: tela "Minha conta").
 */
export const Divider = (props: DividerProps): React.ReactElement => (
  <View className="h-[1px] w-full bg-border-default" {...props} />
);
