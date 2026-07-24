import React from 'react';
import { Pressable, View } from 'react-native';
import { ThemeProvider } from '../../theme/ThemeProvider';

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
 *
 * O card é uma "ilha clara": um `ThemeProvider theme="default"` reaplica o tema light
 * na subárvore, então o diálogo fica branco com texto escuro mesmo sob o tema dark
 * (decisão de design — diálogo sempre claro sobre o overlay). O overlay (`bg-scrim`)
 * fica FORA do provider e segue o tema/scrim ativo.
 */
export const ConfirmDialog = ({ children, onDismiss }: ConfirmDialogProps): React.ReactElement => (
  <View className="absolute inset-0 items-center justify-center px-screenMargin">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fechar"
      onPress={onDismiss}
      className="absolute inset-0 bg-scrim"
    />

    <ThemeProvider theme="default" className="w-full gap-xl rounded-xl bg-surface-default p-xxl">
      {children}
    </ThemeProvider>
  </View>
);
