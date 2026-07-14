import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Icon } from '../../atoms/Icon';

export type PublishedContentType = 'foto' | 'dica' | 'roteiro';

export type PublishedModalProps = {
  /** Tipo publicado — define o título ("Foto publicada" / "Roteiro publicado"). */
  type: PublishedContentType;
  /**
   * Fecha o modal. No Figma o feedback "deve permanecer por 3 segundos e fechar
   * automaticamente" — quem conta o tempo é o app (ou `autoDismissMs`).
   */
  onDismiss?: () => void;
  /**
   * Fecha sozinho depois de N ms. Desligado por padrão pra não sumir no
   * Storybook; o app deve passar 3000, como pede a anotação do Figma.
   */
  autoDismissMs?: number;
};

/** Concordância de gênero em PT-BR: foto/dica são femininas, roteiro é masculino. */
const TITLE: Record<PublishedContentType, string> = {
  foto: 'Foto publicada',
  dica: 'Dica publicada',
  roteiro: 'Roteiro publicado',
};

/**
 * PublishedModal — feedback de sucesso depois de publicar um conteúdo: modal
 * centralizado (não bottom sheet) sobre o perfil da comunidade, com check,
 * título por tipo e a chamada pra continuar publicando. Reproduz
 * "6/7/8. Publicar conteúdo - Feedback".
 */
export const PublishedModal = ({
  type,
  onDismiss,
  autoDismissMs,
}: PublishedModalProps): React.ReactElement => {
  React.useEffect(() => {
    if (!autoDismissMs) return;
    const timer = setTimeout(() => onDismiss?.(), autoDismissMs);
    return () => clearTimeout(timer);
  }, [autoDismissMs, onDismiss]);

  return (
    <View className="absolute inset-0 items-center justify-center px-xl">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Fechar"
        onPress={onDismiss}
        className="absolute inset-0 bg-[rgba(23,23,23,0.7)]"
      />

      <View className="w-full items-center gap-xxl rounded-md bg-surface-default p-xxl">
        <Icon name="status-success" size={72} />
        <Text className="text-center font-sans text-heading text-fg-primary">{TITLE[type]}</Text>
        <Text className="text-center font-sans text-[16px] font-medium leading-[24px] text-fg-secondary">
          Continue compartilhando experiências e contribuindo para a comunidade!
        </Text>
      </View>
    </View>
  );
};
