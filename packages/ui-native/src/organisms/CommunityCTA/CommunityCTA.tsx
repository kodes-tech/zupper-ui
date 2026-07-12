import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { colors } from '@zupper/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';

export type CommunityCTAVariant = 'traveler' | 'partner';

export type CommunityCTAProps = {
  variant: CommunityCTAVariant;
  title: string;
  description: string;
  onDica?: () => void;
  onFoto?: () => void;
  onRoteiro?: () => void;
};

const Pill = ({
  iconName,
  label,
  gradient,
  onPress,
}: {
  iconName: IconName;
  label: string;
  gradient: string[];
  onPress?: () => void;
}) => (
  <Pressable accessibilityRole="button" accessibilityLabel={label} onPress={onPress} style={{ flex: 1 }}>
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={{
        borderRadius: 40,
        paddingVertical: 12,
        paddingHorizontal: 8,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      <Icon name={iconName} size={20} />
      <Text className="font-sans text-buttonLabel text-fg-inverse">{label}</Text>
    </LinearGradient>
  </Pressable>
);

/**
 * CommunityCTA — card "Bem-vindo de volta" / "Sua audiência quer te ver viajando"
 * com os 3 botões de publicar (Dica/Foto/Roteiro). Variante muda card e gradiente.
 */
export const CommunityCTA = ({
  variant,
  title,
  description,
  onDica,
  onFoto,
  onRoteiro,
}: CommunityCTAProps): React.ReactElement => {
  const gradient =
    variant === 'partner' ? [...colors.gradient.partner] : [...colors.gradient.button];
  const cardClass =
    variant === 'partner'
      ? 'bg-partner-cardSurface border border-partner-cardBorder'
      : 'bg-brand-cardSurface border border-brand-borderHighlight';

  return (
    <View className={`gap-xxl rounded-sm p-xl ${cardClass}`}>
      <View className="gap-xs">
        <Text className="font-sans text-[17px] font-bold leading-[22px] text-fg-heading">{title}</Text>
        <Text className="font-sans text-bodyText text-fg-body">{description}</Text>
      </View>
      <View className="flex-row gap-md">
        <Pill iconName="content-dica-white" label="Dica" gradient={gradient} onPress={onDica} />
        <Pill iconName="content-foto-white" label="Foto" gradient={gradient} onPress={onFoto} />
        <Pill iconName="content-roteiro-white" label="Roteiro" gradient={gradient} onPress={onRoteiro} />
      </View>
    </View>
  );
};
