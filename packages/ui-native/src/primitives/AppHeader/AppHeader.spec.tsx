import { render, screen, fireEvent } from '@testing-library/react-native';
import { AppHeader } from './AppHeader';

describe('AppHeader', () => {
  it('renders the title', async () => {
    await render(<AppHeader title="Meu Perfil" />);
    expect(screen.getByText('Meu Perfil')).toBeOnTheScreen();
  });

  it('fires onBack', async () => {
    const onBack = jest.fn();
    await render(<AppHeader title="X" onBack={onBack} />);
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });

  it('renders the back-only mode without a title', async () => {
    const onBack = jest.fn();
    await render(<AppHeader onBack={onBack} />);
    // sem título, mas a seta de voltar continua acessível e funcional.
    await fireEvent.press(screen.getByLabelText('Voltar'));
    expect(onBack).toHaveBeenCalledTimes(1);
  });
});
