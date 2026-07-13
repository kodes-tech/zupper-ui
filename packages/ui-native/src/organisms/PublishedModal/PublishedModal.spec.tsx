import { render, screen, fireEvent, act } from '@testing-library/react-native';
import { PublishedModal } from './PublishedModal';

describe('PublishedModal', () => {
  it('titles each content type with the right gender', () => {
    const { rerender } = render(<PublishedModal type="foto" />);
    expect(screen.getByText('Foto publicada')).toBeOnTheScreen();
    rerender(<PublishedModal type="dica" />);
    expect(screen.getByText('Dica publicada')).toBeOnTheScreen();
    rerender(<PublishedModal type="roteiro" />);
    expect(screen.getByText('Roteiro publicado')).toBeOnTheScreen();
  });

  it('fires onDismiss when the overlay is pressed', () => {
    const onDismiss = jest.fn();
    render(<PublishedModal type="foto" onDismiss={onDismiss} />);
    fireEvent.press(screen.getByLabelText('Fechar'));
    expect(onDismiss).toHaveBeenCalled();
  });

  it('auto-dismisses after autoDismissMs', () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    render(<PublishedModal type="foto" onDismiss={onDismiss} autoDismissMs={3000} />);
    expect(onDismiss).not.toHaveBeenCalled();
    act(() => {
      jest.advanceTimersByTime(3000);
    });
    expect(onDismiss).toHaveBeenCalledTimes(1);
    jest.useRealTimers();
  });

  it('does not auto-dismiss when autoDismissMs is omitted', () => {
    jest.useFakeTimers();
    const onDismiss = jest.fn();
    render(<PublishedModal type="foto" onDismiss={onDismiss} />);
    act(() => {
      jest.advanceTimersByTime(10000);
    });
    expect(onDismiss).not.toHaveBeenCalled();
    jest.useRealTimers();
  });
});
