import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { Button } from '../../atoms/Button';
import { Icon } from '../../atoms/Icon';

export type TravelPreferencesResultTone = 'success' | 'warning';

export type TravelPreferencesResultActionVariant = 'primary' | 'secondary' | 'link';

export type TravelPreferencesResultAction = {
  label: string;
  /**
   * `primary`/`secondary` renderizam via `Button`. `link` — ação terciária só
   * texto (ex.: "Descartar informações"): o `Button` ainda não tem uma
   * variante "Ghost" discreta (seu `ghost` de hoje é a hierarquia "Danger",
   * vermelha, usada em "Sair da minha conta") — renderizada aqui direto para
   * não sobrecarregar o `Button` com um eixo fora do escopo desta tela.
   */
  variant?: TravelPreferencesResultActionVariant;
  onPress?: () => void;
};

export type TravelPreferencesResultCardProps = {
  /** `success` — quiz concluído. `warning` — fluxo abandonado com respostas incompletas. */
  tone: TravelPreferencesResultTone;
  title: string;
  description: string;
  /** 0 a 3 ações, renderizadas empilhadas na ordem informada. */
  actions?: TravelPreferencesResultAction[];
  /** Toque fora do card fecha, como no `PublishedModal`. */
  onDismiss?: () => void;
};

/**
 * TravelPreferencesResultCard — cartão de resultado do quiz "Preferências de
 * viagem": overlay + card central, mesmo padrão estrutural do `PublishedModal`
 * (ícone + título + descrição), com ações configuráveis. Cobre "Feedback
 * conclusão" (`success`, sem ações) e "Desistência do fluxo" (`warning`, até
 * 3 ações). Apresentacional; pensado para entrar via `overlay` de uma tela
 * (ex.: `CommunityProfile`).
 */
export const TravelPreferencesResultCard = ({
  tone,
  title,
  description,
  actions = [],
  onDismiss,
}: TravelPreferencesResultCardProps): React.ReactElement => (
  <View className="absolute inset-0 items-center justify-center px-xl">
    <Pressable
      accessibilityRole="button"
      accessibilityLabel="Fechar"
      onPress={onDismiss}
      className="absolute inset-0 bg-[rgba(23,23,23,0.7)]"
    />

    <View className="w-full items-center gap-xxl rounded-md bg-surface-default p-xxl">
      {tone === 'success' ? (
        <Icon name="status-success" size={72} />
      ) : (
        // TODO(Figma): sem ícone vetorial de aviso no design system ainda —
        // emoji como no cabeçalho do StatusBanner, até existir o asset.
        <View className="size-[72px] items-center justify-center rounded-full bg-feedback-warningSurface">
          <Text className="text-[32px]">⚠</Text>
        </View>
      )}
      <Text className="text-center font-sans text-heading text-fg-primary">{title}</Text>
      <Text className="text-center font-sans text-[16px] font-medium leading-[24px] text-fg-secondary">
        {description}
      </Text>
      {actions.length > 0 ? (
        <View className="w-full gap-lg">
          {actions.map((actionItem) =>
            actionItem.variant === 'link' ? (
              <Pressable
                key={actionItem.label}
                accessibilityRole="button"
                onPress={actionItem.onPress}
                className="w-full items-center justify-center py-md"
              >
                <Text className="font-sans text-lg font-medium leading-[24px] tracking-[0.32px] text-brand-strong">
                  {actionItem.label}
                </Text>
              </Pressable>
            ) : (
              <Button
                key={actionItem.label}
                label={actionItem.label}
                variant={actionItem.variant ?? 'primary'}
                fullWidth
                onPress={actionItem.onPress}
              />
            ),
          )}
        </View>
      ) : null}
    </View>
  </View>
);
