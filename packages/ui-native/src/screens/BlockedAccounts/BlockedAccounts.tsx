import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { BlockedAccountRow } from '../../molecules/BlockedAccountRow';
import type { BlockedAccountAction } from '../../molecules/BlockedAccountRow';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type BlockedAccount = {
  id: string;
  name: string;
  handle: string;
  avatar: ImageSourcePropType;
  /** Ação disponível pro usuário: 'unblock' (padrão) ou 'block'. */
  action?: BlockedAccountAction;
};

export type BlockedAccountsProps = {
  accounts: BlockedAccount[];
  onBack?: () => void;
  /** Toque no ícone de ação de uma conta (id da conta). */
  onPressAccount?: (id: string) => void;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * BlockedAccounts — tela "Minha conta" › "Contas bloqueadas": header + texto
 * de instrução + lista de `BlockedAccountRow` + bottom nav. Apresentacional;
 * reproduz `_figma/minha-conta` (Minha conta - Contas bloqueadas).
 */
export const BlockedAccounts = ({
  accounts,
  onBack,
  onPressAccount,
  onNavigate,
}: BlockedAccountsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScreenHeader title="Contas bloqueadas" onBack={onBack} />
    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ padding: 16 }}>
      <Text className="font-sans text-bodyMd text-fg-secondary">
        Gerencie as contas que você escolheu não permitir interação. Para desbloquear, clique no
        ícone ao lado do usuário que deseja liberar.
      </Text>
      <View className="mt-xxl gap-xl">
        {accounts.map((account) => (
          <BlockedAccountRow
            key={account.id}
            name={account.name}
            handle={account.handle}
            avatar={account.avatar}
            action={account.action}
            onPress={() => onPressAccount?.(account.id)}
          />
        ))}
      </View>
    </ScrollView>
    <BottomNav active="conta" onNavigate={onNavigate} />
  </View>
);
