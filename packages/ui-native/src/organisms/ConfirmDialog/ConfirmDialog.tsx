import React from 'react';
import { Pressable, View } from 'react-native';

export type ConfirmDialogProps = {
  /** Conteúdo do card (título, corpo, botões…). */
  children: React.ReactNode;
  /** Toque no overlay — fecha o diálogo. */
  onDismiss?: () => void;
};

/**
 * ConfirmDialog — casca dos diálogos de confirmação/status da denúncia:
 * overlay escuro + card branco centralizado (cantos arredondados nos 4 lados),
 * diferente do `BottomSheet` (ancorado embaixo, cantos só no topo). Reproduz
 * o "Título" de `🟡Denunciar publicação` (menu de ações, motivos, feedback,
 * confirmar exclusão, conteúdo em análise/removido). Apresentacional e sem
 * animação: a visibilidade é decidida por quem renderiza.
 */
export const ConfirmDialog = ({ children, onDismiss }: ConfirmDialogProps): React.ReactElement => (
  <View className="absolute inset-0 items-center justify-center px-screenMargin">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fechar"
      onPress={onDismiss}
      className="absolute inset-0 bg-[rgba(0,0,0,0.45)]"
    />

    <View className="w-full gap-xl rounded-xl bg-surface-default p-xxl">{children}</View>
  </View>
);
