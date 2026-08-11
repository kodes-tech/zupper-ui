import { fireEvent, render, screen } from '@testing-library/react-native';
import { CalendarYearSelect } from './CalendarYearSelect';

const YEARS = [2026, 2027, 2028];

describe('CalendarYearSelect', () => {
  it('renders the current year on the trigger', async () => {
    await render(<CalendarYearSelect value={2026} years={YEARS} />);
    expect(screen.getByLabelText('Ano: 2026')).toBeOnTheScreen();
  });

  it('hides the year list while closed', async () => {
    await render(<CalendarYearSelect value={2026} years={YEARS} />);
    expect(screen.queryByLabelText('Selecionar 2027')).toBeNull();
  });

  it('fires onToggle when the trigger is pressed', async () => {
    const onToggle = jest.fn();
    await render(<CalendarYearSelect value={2026} years={YEARS} onToggle={onToggle} />);

    await fireEvent.press(screen.getByLabelText('Ano: 2026'));
    expect(onToggle).toHaveBeenCalledTimes(1);
  });

  it('lists every year when open and marks the current one', async () => {
    await render(<CalendarYearSelect value={2027} years={YEARS} open />);

    expect(screen.getByLabelText('Selecionar 2026')).toBeOnTheScreen();
    expect(screen.getByLabelText('Selecionar 2028')).toBeOnTheScreen();
    expect(screen.getByLabelText('Selecionar 2027')).toBeSelected();
  });

  it('fires onSelect with the picked year', async () => {
    const onSelect = jest.fn();
    await render(<CalendarYearSelect value={2026} years={YEARS} open onSelect={onSelect} />);

    await fireEvent.press(screen.getByLabelText('Selecionar 2028'));
    expect(onSelect).toHaveBeenCalledWith(2028);
  });
});
