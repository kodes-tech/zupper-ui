import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { colors } from '@kodes-tech/tokens';
import { Icon } from '../../atoms/Icon';
import { Button } from '../../atoms/Button';
import { Divider } from '../../atoms/Divider';
import { InlineAlert } from '../../molecules/InlineAlert';

export type CheckoutThanksStatus = 'pending' | 'error';

export type CheckoutThanksPriceRow = {
  label: string;
  value: string;
  bold?: boolean;
};

export type CheckoutThanksProps = {
  /** "pending" (padrão) — pedido em aprovação/pagamento pendente. "error" — falha ao processar. */
  status?: CheckoutThanksStatus;
  /**
   * Mensagem de status já formatada, com o número do pedido embutido (ex.:
   * "Falta pouco! Agora só falta finalizar o pagamento do seu pedido #12345."
   * ou, em erro, "Infelizmente algo deu errado na reserva do seu pedido #12345.").
   */
  statusMessage: string;
  email: string;
  /** Muda o texto entre "já possui uma conta" / "ainda não possui uma conta". Só em status="pending". */
  emailExists?: boolean;
  /** "Acessar meus pedidos" (com conta) ou "Criar conta agora" (sem conta). Só em status="pending". */
  onPressAccount?: () => void;
  /** Só em status="pending". */
  onPressBackToHome?: () => void;
  /** "Revise seus dados de pagamento" — só em status="error". */
  onPressReviewPayment?: () => void;
  priceTitle?: string;
  priceRows: CheckoutThanksPriceRow[];
  paymentMethod: 'creditCard' | 'pix';
  /** Bandeira/banco do cartão (ex.: "Visa"). Só para paymentMethod="creditCard". */
  cardBrand?: string;
  /** Últimos 4 dígitos do cartão. Só para paymentMethod="creditCard". */
  cardLastDigits?: string;
  installmentCount?: number;
  hasFee?: boolean;
  /** Valor já formatado da 1ª parcela (ou parcela única). */
  installmentValue?: string;
  /** Valor já formatado das demais parcelas (quando installmentCount > 1). */
  extraInstallmentsValue?: string;
  /** Valor total já formatado, só para paymentMethod="pix". */
  pixValue?: string;
  /** URL/base64 do QR Code do PIX. Só para paymentMethod="pix". */
  pixQrCode?: React.ReactNode;
  onPressCopyPixCode?: () => void;
};

const PriceSummaryRow = ({ label, value, bold }: CheckoutThanksPriceRow) => (
  <View className="flex-row items-center justify-between">
    <Text className={`font-sans text-md ${bold ? 'font-bold' : 'font-medium'} text-fg-secondary`}>
      {label}
    </Text>
    <Text className={`font-sans text-md ${bold ? 'font-bold' : 'font-medium'} text-fg-secondary`}>
      {value}
    </Text>
  </View>
);

const DetailRow = ({ label, value, icon }: { label: string; value: string; icon?: React.ReactNode }) => (
  <View className="flex-row items-center justify-between">
    <Text className="font-sans text-md text-fg-subtle">{label}</Text>
    <View className="flex-row items-center gap-xs">
      {icon}
      <Text className="font-sans text-md text-fg-secondary">{value}</Text>
    </View>
  </View>
);

/** Selo numerado (círculo gradiente) de cada passo das instruções de PIX. */
const StepBadge = ({ step }: { step: number }) => (
  <LinearGradient
    colors={[...colors.gradient.button]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    style={{ width: 29, height: 29, borderRadius: 15, alignItems: 'center', justifyContent: 'center' }}
  >
    <Text className="font-sans text-caption font-bold text-fg-inverse">{step}</Text>
  </LinearGradient>
);

/** Aviso amarelo (prazo de pagamento, informações importantes) das instruções de PIX. */
const PixNotice = ({ children }: { children: React.ReactNode }) => (
  <View className="w-full flex-row gap-xs rounded-sm bg-feedback-warningSurface px-md py-sm">
    <Icon name="warning-triangle" size={20} color={colors.feedback.warning} />
    <View className="flex-1">{children}</View>
  </View>
);

/**
 * PixInstructions — as 4 etapas para pagar via PIX (abrir app do banco,
 * escanear/copiar o QR Code, finalizar no app) e os avisos de prazo/
 * processamento. Extraído do bloco "Infos PIX" (libs/checkout) do
 * zupper-app.
 */
const PixInstructions = ({
  qrCode,
  onPressCopyCode,
}: {
  qrCode?: React.ReactNode;
  onPressCopyCode?: () => void;
}) => (
  <View className="mt-lg gap-lg bg-surface-default px-xl py-lg">
    <Text className="font-sans text-md font-bold text-fg-secondary">Instruções para realizar o pagamento</Text>

    <View className="flex-row gap-md">
      <StepBadge step={1} />
      <Text className="flex-1 pt-xxs font-sans text-md text-fg-subtle">
        Acesse o APP ou o Internet Banking do seu Banco
      </Text>
    </View>
    <Divider />

    <View className="gap-md">
      <View className="flex-row items-center gap-md">
        <StepBadge step={2} />
        <Text className="font-sans text-md text-fg-subtle">Acesse o menu PIX</Text>
      </View>
      <View className="items-center gap-md">
        {qrCode ?? (
          <View className="h-[162px] w-[159px] items-center justify-center rounded-sm border border-border-subtle bg-surface-tag">
            <Text className="font-sans text-xs text-fg-subtle">QR Code</Text>
          </View>
        )}
        <Pressable accessibilityRole="button" onPress={onPressCopyCode}>
          <LinearGradient
            colors={[...colors.gradient.button]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 8,
              borderRadius: 40,
              paddingHorizontal: 20,
              paddingVertical: 8,
            }}
          >
            <Icon name="copy" size={24} color={colors.text.inverse} />
            <Text className="font-sans text-md font-bold text-fg-inverse">Copiar código</Text>
          </LinearGradient>
        </Pressable>
      </View>
    </View>
    <Divider />

    <View className="flex-row gap-md">
      <StepBadge step={3} />
      <Text className="flex-1 pt-xxs font-sans text-md text-fg-subtle">
        Abra o leitor de QR-Code no APP e escaneie o código informado ou copie o código e cole na função
        &quot;Copia e Cola&quot;
      </Text>
    </View>
    <Divider />

    <View className="flex-row gap-md">
      <StepBadge step={4} />
      <Text className="flex-1 pt-xxs font-sans text-md text-fg-subtle">
        Siga os passos no APP e finalize a transação
      </Text>
    </View>

    <PixNotice>
      <Text className="font-sans text-xs text-fg-secondary">
        Lembre-se que o pagamento deverá ser efetuado{' '}
        <Text className="font-bold">em até 3h</Text> depois da compra.
      </Text>
    </PixNotice>

    <PixNotice>
      <Text className="font-sans text-xs text-fg-secondary">
        <Text className="font-bold">Importante:</Text>
        {'\n\n'}• Este pagamento será processado por Paymee para favorecido Zupper;{'\n'}• Não será
        necessário enviar comprovante por e-mail, fique tranquilo(a): com o pagamento dentro do prazo
        estipulado, sua viagem será emitida.
      </Text>
    </PixNotice>
  </View>
);

/**
 * CheckoutThanks — confirmação pós-compra: pedido pendente ("Reserva
 * concluída", com ícone de relógio — a compra pode ainda estar em processo
 * de aprovação/pagamento pendente) ou erro ao processar ("Erro ao
 * processar", com ícone de X e o link "Revise seus dados de pagamento" no
 * lugar dos CTAs de conta). Ambos os estados mostram o resumo "Sua compra" e
 * o detalhe da forma de pagamento; no PIX, também as instruções de
 * pagamento (QR Code, copiar código, avisos de prazo). Extraído do
 * ThanksRoot + ThanksHeader + ThanksReservation + o bloco "Infos PIX"
 * (libs/checkout) e do PaymentMethodDetails (libs/customer-order) do
 * zupper-app. Apresentacional: dados por props, sem a lógica de
 * rastreamento/redux do app; o QR Code em si é responsabilidade do app
 * consumidor (slot `pixQrCode`).
 *
 * Fora do escopo (extensões específicas de produto no app real, preenchidas
 * via callback/renderer — não fazem sentido num mock genérico de design
 * system): alerta de múltiplas companhias, detalhe de viajantes/voo/bagagem
 * e políticas de alteração/cancelamento/nota fiscal (telas de revisão de
 * pedido completas, não da confirmação em si).
 */
export const CheckoutThanks = ({
  status = 'pending',
  statusMessage,
  email,
  emailExists = false,
  onPressAccount,
  onPressBackToHome,
  onPressReviewPayment,
  priceTitle = 'Sua compra',
  priceRows,
  paymentMethod,
  cardBrand,
  cardLastDigits,
  installmentCount = 1,
  hasFee = false,
  installmentValue,
  extraInstallmentsValue,
  pixValue,
  pixQrCode,
  onPressCopyPixCode,
}: CheckoutThanksProps): React.ReactElement => (
  <View className="flex-1 bg-surface-tag">
    <View className="bg-surface-default px-xl pb-lg pt-[40px]">
      <Text className="text-center font-sans text-lg font-bold text-fg-secondary">
        {status === 'error' ? 'Erro ao processar' : 'Reserva concluída'}
      </Text>
    </View>

    <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
      <View className="items-center gap-lg bg-surface-default px-xl py-xl">
        <Icon name={status === 'error' ? 'status-error' : 'status-pending'} size={60} />
        <Text className="text-center font-sans text-md font-bold text-fg-secondary">{statusMessage}</Text>
        <Text className="text-center font-sans text-md text-fg-secondary">
          Você poderá acompanhar o andamento através da sua conta Zupper.
        </Text>

        <Divider />

        {status === 'error' ? (
          <Pressable accessibilityRole="button" onPress={onPressReviewPayment}>
            <Text className="font-sans text-md font-medium text-fg-link underline">
              Revise seus dados de pagamento
            </Text>
          </Pressable>
        ) : (
          <>
            <InlineAlert
              message={`O email ${email} ${emailExists ? 'já possui uma conta' : 'ainda não possui uma conta'}`}
            />
            <View className="w-full gap-md">
              <Button
                label={emailExists ? 'Acessar meus pedidos' : 'Criar conta agora'}
                fullWidth
                onPress={onPressAccount}
              />
              <Button
                label="Voltar para tela inicial"
                variant="secondary"
                fullWidth
                onPress={onPressBackToHome}
              />
            </View>
          </>
        )}
      </View>

      <View className="mt-lg gap-md bg-surface-default px-xl py-lg">
        <Text className="font-sans text-cardTitle text-fg-secondary">{priceTitle}</Text>
        {priceRows.map((row) => (
          <PriceSummaryRow key={row.label} {...row} />
        ))}
      </View>

      <View className="mt-lg gap-md bg-surface-default px-xl py-lg">
        <View className="flex-row items-center justify-between">
          <Text className="font-sans text-md font-bold text-fg-secondary">Forma de pagamento</Text>
          <Text className="font-sans text-md text-fg-subtle">
            {paymentMethod === 'creditCard' ? 'Crédito' : 'PIX'}
          </Text>
        </View>

        {paymentMethod === 'creditCard' ? (
          <>
            <DetailRow
              label={`${cardBrand ?? ''} Final`}
              value={`**** **** **** ${cardLastDigits ?? ''}`}
              icon={<Icon name="card" size={16} color={colors.text.subtle} />}
            />
            <DetailRow
              label="Parcelamento"
              value={`${installmentCount}x ${hasFee ? 'c/ juros' : 's/ juros'}`}
            />
            <DetailRow
              label="Valor da parcela"
              value={
                installmentCount > 1 && extraInstallmentsValue
                  ? `1º ${installmentValue} + demais ${extraInstallmentsValue}`
                  : `${installmentValue}`
              }
            />
          </>
        ) : (
          <>
            <DetailRow label="Pagamento via PIX" value={`1x de ${pixValue}`} />
            <DetailRow label="Operadora" value="PIX" icon={<Icon name="pix" size={16} />} />
          </>
        )}
      </View>

      {paymentMethod === 'pix' ? (
        <PixInstructions qrCode={pixQrCode} onPressCopyCode={onPressCopyPixCode} />
      ) : null}
    </ScrollView>
  </View>
);
