import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Icon } from '@kodes-tech/icons';
import { ConfirmDialog } from '../ConfirmDialog';

export type ContentUnderReviewSheetProps = {
  onLearnMore?: () => void;
  onClose?: () => void;
  onDismiss?: () => void;
};

/**
 * ContentUnderReviewSheet — aviso ao autor de que a própria publicação foi
 * denunciada e está em análise (segue visível). Reproduz "🟡Autor - Conteúdo
 * em análise". Diferente do `StatusBanner` (tira inline no topo do post) —
 * este é o diálogo completo aberto a partir dele/da notificação.
 */
export const ContentUnderReviewSheet = ({
  onLearnMore,
  onClose,
  onDismiss,
}: ContentUnderReviewSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <View className="items-center gap-xl">
      <Icon name="status-review" size={72} />
      <Text className="font-sans text-[18px] font-bold text-fg-primary">Publicação em análise</Text>
    </View>
    <Text className="font-sans text-[14px] leading-[18px] text-fg-secondary">
      Recebemos uma denúncia sobre esta publicação. Nossa equipe está avaliando e ela segue visível
      por enquanto. Avisaremos o resultado.
    </Text>
    <Button
      variant="secondary"
      tone="highlight"
      fullWidth
      label="Entenda as regras da comunidade"
      onPress={onLearnMore}
    />
    <Button variant="ghost" tone="highlight" fullWidth label="Fechar" onPress={onClose} />
  </ConfirmDialog>
);
