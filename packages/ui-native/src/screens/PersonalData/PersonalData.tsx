import React from 'react';
import { ScrollView, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { PersonalDataForm } from '../../organisms/PersonalDataForm';
import type { PersonalDataContactType } from '../../organisms/PersonalDataForm';
import { ScreenHeader } from '../../organisms/ScreenHeader';

export type PersonalDataProps = {
  avatar: ImageSourcePropType;
  onChangePhoto?: () => void;
  firstName?: string;
  onChangeFirstName?: (value: string) => void;
  lastName?: string;
  onChangeLastName?: (value: string) => void;
  nickname?: string;
  onChangeNickname?: (value: string) => void;
  /** Erro de validação do apelido (ex.: "Este nome está indisponível"). */
  nicknameError?: string;
  email?: string;
  onChangeEmail?: (value: string) => void;
  birthDate?: string;
  onChangeBirthDate?: (value: string) => void;
  cpf?: string;
  onChangeCpf?: (value: string) => void;
  contactType?: PersonalDataContactType;
  onChangeContactType?: (type: PersonalDataContactType) => void;
  phone?: string;
  onChangePhone?: (value: string) => void;
  onBack?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * PersonalData — tela "Minha conta" › "Dados pessoais": header + formulário +
 * bottom nav. Apresentacional; reproduz `_figma/minha-conta` (Conta - Dados
 * pessoais / apelido indisponível).
 */
export const PersonalData = ({
  onBack,
  onNavigate,
  ...formProps
}: PersonalDataProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScreenHeader title="Minha conta" onBack={onBack} />
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingVertical: 24 }}
    >
      <PersonalDataForm {...formProps} />
    </ScrollView>
    <BottomNav active="conta" onNavigate={onNavigate} />
  </View>
);
