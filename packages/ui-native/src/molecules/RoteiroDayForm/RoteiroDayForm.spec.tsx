import { render, screen, fireEvent } from '@testing-library/react-native';
import { RoteiroDayForm } from './RoteiroDayForm';

const periods = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
];

describe('RoteiroDayForm', () => {
  const base = { day: 'Dia 1', periods, selectedPeriodId: 'manha' };

  it('renders the day label and the field labels', async () => {
    await render(<RoteiroDayForm {...base} />);
    expect(screen.getByText('Dia 1')).toBeOnTheScreen();
    expect(screen.getByText('Título do dia')).toBeOnTheScreen();
    expect(screen.getByText('Período')).toBeOnTheScreen();
    expect(screen.getByText('Dica breve')).toBeOnTheScreen();
  });

  it('fires onSelectPeriod when a period chip is tapped', async () => {
    const onSelectPeriod = jest.fn();
    await render(<RoteiroDayForm {...base} onSelectPeriod={onSelectPeriod} />);
    await fireEvent.press(screen.getByText('Tarde'));
    expect(onSelectPeriod).toHaveBeenCalledWith('tarde');
  });

  it('fires onNext from the "Próximo" action', async () => {
    const onNext = jest.fn();
    await render(<RoteiroDayForm {...base} canGoNext onNext={onNext} />);
    await fireEvent.press(screen.getByText('Próximo'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
