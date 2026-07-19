import React from 'react';
import { View } from 'react-native';

/** Contrato próprio — não estende `ViewProps` (regra de ouro do wrapper). */
export type DividerProps = {
  testID?: string;
};

/**
 * Divider — linha divisória de 1px (cor `border.default`), usada entre seções e
 * itens de lista (ex.: tela "Minha conta").
 */
export const Divider = ({ testID }: DividerProps): React.ReactElement => (
  <View testID={testID} className="h-[1px] w-full bg-border-default" />
);
