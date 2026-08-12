import React, { useState } from 'react';
import { FlatList } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { Calendar } from './Calendar';
import type { DateRange, IsoDate } from './date-utils';

// Janela fixa: maio/2026 começa numa sexta e junho/2026 numa segunda, então os
// dois casos de alinhamento da grade ficam cobertos sem depender do relógio.
const MIN = '2026-05-01';
const MAX = '2026-07-31';

const day = (label: string) => screen.getByLabelText(label);

/** Casca controlada — o Calendar não guarda seleção, quem guarda é o app. */
const ControlledRange = ({
  onChange,
  minDate = MIN,
}: {
  onChange?: (value: DateRange) => void;
  minDate?: IsoDate;
}) => {
  const [value, setValue] = useState<DateRange>({ start: null, end: null });
  return (
    <Calendar
      mode="range"
      value={value}
      minDate={minDate}
      maxDate={MAX}
      onChange={(next) => {
        setValue(next);
        onChange?.(next);
      }}
    />
  );
};

describe('Calendar', () => {
  it('renders the months in the window with the week starting on Monday', async () => {
    await render(<Calendar minDate={MIN} maxDate="2026-06-30" />);

    expect(screen.getByText('MAI, 2026')).toBeOnTheScreen();
    expect(day('1 de maio de 2026')).toBeOnTheScreen();
    expect(day('31 de maio de 2026')).toBeOnTheScreen();
    // 7 iniciais no cabeçalho: S T Q Q S S D.
    expect(screen.getAllByText('Q')).toHaveLength(2);
  });

  // [AC-1]
  it('closes the range and marks the whole interval when tapping 24 then 26', async () => {
    const onChange = jest.fn();
    await render(<ControlledRange onChange={onChange} />);

    await fireEvent.press(day('24 de maio de 2026'));
    await fireEvent.press(day('26 de maio de 2026'));

    expect(onChange).toHaveBeenLastCalledWith({ start: '2026-05-24', end: '2026-05-26' });
    // O miolo entra na seleção junto com os extremos…
    expect(day('24 de maio de 2026')).toBeSelected();
    expect(day('25 de maio de 2026')).toBeSelected();
    expect(day('26 de maio de 2026')).toBeSelected();
    // …e os vizinhos de fora ficam de fora.
    expect(day('23 de maio de 2026')).not.toBeSelected();
    expect(day('27 de maio de 2026')).not.toBeSelected();
  });

  // [AC-2] — regra da anotação de dev do Figma (nó 3013:7220): tocar antes da ida
  // FECHA o período trocando os extremos, em vez de reiniciar.
  it('swaps the ends into a closed range when tapping before the start', async () => {
    const onChange = jest.fn();
    await render(<ControlledRange onChange={onChange} />);

    await fireEvent.press(day('24 de maio de 2026'));
    await fireEvent.press(day('22 de maio de 2026'));

    expect(onChange).toHaveBeenLastCalledWith({ start: '2026-05-22', end: '2026-05-24' });
    expect(day('23 de maio de 2026')).toBeSelected();
  });

  it('restarts from the start date when the range is already closed', async () => {
    const onChange = jest.fn();
    await render(<ControlledRange onChange={onChange} />);

    await fireEvent.press(day('22 de maio de 2026'));
    await fireEvent.press(day('24 de maio de 2026'));
    await fireEvent.press(day('28 de maio de 2026'));

    expect(onChange).toHaveBeenLastCalledWith({ start: '2026-05-28', end: null });
    expect(day('23 de maio de 2026')).not.toBeSelected();
  });

  // [AC-3]
  it('selects a single day in single mode', async () => {
    const onChange = jest.fn();
    await render(<Calendar value="2026-05-24" minDate={MIN} maxDate={MAX} onChange={onChange} />);

    expect(day('24 de maio de 2026')).toBeSelected();
    expect(day('25 de maio de 2026')).not.toBeSelected();

    await fireEvent.press(day('26 de maio de 2026'));
    expect(onChange).toHaveBeenCalledWith('2026-05-26');
  });

  // [AC-4]
  it('disables days outside the window and ignores taps on them', async () => {
    const onChange = jest.fn();
    await render(<ControlledRange onChange={onChange} minDate="2026-05-15" />);

    expect(day('14 de maio de 2026')).toBeDisabled();
    expect(day('15 de maio de 2026')).toBeEnabled();
    expect(day('31 de julho de 2026')).toBeEnabled();

    await fireEvent.press(day('14 de maio de 2026'));
    expect(onChange).not.toHaveBeenCalled();
  });

  // [AC-5]
  it('scrolls to the first month of the year picked in the dropdown', async () => {
    const scrollToIndex = jest.spyOn(FlatList.prototype, 'scrollToIndex').mockImplementation();

    // Janela nov/2026 → fev/2027: o 1º mês de 2027 é janeiro, no índice 2.
    const { rerender } = await render(
      <Calendar minDate="2026-11-01" maxDate="2027-02-28" year={2026} />,
    );
    scrollToIndex.mockClear();

    await rerender(<Calendar minDate="2026-11-01" maxDate="2027-02-28" year={2027} />);

    expect(scrollToIndex).toHaveBeenCalledWith(expect.objectContaining({ index: 2 }));
    scrollToIndex.mockRestore();
  });

  /**
   * Fecha o furo apontado no review: o `paddingTop` da lista faz parte do conteúdo
   * rolável, então o topo do 1º mês não está em 0. Os offsets precisam incluí-lo,
   * senão a detecção do ano (e o `scrollToIndex`) fica defasada nesse tanto.
   *
   * Janela nov/2026 → fev/2027. Alturas calculadas pela mesma geometria do
   * componente: nov/2026 começa no domingo → 6 semanas → 265dp; dez/2026 começa na
   * terça → 5 semanas → 232dp. Com o padding de 16, jan/2027 começa em 513.
   */
  it('reports the visible year from offsets that include the list padding', async () => {
    const onYearChange = jest.fn();
    await render(
      <Calendar
        minDate="2026-11-01"
        maxDate="2027-02-28"
        year={2026}
        onYearChange={onYearChange}
      />,
    );

    const rolarPara = async (y: number): Promise<void> => {
      await fireEvent.scroll(screen.getByTestId('calendar-months'), {
        nativeEvent: {
          contentOffset: { x: 0, y },
          contentSize: { width: 390, height: 2000 },
          layoutMeasurement: { width: 390, height: 600 },
        },
      });
    };

    // 1dp antes do topo de janeiro: ainda é dezembro/2026.
    await rolarPara(512);
    expect(onYearChange).not.toHaveBeenCalled();

    // Exatamente o topo de janeiro/2027.
    await rolarPara(513);
    expect(onYearChange).toHaveBeenCalledWith(2027);
  });

  it('falls back to the first available month when the year starts mid-window', async () => {
    const scrollToIndex = jest.spyOn(FlatList.prototype, 'scrollToIndex').mockImplementation();

    // Janela começa em maio/2026 — não existe janeiro/2026 pra rolar.
    const { rerender } = await render(<Calendar minDate={MIN} maxDate="2027-01-31" year={2027} />);
    scrollToIndex.mockClear();

    await rerender(<Calendar minDate={MIN} maxDate="2027-01-31" year={2026} />);

    expect(scrollToIndex).toHaveBeenCalledWith(expect.objectContaining({ index: 0 }));
    scrollToIndex.mockRestore();
  });
});
