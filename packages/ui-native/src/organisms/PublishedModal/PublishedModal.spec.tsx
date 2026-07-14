import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { PublishedModal } from './PublishedModal';

describe('PublishedModal', () => {
  it('titles each content type with the right gender', async () => {
    const { rerender } = await render(<PublishedModal type="foto" />);
    expect(screen.getByText('Foto publicada')).toBeOnTheScreen();
    await rerender(<PublishedModal type="dica" />);
    expect(screen.getByText('Dica publicada')).toBeOnTheScreen();
    await rerender(<PublishedModal type="roteiro" />);
    expect(screen.getByText('Roteiro publicado')).toBeOnTheScreen();
  });

  it('fires onDismiss when the overlay is pressed', async () => {
    const onDismiss = jest.fn();
    await render(<PublishedModal type="foto" onDismiss={onDismiss} />);
    await fireEvent.press(screen.getByLabelText('Fechar'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('auto-dismisses after autoDismissMs', async () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    await render(<PublishedModal type="foto" onDismiss={onDismiss} autoDismissMs={3000} />);
    expect(onDismiss).not.toHaveBeenCalled();
    await act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('does not auto-dismiss when autoDismissMs is omitted', async () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    await render(<PublishedModal type="foto" onDismiss={onDismiss} />);
    await act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(onDismiss).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
