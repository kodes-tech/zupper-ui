import { render, screen, fireEvent } from '@testing-library/react-native';
import { NotInterestedSheet } from './NotInterestedSheet';

describe('NotInterestedSheet', () => {
  it('puts the destination in the "ver menos" option', async () => {
    await render(<NotInterestedSheet destination="Recife" />);
    expect(screen.getByText('Ver menos sobre Recife')).toBeOnTheScreen();
  });

  it('fires onUndo when "Desfazer" is pressed', async () => {
    const onUndo = jest.fn();
    await render(<NotInterestedSheet destination="Recife" onUndo={onUndo} />);
    await fireEvent.press(screen.getByText('Desfazer'));
    expect(onUndo).toHaveBeenCalled();
  });
});
