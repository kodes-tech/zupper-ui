import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { StatusMessage } from '../../molecules/StatusMessage';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type EmailConfirmationSheetProps = {
  /** Reenvio do e-mail de confirmação ("Solicitar reenvio de e-mail"). */
  onPressResend?: () => void;
  /** Volta pro cadastro pra trocar o e-mail informado. */
  onPressChangeEmail?: () => void;
  onDismiss?: () => void;
};

/**
 * EmailConfirmationSheet — sheet exibido após "Criar conta" no cadastro por
 * e-mail: avisa que o link de criação de senha foi enviado, com opção de
 * reenviar ou trocar o e-mail. Apresentacional. Segue "Cadastro - Login Email
 * SUCESSO" do Figma.
 */
export const EmailConfirmationSheet = ({
  onPressResend,
  onPressChangeEmail,
  onDismiss,
}: EmailConfirmationSheetProps): React.ReactElement => (
  <BottomSheet title="Fazer login com o E-mail" onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <StatusMessage
        tone="success"
        title="Enviamos um e-mail de confirmação"
        description="Acesse o link enviado para criar sua senha de acesso."
      />
      <Text className="text-center font-sans text-paragraphMd text-fg-muted">
        Não recebeu ou não encontrou o e-mail? Conferiu na sua caixa de entrada e lixo eletrônico?
        Relaxa... podemos reenviá-lo.
      </Text>
    </View>
    <View className="w-full items-center gap-md px-xxl">
      <Button variant="secondary" label="Solicitar reenvio de e-mail" onPress={onPressResend} fullWidth />
      <Pressable accessibilityRole="button" onPress={onPressChangeEmail}>
        <Text className="font-sans text-caption text-fg-action underline">
          Alterar e-mail de cadastro
        </Text>
      </Pressable>
    </View>
  </BottomSheet>
);
