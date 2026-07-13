import React from 'react';
import { View } from 'react-native';
import { SheetOption } from '../../molecules/SheetOption';
import { BottomSheet } from '../BottomSheet';

export type PostActionsSheetProps = {
  onSave?: () => void;
  onNotInterested?: () => void;
  onShare?: () => void;
  onReport?: () => void;
  onDismiss?: () => void;
};

/**
 * PostActionsSheet — menu de ações de uma publicação, aberto pelo "..." da barra
 * social: Salvar / Não tenho interesse / Compartilhar e, separada por divisória,
 * a ação destrutiva Denunciar. Reproduz "5. Denúncia — Menu de ações".
 */
export const PostActionsSheet = ({
  onSave,
  onNotInterested,
  onShare,
  onReport,
  onDismiss,
}: PostActionsSheetProps): React.ReactElement => (
  <BottomSheet onDismiss={onDismiss}>
    <SheetOption emoji="🔖" label="Salvar publicação" onPress={onSave} />
    <SheetOption emoji="🔕" label="Não tenho interesse" onPress={onNotInterested} />
    <SheetOption emoji="↗" label="Compartilhar" onPress={onShare} />
    <View className="h-px w-full bg-border-default" />
    <SheetOption emoji="⚑" label="Denunciar" destructive onPress={onReport} />
  </BottomSheet>
);
