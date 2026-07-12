import { render, screen, fireEvent } from '@testing-library/react-native';
import { ScreenHeader } from './ScreenHeader';

describe('ScreenHeader', () => {
  it('renders the title', () => {
    render(<ScreenHeader title="Meu Perfil" />);
    expect(screen.getByText('Meu Perfil')).toBeOnTheScreen();
  });

  it('fires onBack', () => {
    const onBack = jest.fn();
    render(<ScreenHeader title="X" onBack={onBack} />);
    fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
