import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { Icon } from '../../atoms/Icon';
import { AccountGreeting } from '../../molecules/AccountGreeting';
import { AccountSection } from '../../molecules/AccountSection';
import type { AccountSectionRow } from '../../molecules/AccountSection';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type AccountState = 'traveler' | 'no-trip' | 'partner' | 'logged-out';

export type MyAccountUser = {
  /** Saudação (ex.: "Olá, Carlos!"). */
  name: string;
  /** Handle ou e-mail. */
  subtitle: string;
  avatar: ImageSourcePropType;
};

export type MyAccountProps = {
  state: AccountState;
  /** Dados do usuário; obrigatório nos estados logados. */
  user?: MyAccountUser;
  onBack?: () => void;
  /** Toque em um item de menu (id da linha). */
  onRowPress?: (id: string) => void;
  onLogin?: () => void;
  onLogout?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

type MenuRow = Omit<AccountSectionRow, 'onPress'>;

const PROFILE_ROWS: MenuRow[] = [
  {
    id: 'personal-data',
    icon: 'account-personal-data',
    title: 'Dados pessoais',
    cta: 'Editar',
    subtitle: 'Nome, e-mail, data nasc...',
    status: { label: 'Completo', tone: 'success' },
  },
  {
    id: 'address',
    icon: 'account-address',
    title: 'Endereço',
    cta: 'Editar',
    subtitle: 'CEP, Rua, Cidade, UF',
    status: { label: 'Pendente', tone: 'warning' },
  },
  {
    id: 'password',
    icon: 'account-password',
    title: 'Senha',
    cta: 'Editar',
    subtitle: 'Redefinir senha',
  },
];

const COMMUNITY_ROWS: MenuRow[] = [
  {
    id: 'posts',
    icon: 'account-posts',
    title: 'Minhas publicações',
    cta: 'Ver',
    subtitle: 'Suas dicas, fotos e roteiros',
  },
  {
    id: 'liked',
    icon: 'account-liked',
    title: 'Posts curtidos',
    cta: 'Ver',
    subtitle: 'Conteúdos que você curtiu',
  },
  {
    id: 'preferences',
    icon: 'account-preferences',
    title: 'Preferências de viagem',
    cta: 'Editar',
    subtitle: 'Estilos e destinos que você gosta',
    status: { label: 'Pendente', tone: 'warning' },
  },
  {
    id: 'blocked',
    icon: 'account-blocked',
    title: 'Contas bloqueadas',
    cta: 'Gerenciar',
    subtitle: 'Perfis que você não quer ver',
  },
];

const HELP_ROWS: MenuRow[] = [
  { id: 'help', icon: 'account-help', title: 'Central de ajuda', cta: 'Ir agora', boxed: false },
  { id: 'about', icon: 'account-about-zupper', title: 'Sobre o Zupper', cta: 'Ir agora', boxed: false },
];

const PRIVACY_ROWS: MenuRow[] = [
  {
    id: 'privacy',
    icon: 'account-privacy',
    title: 'Política de privacidade',
    cta: 'Ir agora',
    boxed: false,
  },
  { id: 'terms', icon: 'account-terms', title: 'Termos e condições', cta: 'Ir agora', boxed: false },
];

/**
 * MyAccount — "Minha conta" nos quatro estados (Viajante / Sem viagem / Parceiro
 * / Deslogado). Header + saudação (ou hero de login) + seções de menu + logout +
 * bottom nav. O menu é fixo; toques reportam o id da linha por `onRowPress`.
 * Apresentacional; reproduz `_figma/minha-conta`.
 */
export const MyAccount = ({
  state,
  user,
  onBack,
  onRowPress,
  onLogin,
  onLogout,
  onNavigate,
}: MyAccountProps): React.ReactElement => {
  const wire = (rows: MenuRow[]): AccountSectionRow[] =>
    rows.map((row) => ({ ...row, onPress: () => onRowPress?.(row.id) }));

  const isLoggedOut = state === 'logged-out';
  const badge =
    state === 'traveler'
      ? { role: 'traveler' as const }
      : state === 'partner'
        ? { role: 'partner' as const, badgeLabel: 'Zupper Parceiro' }
        : {};

  return (
    <View className="flex-1 bg-surface-tag">
      <ScrollView showsVerticalScrollIndicator={false}>
        {isLoggedOut ? (
          <View className="items-center bg-surface-default px-xxl pb-xxl pt-[52px]">
            <Text className="font-sans text-cardTitle text-fg-secondary">Minha conta</Text>
          </View>
        ) : (
          <ScreenHeader title="Minha conta" onBack={onBack} />
        )}

        <View className="gap-xxxl pb-xl pt-xxl">
          {isLoggedOut ? (
            <>
              <View className="gap-xl px-xxl">
                <View>
                  <Text className="font-sans text-[22px] font-bold text-fg-secondary">
                    Minha conta
                  </Text>
                  <Text className="mt-xs font-sans text-[16px] font-medium leading-6 text-fg-subtle">
                    Faça o login ou crie uma conta para gerenciar suas reservas e aproveitar as
                    vantagens.
                  </Text>
                </View>
                <Button
                  variant="secondary"
                  fullWidth
                  label="Iniciar sessão"
                  icon={<Icon name="account-login" size={24} />}
                  iconPosition="left"
                  onPress={onLogin}
                />
              </View>
              <Divider />
              <AccountSection title="Ajuda" rows={wire(HELP_ROWS)} />
              <AccountSection title="Privacidade" rows={wire(PRIVACY_ROWS)} />
            </>
          ) : (
            <>
              {user ? (
                <AccountGreeting
                  name={user.name}
                  subtitle={user.subtitle}
                  avatar={user.avatar}
                  {...badge}
                />
              ) : null}
              <Divider />
              <AccountSection title="Meu perfil" rows={wire(PROFILE_ROWS)} />
              <AccountSection title="Comunidade" rows={wire(COMMUNITY_ROWS)} />
              <AccountSection title="Ajuda" rows={wire(HELP_ROWS)} />
              <AccountSection title="Privacidade" rows={wire(PRIVACY_ROWS)} />
              <View className="items-center px-xxl">
                <Button
                  variant="ghost"
                  fullWidth
                  label="Sair da minha conta zupper"
                  onPress={onLogout}
                />
              </View>
            </>
          )}
        </View>
      </ScrollView>

      <BottomNav active="conta" onNavigate={onNavigate} />
    </View>
  );
};
