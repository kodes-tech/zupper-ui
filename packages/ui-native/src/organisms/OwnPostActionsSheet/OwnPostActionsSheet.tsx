import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { SheetOption } from '../../molecules/SheetOption';
import { ConfirmDialog } from '../ConfirmDialog';

export type OwnPostActionsSheetProps = {
  onEdit?: () => void;
  onDelete?: () => void;
  onCancel?: () => void;
  onDismiss?: () => void;
};

/**
 * OwnPostActionsSheet — menu de ações da PRÓPRIA publicação: Editar/Excluir
 * (sem a opção Denunciar, que não faz sentido no próprio conteúdo). Reproduz
 * "🟡Denúncia — Menu de ações - Publicação própria".
 */
export const OwnPostActionsSheet = ({
  onEdit,
  onDelete,
  onCancel,
  onDismiss,
}: OwnPostActionsSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <Text className="font-sans text-[18px] font-bold text-fg-primary">Mais opções</Text>
    <View>
      <SheetOption label="Editar publicação" icon="edit" padded={false} onPress={onEdit} />
      <SheetOption label="Excluir publicação" icon="trash" padded={false} onPress={onDelete} />
    </View>
    <Button variant="ghost" tone="highlight" fullWidth label="Cancelar" onPress={onCancel} />
  </ConfirmDialog>
);
