import React from 'react';
import { Text } from 'react-native';
import { Button } from '../../atoms/Button';
import { ConfirmDialog } from '../ConfirmDialog';

export type DeleteOwnPostSheetProps = {
  onDelete?: () => void;
  onCancel?: () => void;
  onDismiss?: () => void;
};

/**
 * DeleteOwnPostSheet — confirmação de exclusão da própria publicação, aberta
 * a partir de "Excluir publicação" no `OwnPostActionsSheet`. Reproduz "🟡
 * Denúncia — Menu de ações - Publicação própria - Confirmar exclusão".
 */
export const DeleteOwnPostSheet = ({
  onDelete,
  onCancel,
  onDismiss,
}: DeleteOwnPostSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <Text className="font-sans text-[18px] font-bold text-fg-primary">Excluir publicação</Text>
    <Text className="font-sans text-[14px] leading-[18px] text-fg-secondary">
      Você tem certeza que deseja excluir sua publicação? Se você excluir não poderá mais recuperar
      o conteúdo.
    </Text>
    <Button variant="danger" fullWidth label="Excluir publicação" onPress={onDelete} />
    <Button variant="ghost" tone="highlight" fullWidth label="Cancelar" onPress={onCancel} />
  </ConfirmDialog>
);
