import React from 'react';
import type { ImageSourcePropType } from 'react-native';
import type { RoleBadgeVariant } from '../../atoms/RoleBadge';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { TravelPreferencesResultCard } from '../../organisms/TravelPreferencesResultCard';
import type {
  TravelPreferencesResultAction,
  TravelPreferencesResultTone,
} from '../../organisms/TravelPreferencesResultCard';
import { CommunityProfile } from '../CommunityProfile';

export type TravelPreferencesResultProps = {
  name: string;
  subtitle: string;
  role: RoleBadgeVariant;
  avatar?: ImageSourcePropType;
  initials?: string;
  photos?: ImageSourcePropType[];
  tone: TravelPreferencesResultTone;
  title: string;
  description: string;
  actions?: TravelPreferencesResultAction[];
  onDismissResult?: () => void;
  onBack?: () => void;
  onNavigate?: (key: BottomNavKey) => void;
  onPublish?: () => void;
};

/**
 * TravelPreferencesResult — resultado do quiz "Preferências de viagem"
 * ("Feedback conclusão" / "Desistência do fluxo"): o
 * `TravelPreferencesResultCard` sobreposto ao `CommunityProfile` (aba Fotos),
 * reaproveitando o slot `overlay` que a tela já expõe em vez de recriar
 * avatar/abas/grade de fotos.
 */
export const TravelPreferencesResult = ({
  name,
  subtitle,
  role,
  avatar,
  initials,
  photos,
  tone,
  title,
  description,
  actions,
  onDismissResult,
  onBack,
  onNavigate,
  onPublish,
}: TravelPreferencesResultProps): React.ReactElement => (
  <CommunityProfile
    name={name}
    subtitle={subtitle}
    role={role}
    avatar={avatar}
    initials={initials}
    tab="fotos"
    photos={photos}
    onBack={onBack}
    onNavigate={onNavigate}
    onPublish={onPublish}
    overlay={
      <TravelPreferencesResultCard
        tone={tone}
        title={title}
        description={description}
        actions={actions}
        onDismiss={onDismissResult}
      />
    }
  />
);
