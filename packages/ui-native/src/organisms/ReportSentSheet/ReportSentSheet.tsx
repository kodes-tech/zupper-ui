import React from 'react';
import { Text } from 'react-native';
import { Button } from '../../atoms/Button';
import { ConfirmDialog } from '../ConfirmDialog';

export type ReportSentSheetProps = {
  onDone?: () => void;
  onBlockAuthor?: () => void;
  onDismiss?: () => void;
};

/**
 * ReportSentSheet — passo 3 da denúncia: confirmação de envio, com o CTA de
 * concluir e o atalho destrutivo de bloquear o autor. Reproduz "🟡Denúncia —
 * Feedback".
 */
export const ReportSentSheet = ({
  onDone,
  onBlockAuthor,
  onDismiss,
}: ReportSentSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <Text className="font-sans text-[18px] font-bold text-fg-primary">Denunciar publicação</Text>
    <Text className="font-sans text-[14px] leading-[18px] text-fg-secondary">
      Obrigado por ajudar a manter a comunidade Zupper segura. Nossa equipe vai analisar essa
      publicação e tomar as medidas necessárias.
    </Text>
    <Button label="Concluir" fullWidth onPress={onDone} />
    <Button variant="ghost" fullWidth label="Bloquear este autor" onPress={onBlockAuthor} />
  </ConfirmDialog>
);
