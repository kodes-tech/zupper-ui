import React from 'react';
import { Image, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { RoleBadge } from '../../atoms/RoleBadge';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';

export type AccountGreetingProps = {
  name: string;
  /** Handle ou e-mail (ex.: "@carlosviaja" / "contato@dominio.com.br"). */
  subtitle: string;
  avatar: ImageSourcePropType;
  /** Papel do usuário; omitido = sem selo (ex.: logado sem viagem). */
  role?: RoleBadgeVariant;
  /** Rótulo do selo (ex.: "Zupper Parceiro"); padrão é o da variante. */
  badgeLabel?: string;
};

/**
 * AccountGreeting — cabeçalho do usuário na tela "Minha conta": avatar (56),
 * "Olá, Nome!", handle/e-mail e um selo opcional de papel. O avatar tem tamanho
 * próprio (56px, exclusivo desta tela) — por isso a imagem é montada aqui em vez
 * do átomo Avatar (enum sm/md/lg).
 */
export const AccountGreeting = ({
  name,
  subtitle,
  avatar,
  role,
  badgeLabel,
}: AccountGreetingProps): React.ReactElement => (
  <View className="flex-row items-center gap-md px-xxl">
    <Image
      source={avatar}
      resizeMode="cover"
      className="h-[56px] w-[56px] rounded-pill bg-border-default"
    />
    <View className="h-[56px] flex-1 justify-between">
      <Text numberOfLines={1} className="font-sans text-[22px] font-bold text-fg-secondary">
        {name}
      </Text>
      <Text className="font-sans text-bodyMd text-fg-subtle">{subtitle}</Text>
    </View>
    {role ? <RoleBadge variant={role} label={badgeLabel} /> : null}
  </View>
);
