import React from 'react';
import { Text, View } from 'react-native';
import { Divider } from '../../atoms/Divider';
import { AccountRow } from '../AccountRow';
import type { AccountRowProps } from '../AccountRow';

export type AccountSectionRow = AccountRowProps & { id: string };

export type AccountSectionProps = {
  title: string;
  rows: AccountSectionRow[];
};

/**
 * AccountSection — seção da tela "Minha conta": título + lista de `AccountRow`
 * separadas por `Divider`. Reproduz os blocos Meu perfil / Comunidade / Ajuda /
 * Privacidade de `_figma/minha-conta`.
 */
export const AccountSection = ({ title, rows }: AccountSectionProps): React.ReactElement => (
  <View className="gap-xl px-xxl">
    <Text className="font-sans text-cardTitle text-fg-secondary">{title}</Text>
    <View className="gap-lg">
      {rows.map(({ id, ...row }, index) => (
        <React.Fragment key={id}>
          {index > 0 ? <Divider /> : null}
          <AccountRow {...row} />
        </React.Fragment>
      ))}
    </View>
  </View>
);
