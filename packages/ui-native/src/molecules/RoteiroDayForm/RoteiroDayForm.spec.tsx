import { render, screen, fireEvent } from '@testing-library/react-native';
import { RoteiroDayForm } from './RoteiroDayForm';

const periods = [
  { id: 'manha', label: 'Manhã' },
  { id: 'tarde', label: 'Tarde' },
  { id: 'noite', label: 'Noite' },
];

describe('RoteiroDayForm', () => {
  const base = { day: 'Dia 1', periods, selectedPeriodId: 'manha' };

  it('renders the day label and the field labels', () => {
    render(<RoteiroDayForm {...base} />);
    expect(screen.getByText('Dia 1')).toBeOnTheScreen();
    expect(screen.getByText('Título do dia')).toBeOnTheScreen();
    expect(screen.getByText('Período')).toBeOnTheScreen();
    expect(screen.getByText('Dica breve')).toBeOnTheScreen();
  });

  it('fires onSelectPeriod when a period chip is tapped', () => {
    const onSelectPeriod = jest.fn();
    render(<RoteiroDayForm {...base} onSelectPeriod={onSelectPeriod} />);
    fireEvent.press(screen.getByText('Tarde'));
    expect(onSelectPeriod).toHaveBeenCalledWith('tarde');
  });

  it('fires onNext from the "Próximo" action', () => {
    const onNext = jest.fn();
    render(<RoteiroDayForm {...base} canGoNext onNext={onNext} />);
    fireEvent.press(screen.getByText('Próximo'));
    expect(onNext).toHaveBeenCalledTimes(1);
  });
});
