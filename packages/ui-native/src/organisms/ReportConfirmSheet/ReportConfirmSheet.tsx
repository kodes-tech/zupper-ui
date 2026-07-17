import React from 'react';
import { Text } from 'react-native';
import { Button } from '../../atoms/Button';
import { ConfirmDialog } from '../ConfirmDialog';

export type ReportConfirmSheetProps = {
  onReport?: () => void;
  onCancel?: () => void;
  onDismiss?: () => void;
};

/**
 * ReportConfirmSheet — confirmação antes de abrir a lista de motivos: só
 * "Denunciar publicação" (danger) ou "Cancelar". Reproduz "🟡Denúncia — Menu
 * de ações". Distinto do `PostActionsSheet` (menu completo de ações do post).
 */
export const ReportConfirmSheet = ({
  onReport,
  onCancel,
  onDismiss,
}: ReportConfirmSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <Text className="font-sans text-[18px] font-bold text-fg-primary">Mais opções</Text>
    <Button variant="danger" fullWidth label="Denunciar publicação" onPress={onReport} />
    <Button variant="ghost" tone="highlight" fullWidth label="Cancelar" onPress={onCancel} />
  </ConfirmDialog>
);
