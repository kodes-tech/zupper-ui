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

  // react-native-svg serializa a cor num payload numérico (RGBA); as constantes
  // abaixo são o teal (#008C99) e o cinza neutro (#2E2E2E) da marca já em ARGB.
  const TEAL_PAYLOAD = 4278226073;
  const NEUTRAL_PAYLOAD = 4281216558;

  it('highlights the Conta icon in teal when active', async () => {
    const { toJSON } = await render(<BottomNav active="conta" />);
    expect(JSON.stringify(toJSON())).toContain(String(TEAL_PAYLOAD));
  });

  it('keeps the Conta icon neutral when not active', async () => {
    const { toJSON } = await render(<BottomNav />);
    const tree = JSON.stringify(toJSON());
    expect(tree).not.toContain(String(TEAL_PAYLOAD));
    expect(tree).toContain(String(NEUTRAL_PAYLOAD));
  });
});
