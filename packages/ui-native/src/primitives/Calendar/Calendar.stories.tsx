import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { action } from '@storybook/addon-actions';
import { AppHeader } from '../AppHeader';
import { Button } from '../Button';
import { CalendarYearSelect } from '../CalendarYearSelect';
import { ClearableField } from '../ClearableField';
import { Calendar } from './Calendar';
import type { DateRange } from './date-utils';

const MIN = '2026-05-15';
const MAX = '2027-04-30';

export default {
  title: 'Primitives/Calendar',
  component: Calendar,
  args: { onChange: action('onChange'), onYearChange: action('onYearChange') },
  // Altura fixa: o Calendar rola por dentro, então precisa de um pai com altura.
  decorators: [
    (Story: React.ComponentType) => (
      <View style={{ width: 390, height: 640, backgroundColor: '#F5F5F5' }}>
        <Story />
      </View>
    ),
  ],
};

/** Ida e Volta — período já fechado, como no Figma (24 → 26 de maio). */
export const Periodo = {
  args: {
    mode: 'range' as const,
    value: { start: '2026-05-24', end: '2026-05-26' },
    minDate: MIN,
    maxDate: MAX,
  },
};

/** Período pela metade: só a ida escolhida, esperando a volta. */
export const PeriodoIncompleto = {
  args: {
    mode: 'range' as const,
    value: { start: '2026-05-24', end: null },
    minDate: MIN,
    maxDate: MAX,
  },
};

/** Só ida / trecho de Multidestinos — uma data e pronto. */
export const DataUnica = {
  args: { value: '2026-05-24', minDate: MIN, maxDate: MAX },
};

/** Nada escolhido — dias antes de `minDate` saem desabilitados. */
export const Vazio = {
  args: { mode: 'range' as const, value: { start: null, end: null }, minDate: MIN, maxDate: MAX },
};

/**
 * Casca controlada — o `Calendar` não guarda seleção, então a story precisa
 * segurar o estado pra dar pra brincar com a regra de seleção no preview.
 */
const CalendarControlado = (): React.ReactElement => {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });
  return (
    <Calendar
      mode="range"
      value={value}
      minDate={MIN}
      maxDate={MAX}
      onChange={(next) => {
        action('onChange')(next);
        setValue(next);
      }}
    />
  );
};

/** Interativo: mostra a regra de seleção do Figma valendo de verdade. */
export const Interativo = { render: () => <CalendarControlado /> };

// --- Daqui pra baixo: só bancada de comparação com o Figma ---------------------
//
// A tela "Selecionar data" NÃO é entregável do DS (ADR 0009 — o package não tem
// `screens/`); ela é composição do app, no KSA-431. Montamos ela aqui só para
// conferir os primitivos no enquadramento real do design.
//
// Por isso os dois helpers abaixo moram na story, e não num componente: formatar
// data em pt-BR e contar os dias da viagem é regra do **app**. O DS recebe a
// string já pronta.

const DIAS_SEMANA = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
const MESES = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro',
];

/** '2026-05-24' → 'Qua, 24 Maio' (formato do Figma). */
const formatarData = (iso: string | null): string | null => {
  if (!iso) return null;
  const [ano, mes, dia] = iso.split('-').map(Number);
  const data = new Date(Date.UTC(ano, mes - 1, dia));
  return `${DIAS_SEMANA[data.getUTCDay()]}, ${dia} ${MESES[mes - 1]}`;
};

/** Dias da viagem, contando as duas pontas: 24 → 26 são 3 dias. */
const contarDias = ({ start, end }: DateRange): number | null => {
  if (!start || !end) return null;
  const dia = 24 * 60 * 60 * 1000;
  return Math.round((Date.parse(`${end}T00:00:00Z`) - Date.parse(`${start}T00:00:00Z`)) / dia) + 1;
};

const TelaSelecionarData = (): React.ReactElement => {
  const [periodo, setPeriodo] = useState<DateRange>({ start: '2026-05-24', end: '2026-05-26' });
  const [ano, setAno] = useState(2026);
  const [anoAberto, setAnoAberto] = useState(false);

  const dias = contarDias(periodo);

  return (
    <View className="flex-1">
      <AppHeader
        title="Selecionar data"
        onBack={action('onBack')}
        right={
          <CalendarYearSelect
            value={ano}
            years={[2026, 2027]}
            open={anoAberto}
            onToggle={() => setAnoAberto((aberto) => !aberto)}
            onSelect={(proximoAno) => {
              action('onSelect')(proximoAno);
              setAno(proximoAno);
              setAnoAberto(false);
            }}
          />
        }
      />

      <Calendar
        mode="range"
        value={periodo}
        minDate={MIN}
        maxDate={MAX}
        year={ano}
        onYearChange={setAno}
        onChange={(proximo) => {
          action('onChange')(proximo);
          setPeriodo(proximo);
        }}
      />

      {/* Rodapé: composição do app (KSA-431), montado aqui só pra comparação. */}
      <View className="w-full gap-xl border-t border-border-default bg-surface-default px-xl py-xxl">
        <Text className="w-full font-sans text-bodyMd text-brand-strong">
          {dias ? `Viagem: ${dias} dias` : 'Selecione as datas da viagem'}
        </Text>

        <View className="w-full flex-row gap-xl">
          <ClearableField
            label="Ida"
            value={formatarData(periodo.start)}
            placeholder="Escolha a ida"
            onPress={action('pressIda')}
            onClear={() => setPeriodo({ start: null, end: null })}
          />
          <ClearableField
            label="Volta"
            value={formatarData(periodo.end)}
            placeholder="Escolha a volta"
            onPress={action('pressVolta')}
            onClear={() => setPeriodo({ start: periodo.start, end: null })}
          />
        </View>

        <Button label="Aplicar" variant="primary" fullWidth onPress={action('aplicar')} />
      </View>
    </View>
  );
};

/**
 * Tela inteira, do jeito que o Figma enquadra — `AppHeader` + dropdown de ano +
 * grade + rodapé. É a story de comparação visual com o design.
 *
 * ⚠️ Bancada, não entregável: o rodapé é composição do app (KSA-431). O que o DS
 * publica aqui são os primitivos soltos — `Calendar`, `CalendarYearSelect` e
 * `ClearableField`.
 */
export const TelaCompleta = { render: () => <TelaSelecionarData /> };
