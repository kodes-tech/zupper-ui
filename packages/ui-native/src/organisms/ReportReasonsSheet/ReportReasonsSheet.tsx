import React from 'react';
import { SheetOption } from '../../molecules/SheetOption';
import { BottomSheet } from '../BottomSheet';

export type ReportReason = { id: string; label: string };

export type ReportReasonsSheetProps = {
  reasons: ReportReason[];
  onSelectReason?: (id: string) => void;
  onDismiss?: () => void;
};

/**
 * ReportReasonsSheet — passo 2 da denúncia: a lista de motivos. Os motivos vêm
 * por prop (o catálogo é do app/backend, não do design system). Reproduz
 * "5. Denúncia — Motivos".
 */
export const ReportReasonsSheet = ({
  reasons,
  onSelectReason,
  onDismiss,
}: ReportReasonsSheetProps): React.ReactElement => (
  <BottomSheet
    title="Por que você está denunciando?"
    description="Sua denúncia é anônima. Se alguém estiver em perigo, chame a emergência."
    onDismiss={onDismiss}
  >
    {reasons.map((reason) => (
      <SheetOption
        key={reason.id}
        label={reason.label}
        chevron
        onPress={() => onSelectReason?.(reason.id)}
      />
    ))}
  </BottomSheet>
);
