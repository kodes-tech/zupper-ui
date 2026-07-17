import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { SheetOption } from '../../molecules/SheetOption';
import { ConfirmDialog } from '../ConfirmDialog';

export type ReportReason = { id: string; label: string };

export type ReportReasonsSheetProps = {
  reasons: ReportReason[];
  onSelectReason?: (id: string) => void;
  onCancelReport?: () => void;
  onDismiss?: () => void;
};

/**
 * ReportReasonsSheet — passo 2 da denúncia: a lista de motivos. Os motivos vêm
 * por prop (o catálogo é do app/backend, não do design system). Reproduz
 * "🟡Denúncia — Motivos".
 */
export const ReportReasonsSheet = ({
  reasons,
  onSelectReason,
  onCancelReport,
  onDismiss,
}: ReportReasonsSheetProps): React.ReactElement => (
  <ConfirmDialog onDismiss={onDismiss}>
    <Text className="font-sans text-[18px] font-bold text-fg-primary">Denunciar publicação</Text>
    <Text className="font-sans text-[14px] leading-[17px] text-fg-secondary">
      Selecione abaixo o motivo da sua denúncia. Não se preocupe, ela é anônima.
    </Text>
    <View>
      {reasons.map((reason) => (
        <SheetOption
          key={reason.id}
          label={reason.label}
          chevron
          padded={false}
          onPress={() => onSelectReason?.(reason.id)}
        />
      ))}
    </View>
    <Button
      variant="ghost"
      tone="highlight"
      fullWidth
      label="Cancelar denúncia"
      onPress={onCancelReport}
    />
  </ConfirmDialog>
);
