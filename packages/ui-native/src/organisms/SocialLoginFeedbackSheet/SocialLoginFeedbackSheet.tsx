import React from 'react';
import { View } from 'react-native';
import { StatusMessage } from '../../molecules/StatusMessage';
import type { StatusMessageTone } from '../../molecules/StatusMessage';
import { Button } from '../../atoms/Button';
import { BottomSheet } from '../BottomSheet';

export type SocialLoginFeedbackSheetProps = {
  /** Título do cabeçalho do sheet (ex.: "Fazer login com o Google"). */
  headerTitle: string;
  tone: StatusMessageTone;
  title: string;
  description?: string;
  ctaLabel: string;
  onPressCta?: () => void;
  onDismiss?: () => void;
};

/**
 * SocialLoginFeedbackSheet — resultado do login/cadastro social: sucesso
 * ("Conta criada com sucesso") ou erro ("Não foi possível fazer o login").
 * Apresentacional: texto e callbacks entram por props. Segue "Cadastro -
 * Login Social ERRO/SUCESSO" do Figma.
 */
export const SocialLoginFeedbackSheet = ({
  headerTitle,
  tone,
  title,
  description,
  ctaLabel,
  onPressCta,
  onDismiss,
}: SocialLoginFeedbackSheetProps): React.ReactElement => (
  <BottomSheet title={headerTitle} onClose={onDismiss} onDismiss={onDismiss}>
    <View className="items-center gap-xxl px-xxl py-xl">
      <StatusMessage tone={tone} title={title} description={description} />
    </View>
    <View className="w-full px-xxl">
      <Button variant={tone === 'success' ? 'primary' : 'secondary'} label={ctaLabel} onPress={onPressCta} fullWidth />
    </View>
  </BottomSheet>
);
