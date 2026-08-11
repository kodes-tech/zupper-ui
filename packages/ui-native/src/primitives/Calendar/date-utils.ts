/**
 * Aritmética de datas em ISO `YYYY-MM-DD`, sem dependência externa (o DS não
 * carrega date-fns/dayjs — ver ADR 0004).
 *
 * Toda conta usa os construtores/leitores **UTC** do `Date` (`Date.UTC`,
 * `getUTCDay`). É de propósito: `new Date('2026-05-24')` é lido como meia-noite
 * UTC e, num fuso negativo (Brasil, UTC-3), `getDate()` devolve 23 — o clássico
 * erro de um dia. Só entra número e só sai string; nenhum horário local encosta
 * na conta.
 *
 * Bônus do formato: strings ISO zero-padded comparam em ordem cronológica com
 * `<` e `>` direto, sem parse.
 */

/** Data no formato `YYYY-MM-DD` (ex.: `'2026-05-24'`). */
export type IsoDate = string;

/** Período de viagem. `end` fica `null` enquanto o usuário só escolheu a ida. */
export type DateRange = { start: IsoDate | null; end: IsoDate | null };

/** Mês do calendário. `month` é **1–12** (e não o índice 0–11 do `Date`). */
export type YearMonth = { year: number; month: number };

/** Célula da grade: um dia do mês, ou `null` no preenchimento antes/depois. */
export type CalendarCell = { day: number; iso: IsoDate } | null;

export const EMPTY_RANGE: DateRange = { start: null, end: null };

/** Rótulo do mês na grade — "MAI, 2026". */
export const MONTH_LABELS_SHORT = [
  'JAN',
  'FEV',
  'MAR',
  'ABR',
  'MAI',
  'JUN',
  'JUL',
  'AGO',
  'SET',
  'OUT',
  'NOV',
  'DEZ',
] as const;

/** Nome por extenso — só para o `accessibilityLabel` do dia. */
export const MONTH_LABELS_LONG = [
  'janeiro',
  'fevereiro',
  'março',
  'abril',
  'maio',
  'junho',
  'julho',
  'agosto',
  'setembro',
  'outubro',
  'novembro',
  'dezembro',
] as const;

/** Cabeçalho da semana, começando na **segunda** (S T Q Q S S D, como no Figma). */
export const WEEKDAY_INITIALS = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'] as const;

const pad2 = (value: number): string => String(value).padStart(2, '0');

export const toIso = (year: number, month: number, day: number): IsoDate =>
  `${year}-${pad2(month)}-${pad2(day)}`;

export const yearOf = (iso: IsoDate): number => Number(iso.slice(0, 4));

export const monthOf = (iso: IsoDate): number => Number(iso.slice(5, 7));

/** Dia 0 do mês seguinte = último dia deste mês. */
export const daysInMonth = (year: number, month: number): number =>
  new Date(Date.UTC(year, month, 0)).getUTCDate();

/** Dia da semana com a semana começando na segunda: 0 = seg … 6 = dom. */
export const weekdayIndex = (year: number, month: number, day: number): number =>
  (new Date(Date.UTC(year, month - 1, day)).getUTCDay() + 6) % 7;

/**
 * Meses cobertos pela janela `[min, max]`, inclusive nas duas pontas. Emite ao
 * menos um mês mesmo se a janela vier invertida — melhor uma grade de um mês do
 * que uma tela em branco.
 */
export const monthsBetween = (min: IsoDate, max: IsoDate): YearMonth[] => {
  const last = { year: yearOf(max), month: monthOf(max) };
  const months: YearMonth[] = [];
  let cursor = { year: yearOf(min), month: monthOf(min) };

  do {
    months.push(cursor);
    cursor =
      cursor.month === 12
        ? { year: cursor.year + 1, month: 1 }
        : { year: cursor.year, month: cursor.month + 1 };
  } while (cursor.year < last.year || (cursor.year === last.year && cursor.month <= last.month));

  return months;
};

/** Grade do mês em semanas de 7 posições, alinhada à segunda-feira. */
export const buildWeeks = (year: number, month: number): CalendarCell[][] => {
  const total = daysInMonth(year, month);
  const weeks: CalendarCell[][] = [];
  let week: CalendarCell[] = new Array<CalendarCell>(weekdayIndex(year, month, 1)).fill(null);

  for (let day = 1; day <= total; day += 1) {
    week.push({ day, iso: toIso(year, month, day) });
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  if (week.length > 0) {
    weeks.push([...week, ...new Array<CalendarCell>(7 - week.length).fill(null)]);
  }

  return weeks;
};

/**
 * Próximo estado do período depois de tocar em `tapped`. Regra vinda da anotação
 * de dev do Figma (nó `3013:7220`), não do primeiro toque ingênuo:
 *
 * - sem nada escolhido → o toque vira a **ida**;
 * - com a ida posta e uma data **anterior** tocada → fecha o período trocando os
 *   extremos (a nova vira ida, a antiga vira volta) em vez de descartar o toque;
 * - com o período já completo → qualquer toque **reinicia** pela ida.
 *
 * Tocar de novo no mesmo dia da ida fecha um período de um dia só (bate-volta) —
 * cai naturalmente no último caso, sem ramo especial.
 */
export const nextRange = (current: DateRange, tapped: IsoDate): DateRange => {
  const { start, end } = current;

  if (start === null || end !== null) return { start: tapped, end: null };
  if (tapped < start) return { start: tapped, end: start };
  return { start, end: tapped };
};
