import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { iconSize, spacing } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';
import type { IconName } from '@kodes-tech/icons';

export type ScreenHeaderProps = {
  title: string;
  /** Ícone opcional antes do título (ex.: fogo em "Destinos em alta"). */
  titleIcon?: IconName;
  /** Ícone opcional depois do título (ex.: tipo do conteúdo em "Publicar uma foto"). */
  trailingIcon?: IconName;
  /** Fundo da barra: 'surface' (padrão, branco) | 'transparent' (herda o fundo da tela). */
  background?: 'surface' | 'transparent';
  onBack?: () => void;
  /** Slot à direita; por padrão um espaçador pra manter o título centralizado. */
  right?: React.ReactNode;
};

/**
 * ScreenHeader — barra de topo com voltar + título (Meu Perfil, Destinos em alta…).
 * `trailingIcon` acrescenta um ícone após o título (ex.: o tipo em "Publicar uma
 * foto"); `background='transparent'` deixa a barra herdar o fundo da tela
 * (usado no formulário de publicar, cujo topo é o mesmo cinza do corpo).
 *
 * O espaço do topo respeita a safe-area do device (`useSafeAreaInsets().top`) em
 * vez de um valor fixo, para não colidir com notch/Dynamic Island; `spacing.xl` é
 * o piso quando não há inset (ex.: Android sem status bar translúcida). Requer um
 * `SafeAreaProvider` na raiz do app consumidor (peerDependency).
 */
export const ScreenHeader = ({
  title,
  titleIcon,
  trailingIcon,
  background = 'surface',
  onBack,
  right,
}: ScreenHeaderProps): React.ReactElement => {
  const insets = useSafeAreaInsets();

  return (
  <View
    style={{ paddingTop: Math.max(insets.top, spacing.xl) }}
    className={`flex-row items-center justify-between px-xxl pb-xxl ${
      background === 'surface' ? 'bg-surface-default' : ''
    }`}
  >
    <Pressable accessibilityRole="button" accessibilityLabel="Voltar" onPress={onBack}>
      <Icon name="back-arrow" size={iconSize.lg} />
    </Pressable>
    <View className="flex-row items-center gap-xs">
      {titleIcon ? <Icon name={titleIcon} size={iconSize.lg} /> : null}
      <Text className="font-sans text-cardTitle text-fg-label">{title}</Text>
      {trailingIcon ? <Icon name={trailingIcon} size={iconSize.md} /> : null}
    </View>
    {right ?? <View className="h-[24px] w-[24px]" />}
  </View>
  );
};
