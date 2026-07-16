import React from 'react';
import { Image, Pressable, ScrollView, Text, View } from 'react-native';
import type { ImageSourcePropType } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import type { IconName } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { ScreenHeader } from '../../organisms/ScreenHeader';
import { BottomNav } from '../../organisms/BottomNav';
import type { BottomNavKey } from '../../organisms/BottomNav';
import { FlightLegCard } from '../../organisms/FlightLegCard';
import type { FlightLegCardProps } from '../../organisms/FlightLegCard';
import { OrderStatusBadge } from '../../molecules/OrderStatusBadge';
import type { OrderStatus } from '../../molecules/OrderStatusBadge';
import { OrderTripSummary } from '../../molecules/OrderTripSummary';
import type { OrderTripSummaryProps } from '../../molecules/OrderTripSummary';
import { OrderTimelineStep } from '../../molecules/OrderTimelineStep';
import type { OrderTimelineStepProps } from '../../molecules/OrderTimelineStep';

export type OrderDetailsPendingNotice = {
  /** Título de destaque (ex.: "Seu trecho Congonhas - Florianópolis está pendente."). */
  title: string;
  description: string;
};

export type OrderDetailsProps = {
  onBack?: () => void;
  productIcon: IconName;
  productTitle: string;
  orderNumber: string | number;
  createdAtLabel: string;
  heroImage?: ImageSourcePropType;
  trip: OrderTripSummaryProps;
  status: OrderStatus;
  statusLabel?: string;
  /** Passos da linha do tempo do pedido (o último recebe `last` automaticamente). */
  timelineSteps: Omit<OrderTimelineStepProps, 'last'>[];
  /** Aviso de trecho pendente (título + descrição), quando aplicável. */
  pendingNotice?: OrderDetailsPendingNotice;
  /** Aviso curto (banner com ícone), ex.: prazo para alterar pagamento. */
  alertNotice?: string;
  ctaLabel?: string;
  onPressCta?: () => void;
  changePaymentLabel?: string;
  onPressChangePayment?: () => void;
  /** Trechos do voo (ida/volta), cada um renderizado num `FlightLegCard`. */
  flights?: FlightLegCardProps[];
  active?: BottomNavKey;
  onNavigate?: (key: BottomNavKey) => void;
};

/**
 * OrderDetails — tela "Detalhes do pedido": resumo (tipo, número, data e
 * destino), situação, linha do tempo, avisos e CTA, seguidos pelos trechos do
 * voo (`FlightLegCard`). Apresentacional: todos os dados entram por props.
 * Segue "Detalhes Pedido - Meus pedidos" do Figma (seção de status + voos).
 */
export const OrderDetails = ({
  onBack,
  productIcon,
  productTitle,
  orderNumber,
  createdAtLabel,
  heroImage,
  trip,
  status,
  statusLabel,
  timelineSteps,
  pendingNotice,
  alertNotice,
  ctaLabel,
  onPressCta,
  changePaymentLabel,
  onPressChangePayment,
  flights = [],
  active,
  onNavigate,
}: OrderDetailsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScreenHeader title="Detalhes do pedido" onBack={onBack} />

      {heroImage ? <Image source={heroImage} className="h-[216px] w-full" resizeMode="cover" /> : null}

      <View className="gap-lg bg-surface-default px-xxl py-xl">
        <View className="flex-row items-center justify-between">
          <View className="flex-row items-center gap-xs">
            <Icon name={productIcon} size={20} color={colors.text.subtle} />
            <Text className="font-sans text-paragraphMd font-medium text-fg-subtle">{productTitle}</Text>
          </View>
          <View className="items-end">
            <Text className="font-sans text-paragraphMd font-medium text-fg-secondary">
              #{orderNumber}
            </Text>
            <Text className="font-sans text-caption text-fg-subtle">{createdAtLabel}</Text>
          </View>
        </View>

        <View className="h-px w-full bg-border-subtle" />

        <OrderTripSummary {...trip} hideImage />

        <View className="flex-row">
          <OrderStatusBadge status={status} label={statusLabel} />
        </View>

        <View className="h-px w-full bg-border-subtle" />

        <View className="gap-lg">
          {timelineSteps.map((step, index) => (
            <OrderTimelineStep key={`${step.title}-${index}`} {...step} last={index === timelineSteps.length - 1} />
          ))}
        </View>

        {pendingNotice ? (
          <>
            <View className="h-px w-full bg-border-subtle" />
            <View className="items-center gap-md py-xs">
              <Text className="text-center font-sans text-cardTitle text-fg-secondary">
                {pendingNotice.title}
              </Text>
              <Text className="text-center font-sans text-paragraphMd text-fg-subtle">
                {pendingNotice.description}
              </Text>
            </View>
          </>
        ) : null}

        {alertNotice ? (
          <View className="flex-row items-start gap-xs rounded-md bg-feedback-pendingSurface px-md py-lg">
            <Icon name="order-step-pending" size={24} color={colors.feedback.pending} />
            <Text className="flex-1 font-sans text-paragraphMd text-fg-secondary">{alertNotice}</Text>
          </View>
        ) : null}

        {ctaLabel ? <Button variant="secondary" label={ctaLabel} onPress={onPressCta} fullWidth /> : null}

        {changePaymentLabel ? (
          <Pressable accessibilityRole="button" onPress={onPressChangePayment} className="items-center">
            <Text className="font-sans text-caption text-brand-zupper underline">{changePaymentLabel}</Text>
          </Pressable>
        ) : null}
      </View>

      <View className="gap-lg p-lg">
        {flights.map((flight, index) => (
          <FlightLegCard key={`${flight.direction}-${index}`} {...flight} />
        ))}
      </View>
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
