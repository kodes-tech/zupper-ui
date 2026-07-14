import { render, screen, fireEvent } from '@testing-library/react-native';
import { BottomNav } from './BottomNav';

describe('BottomNav', () => {
  it('renders the four items', async () => {
    await render(<BottomNav />);
    ['Início', 'Reservar', 'Pedidos', 'Conta'].forEach((label) => {
      expect(screen.getByText(label)).toBeOnTheScreen();
    });
  });

  it('fires onNavigate with the item key', async () => {
    const onNavigate = jest.fn();
    await render(<BottomNav onNavigate={onNavigate} />);
    await fireEvent.press(screen.getByText('Conta'));
    expect(onNavigate).toHaveBeenCalledWith('conta');
  });
});
