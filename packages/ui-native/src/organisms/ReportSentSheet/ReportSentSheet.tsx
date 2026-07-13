import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { SheetOption } from '../../molecules/SheetOption';
import { BottomSheet } from '../BottomSheet';

export type ReportSentSheetProps = {
  onDone?: () => void;
  onBlockAuthor?: () => void;
  onDismiss?: () => void;
};

/**
 * ReportSentSheet — passo 3 da denúncia: confirmação de envio, com o CTA de
 * concluir e o atalho destrutivo de bloquear o autor. Reproduz
 * "5. Denúncia — Enviada".
 */
export const ReportSentSheet = ({
  onDone,
  onBlockAuthor,
  onDismiss,
}: ReportSentSheetProps): React.ReactElement => (
  <BottomSheet onDismiss={onDismiss}>
    <View className="items-center gap-[14px] px-xxl py-md">
      <View className="h-[64px] w-[64px] items-center justify-center rounded-pill bg-feedback-success">
        <Text className="font-sans text-[30px] font-bold text-fg-inverse">✓</Text>
      </View>
      <Text className="text-center font-sans text-[18px] font-bold text-fg-primary">
        Denúncia enviada
      </Text>
      <Text className="text-center font-sans text-[14px] leading-[20px] text-fg-secondary">
        Obrigado por ajudar a manter a comunidade Zupper segura. Nossa equipe vai analisar essa
        publicação e tomar as medidas necessárias.
      </Text>
    </View>

    <View className="px-screenMargin pt-[18px]">
      <Button label="Concluir" fullWidth onPress={onDone} />
    </View>

    <SheetOption emoji="🚫" label="Bloquear este autor" destructive onPress={onBlockAuthor} />
  </BottomSheet>
);
