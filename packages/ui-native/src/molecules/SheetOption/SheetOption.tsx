import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type SheetOptionProps = {
  label: string;
  /** Ícone à esquerda. No Figma as opções de bottom sheet usam emoji, não vetor. */
  emoji?: string;
  /** Ação destrutiva (ex.: "Denunciar", "Bloquear este autor") — rótulo em vermelho. */
  destructive?: boolean;
  /** Seta à direita — usada na lista de motivos da denúncia. */
  chevron?: boolean;
  onPress?: () => void;
};

/**
 * SheetOption — linha de opção de um bottom sheet (altura 56, emoji + rótulo).
 * Cobre as três formas do Figma: opção com emoji (menu de ações / "Não tenho
 * interesse"), opção destrutiva e item de lista com seta (motivos da denúncia).
 */
export const SheetOption = ({
  label,
  emoji,
  destructive = false,
  chevron = false,
  onPress,
}: SheetOptionProps): React.ReactElement => (
  <Pressable
    accessibilityRole="button"
    accessibilityLabel={label}
    onPress={onPress}
    className="h-[56px] w-full flex-row items-center justify-between px-screenMargin"
  >
    <View className="flex-1 flex-row items-center gap-[14px]">
      {emoji ? <Text className="font-sans text-[18px]">{emoji}</Text> : null}
      <Text
        className={`font-sans text-[15px] font-medium ${
          destructive ? 'text-feedback-danger' : 'text-fg-primary'
        }`}
      >
        {label}
      </Text>
    </View>
    {chevron ? <Icon name="chevron-right-dark" size={12} /> : null}
  </Pressable>
);
