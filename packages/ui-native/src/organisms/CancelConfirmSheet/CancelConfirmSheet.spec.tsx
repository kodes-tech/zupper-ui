import { render, screen, fireEvent } from '@testing-library/react-native';
import { CancelConfirmSheet } from './CancelConfirmSheet';

describe('CancelConfirmSheet', () => {
  it('renders the confirmation copy', async () => {
    await render(<CancelConfirmSheet />);
    expect(screen.getByText('Cancelamento de pedido')).toBeOnTheScreen();
    expect(screen.getByText('Atenção!')).toBeOnTheScreen();
    expect(
      screen.getByText('Você tem certeza que deseja solicitar o cancelamento deste pedido?'),
    ).toBeOnTheScreen();
  });

  it('fires onConfirm and onGoBack', async () => {
    const onConfirm = jest.fn();
    const onGoBack = jest.fn();
    await render(<CancelConfirmSheet onConfirm={onConfirm} onGoBack={onGoBack} />);
    await fireEvent.press(screen.getByText('Sim, eu quero cancelar'));
    await fireEvent.press(screen.getByText('Voltar para o pedido'));
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(onGoBack).toHaveBeenCalledTimes(1);
  });
});
