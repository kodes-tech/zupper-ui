import { render, screen, fireEvent } from '@testing-library/react-native';
import { NotInterestedSheet } from './NotInterestedSheet';

describe('NotInterestedSheet', () => {
  it('puts the destination in the "ver menos" option', () => {
    render(<NotInterestedSheet destination="Recife" />);
    expect(screen.getByText('Ver menos sobre Recife')).toBeOnTheScreen();
  });

  it('fires onUndo when "Desfazer" is pressed', () => {
    const onUndo = jest.fn();
    render(<NotInterestedSheet destination="Recife" onUndo={onUndo} />);
    fireEvent.press(screen.getByText('Desfazer'));
    expect(onUndo).toHaveBeenCalled();
  });
});
