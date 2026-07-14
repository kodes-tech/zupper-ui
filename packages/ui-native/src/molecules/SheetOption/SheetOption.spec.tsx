import { render, screen, fireEvent } from '@testing-library/react-native';
import { SheetOption } from './SheetOption';

describe('SheetOption', () => {
  it('renders the emoji and the label', async () => {
    await render(<SheetOption emoji="🔖" label="Salvar publicação" />);
    expect(screen.getByText('🔖')).toBeOnTheScreen();
    expect(screen.getByText('Salvar publicação')).toBeOnTheScreen();
  });

  it('fires onPress', async () => {
    const onPress = jest.fn();
    await render(<SheetOption label="Denunciar" destructive onPress={onPress} />);
    await fireEvent.press(screen.getByText('Denunciar'));
    expect(onPress).toHaveBeenCalled();
  });
});
