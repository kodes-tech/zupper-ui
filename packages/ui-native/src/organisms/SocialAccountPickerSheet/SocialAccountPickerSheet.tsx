import React from 'react';
import { Image, Pressable, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { Icon } from '../../atoms/Icon';
import { BottomSheet } from '../BottomSheet';

export type SocialAccount = {
  id: string;
  name: string;
  email: string;
  /** Foto do usuário — quando omitida, mostra `initials` num círculo neutro. */
  avatar?: ImageSourcePropType;
  initials?: string;
};

export type SocialAccountPickerSheetProps = {
  /** Título do cabeçalho (ex.: "Fazer login com o Google"). */
  title: string;
  /** Nome do app exibido em "para prosseguir para {appName}" (bold). */
  appName?: string;
  accounts: SocialAccount[];
  onSelectAccount?: (id: string) => void;
  onUseAnotherAccount?: () => void;
  /** Nome do provedor no rodapé (ex.: "Google"), usado em "Para continuar, o {provider} compartilhará...". */
  provider?: string;
  onPressPrivacyPolicy?: () => void;
  onPressTermsOfService?: () => void;
  onDismiss?: () => void;
};

/**
 * SocialAccountPickerSheet — sheet de escolha de conta do login/cadastro
 * social (ex.: contas Google salvas no dispositivo): lista de contas, atalho
 * "Usar outra conta" e o aviso de compartilhamento de dados. Apresentacional:
 * contas e callbacks entram por props. Segue o modal "Fazer login com o
 * Google" do Figma (Cadastro - Login Social).
 */
export const SocialAccountPickerSheet = ({
  title,
  appName = 'zupper',
  accounts,
  onSelectAccount,
  onUseAnotherAccount,
  provider = 'Google',
  onPressPrivacyPolicy,
  onPressTermsOfService,
  onDismiss,
}: SocialAccountPickerSheetProps): React.ReactElement => (
  <BottomSheet title={title} onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-start gap-xxs px-screenMargin pb-md pt-xl">
      <Text className="font-sans text-cardTitle text-fg-secondary">Escolha uma conta</Text>
      <Text className="font-sans text-paragraphMd text-fg-subtle">
        para prosseguir para <Text className="font-bold">{appName}</Text>
      </Text>
    </View>

    {accounts.map((account) => (
      <Pressable
        key={account.id}
        accessibilityRole="button"
        accessibilityLabel={`${account.name}, ${account.email}`}
        onPress={() => onSelectAccount?.(account.id)}
        className="w-full flex-row items-center gap-md border-b border-border-subtle px-screenMargin py-md"
      >
        {account.avatar ? (
          <Image source={account.avatar} className="h-[32px] w-[32px] rounded-pill" />
        ) : (
          <View className="h-[32px] w-[32px] items-center justify-center rounded-pill bg-border-subtle">
            <Text className="font-sans text-caption font-medium text-fg-secondary">
              {account.initials ?? account.name.slice(0, 2).toUpperCase()}
            </Text>
          </View>
        )}
        <View className="gap-xxs">
          <Text className="font-sans text-paragraphMd text-fg-secondary">{account.name}</Text>
          <Text className="font-sans text-caption text-fg-subtle">{account.email}</Text>
        </View>
      </Pressable>
    ))}

    <Pressable
      accessibilityRole="button"
      onPress={onUseAnotherAccount}
      className="w-full flex-row items-center gap-md border-b border-border-subtle px-screenMargin py-md"
    >
      <Icon name="user-circle" size={32} />
      <Text className="font-sans text-paragraphMd text-fg-secondary">Usar outra conta</Text>
    </Pressable>

    <Text className="px-screenMargin pt-xl font-sans text-caption text-fg-subtle">
      {`Para continuar, o ${provider} compartilhará com o app ${appName}, seu nome, endereço de e-mail e sua foto do perfil. Consulte a `}
      <Text className="text-fg-action" onPress={onPressPrivacyPolicy}>
        Política de Privacidade
      </Text>
      {' e os '}
      <Text className="text-fg-action" onPress={onPressTermsOfService}>
        Termos de Serviços
      </Text>
      {` do app ${appName} antes de usá-lo.`}
    </Text>
  </BottomSheet>
);
