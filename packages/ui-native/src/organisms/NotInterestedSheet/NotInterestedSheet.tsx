import React from 'react';
import { Text, View } from 'react-native';
import { SheetOption } from '../../molecules/SheetOption';
import { BottomSheet } from '../BottomSheet';

export type NotInterestedSheetProps = {
  /** Destino da publicação, usado no rótulo "Ver menos sobre {destino}". */
  destination: string;
  onSeeLessDestination?: () => void;
  onSeeLessAuthor?: () => void;
  onSeeLessPhotos?: () => void;
  onUndo?: () => void;
  onDismiss?: () => void;
};

/**
 * NotInterestedSheet — confirmação de "Não tenho interesse" com os ajustes de
 * feed que o viajante pode fazer em seguida (ver menos sobre o destino, sobre o
 * autor, ou fotos) e o desfazer. Reproduz "6. Não tenho interesse".
 */
export const NotInterestedSheet = ({
  destination,
  onSeeLessDestination,
  onSeeLessAuthor,
  onSeeLessPhotos,
  onUndo,
  onDismiss,
}: NotInterestedSheetProps): React.ReactElement => (
  <BottomSheet
    title="Ok, vamos mostrar menos conteúdo assim"
    description="Suas escolhas ajudam a personalizar o que você vê na comunidade."
    onDismiss={onDismiss}
  >
    <View className="px-screenMargin pb-xs pt-md">
      <Text className="font-sans text-[17px] font-bold text-fg-primary">
        Quer ajustar o que aparece?
      </Text>
    </View>

    <SheetOption
      emoji="📍"
      label={`Ver menos sobre ${destination}`}
      onPress={onSeeLessDestination}
    />
    <SheetOption emoji="🙈" label="Ver menos deste autor" onPress={onSeeLessAuthor} />
    <SheetOption emoji="🖼" label="Ver menos fotos no feed" onPress={onSeeLessPhotos} />

    <View className="h-px w-full bg-border-default" />
    <SheetOption emoji="↩" label="Desfazer" onPress={onUndo} />
  </BottomSheet>
);
