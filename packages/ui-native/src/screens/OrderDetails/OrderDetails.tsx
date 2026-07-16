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
import { OrderInfoCard } from '../../organisms/OrderInfoCard';
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

export type OrderDetailsBaggageRow = {
  icon: IconName;
  title: string;
  description: string;
};

export type OrderDetailsFlight = FlightLegCardProps & {
  /** Franquia de bagagem do trecho — renderizada num card à parte, logo abaixo do `FlightLegCard`. */
  baggage?: OrderDetailsBaggageRow[];
};

export type OrderDetailsPaymentDetailRow = {
  label: string;
  value: string;
  /** Linha de destaque, em negrito (ex.: "Tarifa por adulto", "TOTAL A PAGAR"). */
  emphasized?: boolean;
  /** Quando false, omite o divisor abaixo desta linha — mescla com a próxima (ex.: "1 Adulto" + "Taxas e impostos"). Default: true. */
  dividerAfter?: boolean;
};

export type OrderDetailsPaymentMethod = {
  /** Rótulo à direita do título (ex.: "PIX"). */
  methodLabel: string;
  rows: { label: string; value: string }[];
};

export type OrderDetailsTraveler = {
  /** Ex.: "Adulto 1", "Criança". */
  role: string;
  name: string;
};

export type OrderDetailsFlightPolicy = {
  direction: 'ida' | 'volta';
  /** Ex.: "Florianópolis - Congonhas (Voucher 01)". */
  route: string;
  cancelPolicy: string;
  farePolicy: string;
  /** Nota adicional (ex.: taxa de serviço por solicitação de alteração). */
  serviceFeeNote?: string;
};

export type OrderDetailsInfoTopic = {
  /** Título do tópico (ex.: "Políticas de alteração e cancelamento", "Sobre seu pedido"). */
  title: string;
  /** Política de cancelamento/alteração por trecho (VOO DE IDA / VOO DE VOLTA). */
  flightPolicies?: OrderDetailsFlightPolicy[];
  /** Parágrafos simples do tópico. */
  paragraphs?: string[];
};

const flightPolicyLabel: Record<OrderDetailsFlightPolicy['direction'], string> = {
  ida: 'VOO DE IDA',
  volta: 'VOO DE VOLTA',
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
  /** Trechos do voo (ida/volta); cada um vira um `FlightLegCard` + card de bagagem opcional. */
  flights?: OrderDetailsFlight[];
  paymentDetails?: OrderDetailsPaymentDetailRow[];
  paymentMethod?: OrderDetailsPaymentMethod;
  travelers?: OrderDetailsTraveler[];
  /** Tópicos de política/avisos gerais (ex.: cancelamento por trecho, regras da cia aérea). */
  importantInfo?: OrderDetailsInfoTopic[];
  active?: BottomNavKey;
  onNavigate?: (key: BottomNavKey) => void;
};

// Acento por situação (Figma): barra sob a imagem + borda/tom do OrderCard.
const barColorByStatus: Record<OrderStatus, string> = {
  issued: 'bg-feedback-success',
  ongoing: 'bg-feedback-pending',
  cancelled: 'bg-feedback-danger',
};

const Divider = () => <View className="h-px w-full bg-border-subtle" />;

/**
 * OrderDetails — tela "Detalhes do pedido": resumo (tipo, número, data e
 * destino), situação, linha do tempo, avisos e CTA, os trechos do voo
 * (`FlightLegCard` + bagagem), detalhes/forma de pagamento, viajantes e
 * informações importantes. Apresentacional: todos os dados entram por props.
 * Segue "Detalhes Pedido - Meus pedidos" do Figma.
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
  paymentDetails,
  paymentMethod,
  travelers,
  importantInfo,
  active,
  onNavigate,
}: OrderDetailsProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <ScrollView showsVerticalScrollIndicator={false}>
      <ScreenHeader title={`Pedido #${orderNumber}`} onBack={onBack} />

      {heroImage ? (
        <>
          <Image source={heroImage} className="h-[216px] w-full" resizeMode="cover" />
          <View className={`h-[6px] w-full ${barColorByStatus[status]}`} />
        </>
      ) : null}

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

        <Divider />

        <OrderTripSummary {...trip} hideImage />

        <View className="flex-row">
          <OrderStatusBadge status={status} label={statusLabel} />
        </View>

        <Divider />

        <View className="gap-lg">
          {timelineSteps.map((step, index) => (
            <OrderTimelineStep key={`${step.title}-${index}`} {...step} last={index === timelineSteps.length - 1} />
          ))}
        </View>

        {pendingNotice ? (
          <>
            <Divider />
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

      {flights.length > 0 ? (
        <View className="gap-lg p-lg">
          <Text className="px-md font-sans text-cardTitle text-fg-secondary">Detalhes do seu voo</Text>

          {flights.map(({ baggage, ...flight }, index) => (
            <React.Fragment key={`${flight.direction}-${index}`}>
              <FlightLegCard {...flight} />
              {baggage ? (
                <OrderInfoCard title="Bagagem">
                  {baggage.map((row, rowIndex) => (
                    <React.Fragment key={row.title}>
                      <View className="flex-row items-start gap-xs">
                        <Icon name={row.icon} size={24} color={colors.text.subtle} />
                        <View className="flex-1 gap-xxs">
                          <Text className="font-sans text-paragraphMd text-fg-body">{row.title}</Text>
                          <Text className="font-sans text-paragraphMd text-fg-subtle">{row.description}</Text>
                        </View>
                      </View>
                      {rowIndex < baggage.length - 1 ? <Divider /> : null}
                    </React.Fragment>
                  ))}
                </OrderInfoCard>
              ) : null}
            </React.Fragment>
          ))}
        </View>
      ) : null}

      {paymentDetails || paymentMethod || travelers || importantInfo ? (
        <View className="gap-lg p-lg">
          {paymentDetails ? (
            <OrderInfoCard title="Detalhes do pagamento">
              {paymentDetails.map((row, index) => (
                <React.Fragment key={row.label}>
                  <View className="flex-row items-center justify-between">
                    <Text
                      className={`font-sans text-paragraphMd text-fg-body ${row.emphasized ? 'font-bold' : 'font-medium'}`}
                    >
                      {row.label}
                    </Text>
                    <Text
                      className={`font-sans text-paragraphMd text-fg-body ${row.emphasized ? 'font-bold' : 'font-medium'}`}
                    >
                      {row.value}
                    </Text>
                  </View>
                  {index < paymentDetails.length - 1 && row.dividerAfter !== false ? <Divider /> : null}
                </React.Fragment>
              ))}
            </OrderInfoCard>
          ) : null}

          {paymentMethod ? (
            <OrderInfoCard title="Forma de pagamento" trailing={paymentMethod.methodLabel}>
              {paymentMethod.rows.map((row) => (
                <View key={row.label} className="flex-row items-center justify-between">
                  <Text className="font-sans text-paragraphMd text-fg-body">{row.label}</Text>
                  <Text className="font-sans text-paragraphMd text-fg-body">{row.value}</Text>
                </View>
              ))}
            </OrderInfoCard>
          ) : null}

          {travelers ? (
            <OrderInfoCard title="Viajantes">
              {travelers.map((traveler, index) => (
                <React.Fragment key={`${traveler.role}-${index}`}>
                  <View className="gap-xxs">
                    <Text className="font-sans text-paragraphMd font-bold text-fg-body">{traveler.role}</Text>
                    <Text className="font-sans text-paragraphMd text-fg-body">{traveler.name}</Text>
                  </View>
                  {index < travelers.length - 1 ? <Divider /> : null}
                </React.Fragment>
              ))}
            </OrderInfoCard>
          ) : null}

          {importantInfo ? (
            <OrderInfoCard title="Informações importantes">
              <View className="gap-lg">
                {importantInfo.map((topic, topicIndex) => (
                  <View key={topicIndex} className="gap-md">
                    <Text className="font-sans text-paragraphMd font-bold text-fg-body">{topic.title}</Text>

                    {topic.flightPolicies?.map((policy) => (
                      <View key={policy.direction} className="gap-xs">
                        <Text className="font-sans text-paragraphMd font-bold text-fg-body">
                          {flightPolicyLabel[policy.direction]}
                        </Text>
                        <Text className="font-sans text-paragraphMd text-fg-subtle">{policy.route}</Text>

                        <View className="flex-row items-center gap-xs">
                          <Icon name="no-cancel" size={24} color={colors.feedback.danger} />
                          <Text className="font-sans text-paragraphMd text-fg-body">{policy.cancelPolicy}</Text>
                        </View>
                        <View className="flex-row items-center gap-xs">
                          <Icon name="fare-change" size={24} color={colors.feedback.success} />
                          <Text className="font-sans text-paragraphMd text-fg-body">{policy.farePolicy}</Text>
                        </View>

                        {policy.serviceFeeNote ? (
                          <Text className="font-sans text-paragraphMd text-fg-subtle">{policy.serviceFeeNote}</Text>
                        ) : null}
                      </View>
                    ))}

                    {topic.paragraphs?.map((paragraph, paragraphIndex) => (
                      <Text key={paragraphIndex} className="font-sans text-paragraphMd text-fg-subtle">
                        {paragraph}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </OrderInfoCard>
          ) : null}
        </View>
      ) : null}
    </ScrollView>

    <BottomNav active={active} onNavigate={onNavigate} />
  </View>
);
