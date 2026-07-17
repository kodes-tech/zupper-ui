import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import { colors, radii } from '@kodes-tech/tokens';
import { Icon } from '@kodes-tech/icons';

export type CommentInputProps = {
  /** Texto já digitado; quando vazio, mostra o placeholder. */
  value?: string;
  placeholder?: string;
  /** Foco no campo (abre o teclado no app consumidor). */
  onPress?: () => void;
  /** Envia o comentário. */
  onSend?: () => void;
};

// Botão de envio: círculo com gradiente da marca. LinearGradient é ortogonal ao
// NativeWind (mesma exceção do Button) — layout via style computado dos tokens.
const sendStyle = {
  width: 40,
  height: 40,
  borderRadius: radii.pill,
  alignItems: 'center' as const,
  justifyContent: 'center' as const,
};

/**
 * CommentInput — composer de comentário: campo pill + botão de envio com
 * gradiente. Apresentacional (sem estado de texto): `value`/`placeholder` por
 * props; foco e envio por callbacks. Reproduz o "comment-input-row" de
 * `_figma/conteudo`.
 */
export const CommentInput = ({
  value,
  placeholder = 'Escreva um comentário...',
  onPress,
  onSend,
}: CommentInputProps): React.ReactElement => (
  <View className="h-[56px] flex-row items-center gap-lg rounded-[28px] border border-border-default bg-surface-default pl-[20px] pr-md">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Escrever um comentário"
      onPress={onPress}
      className="flex-1"
    >
      <Text
        numberOfLines={1}
        className={`font-sans text-lg ${value ? 'text-fg-primary' : 'text-fg-muted'}`}
      >
        {value || placeholder}
      </Text>
    </Pressable>
    <Pressable accessibilityRole="button" accessibilityLabel="Enviar comentário" onPress={onSend}>
      <LinearGradient
        testID="comment-send-gradient"
        colors={[...colors.gradient.brand]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={sendStyle}
      >
        <Icon name="comment-send" size={20} />
      </LinearGradient>
    </Pressable>
  </View>
);
