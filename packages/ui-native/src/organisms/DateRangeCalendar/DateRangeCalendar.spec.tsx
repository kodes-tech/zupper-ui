import { render, screen, fireEvent } from '@testing-library/react-native';
import { DateRangeCalendar } from './DateRangeCalendar';
import type { CalendarDay } from './DateRangeCalendar';

const weeks: CalendarDay[][] = [
  [null, null, null, { day: 1 }, { day: 2 }, { day: 3, state: 'start' }, { day: 4, state: 'in-range' }],
  [{ day: 5, state: 'end' }, { day: 6 }, { day: 7 }, { day: 8, state: 'disabled' }, null, null, null],
];

describe('DateRangeCalendar', () => {
  it('renders the month, year and week days', () => {
    render(<DateRangeCalendar yearLabel="2026" monthLabel="Julho, 2026" weeks={weeks} />);
    expect(screen.getByText('2026')).toBeOnTheScreen();
    expect(screen.getByText('Julho, 2026')).toBeOnTheScreen();
    expect(screen.getByText('Selecionar data')).toBeOnTheScreen();
  });

  it('fires onSelectDay for an enabled day and not for a disabled one', () => {
    const onSelectDay = jest.fn();
    render(
      <DateRangeCalendar yearLabel="2026" monthLabel="Julho, 2026" weeks={weeks} onSelectDay={onSelectDay} />,
    );
    fireEvent.press(screen.getByLabelText('Dia 3'));
    expect(onSelectDay).toHaveBeenCalledWith(3);
    fireEvent.press(screen.getByLabelText('Dia 8'));
    expect(onSelectDay).not.toHaveBeenCalledWith(8);
  });

  it('shows the nights summary only with both dates on a round trip', () => {
    const { rerender } = render(
      <DateRangeCalendar yearLabel="2026" monthLabel="Julho, 2026" weeks={weeks} />,
    );
    expect(screen.queryByText('10 diárias')).toBeNull();

    rerender(
      <DateRangeCalendar
        yearLabel="2026"
        monthLabel="Julho, 2026"
        weeks={weeks}
        departureValue="Sex, 10 Julho"
        returnValue="Seg, 20 Julho"
        nightsLabel="10 diárias"
      />,
    );
    expect(screen.getByText('10 diárias')).toBeOnTheScreen();
  });

  it('hides the return field when isOneWayOnly', () => {
    render(
      <DateRangeCalendar yearLabel="2026" monthLabel="Julho, 2026" weeks={weeks} isOneWayOnly />,
    );
    expect(screen.queryByText('Volta')).toBeNull();
  });

  it('fires onConfirm and onCancel', () => {
    const onConfirm = jest.fn();
    const onCancel = jest.fn();
    render(
      <DateRangeCalendar
        yearLabel="2026"
        monthLabel="Julho, 2026"
        weeks={weeks}
        onConfirm={onConfirm}
        onCancel={onCancel}
      />,
    );
    fireEvent.press(screen.getByText('Aplicar'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    fireEvent.press(screen.getByText('Cancelar'));
    expect(onCancel).toHaveBeenCalledTimes(1);
  });
});
