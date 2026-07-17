import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';
import { ConfirmDialog } from '../ConfirmDialog';

export type ContentRemovedSheetProps = {
  /** Motivo da remoção, embutido no corpo do texto (ex.: "informação incorreta sobre o destino"). */
  reason: string;
  onContest?: () => void;
  onClose?: () => void;
  onDismiss?: () => void;
};

/**
 * ContentRemovedSheet — aviso ao autor de que a própria publicação foi
 * removida após denúncia, com opção de contestar. Reproduz "🟡Autor -
 * Publicação removida".
 */
export const ContentRemovedSheet = ({
  reason,
  onContest,
  onClose,
  onDismiss,
}: ContentRemovedSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <View className="items-center gap-xl">
      <Icon name="status-removed" size={72} />
      <Text className="font-sans text-[18px] font-bold text-fg-primary">Publicação removida</Text>
    </View>
    <Text className="font-sans text-[14px] leading-[18px] text-fg-secondary">
      {`Esta publicação foi removida por violar as diretrizes da comunidade Zupper (motivo: ${reason}). Ela não está mais visível para outros viajantes.`}
    </Text>
    <Button
      variant="secondary"
      tone="highlight"
      fullWidth
      label="Contestar decisão"
      onPress={onContest}
    />
    <Button variant="ghost" tone="highlight" fullWidth label="Fechar" onPress={onClose} />
  </ConfirmDialog>
);
