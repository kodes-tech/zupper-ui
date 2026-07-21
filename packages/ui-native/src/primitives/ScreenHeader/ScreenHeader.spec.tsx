import { render, screen, fireEvent } from '@testing-library/react-native';
import { ScreenHeader } from './ScreenHeader';

describe('ScreenHeader', () => {
  it('renders the title', async () => {
    await render(<ScreenHeader title="Meu Perfil" />);
    expect(screen.getByText('Meu Perfil')).toBeOnTheScreen();
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<ScreenHeader title="X" onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders the back-only mode without a title', async () => {
    const onBack = jest.fn();
    await render(<ScreenHeader onBack={onBack} />);
    // sem título, mas a seta de voltar continua acessível e funcional.
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
