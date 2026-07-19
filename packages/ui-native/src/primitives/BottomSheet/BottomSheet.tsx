import React from 'react';
import { Pressable, Text, View } from 'react-native';

export type BottomSheetProps = {
  /** Título do cabeçalho (ex.: "Por que você está denunciando?"). */
  title?: string;
  /** Texto de apoio abaixo do título. */
  description?: string;
  /** Conteúdo do sheet (opções, lista de motivos, confirmação…). */
  children: React.ReactNode;
  /** Toque no overlay — fecha o sheet. */
  onDismiss?: () => void;
};

/**
 * BottomSheet — casca dos sheets da comunidade: overlay escuro + folha branca
 * ancorada embaixo (cantos superiores 20, grabber) e um cabeçalho opcional.
 * Apresentacional e sem animação/gesto: a visibilidade é decidida por quem
 * renderiza (o sheet só existe quando montado). Reproduz `bottom-sheet` de
 * `_figma/conteudo`.
 */
export const BottomSheet = ({
  title,
  description,
  children,
  onDismiss,
}: BottomSheetProps): React.ReactElement => (
  <View className="absolute inset-0 justify-end">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fechar"
      onPress={onDismiss}
      className="absolute inset-0 bg-[rgba(0,0,0,0.45)]"
    />

    <View className="w-full gap-xs rounded-t-[20px] bg-surface-default pb-[34px] pt-lg">
      <View className="h-[12px] items-center">
        <View className="h-[4px] w-[40px] rounded-pill bg-border-default" />
      </View>

      {title ? (
        <>
          <View className="gap-xs px-screenMargin pb-lg pt-md">
            <Text className="font-sans text-[17px] font-bold text-fg-primary">{title}</Text>
            {description ? (
              <Text className="font-sans text-[14px] leading-[18px] text-fg-muted">
                {description}
              </Text>
            ) : null}
          </View>
          <View className="h-px w-full bg-border-default" />
        </>
      ) : null}

      {children}
    </View>
  </View>
);
