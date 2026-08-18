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

  it('renders a trailing icon', async () => {
    await render(<SheetOption label="Excluir publicação" icon="trash" />);
    expect(screen.getByText('Excluir publicação')).toBeOnTheScreen();
  });

  // KSA-446 — ver interaction-states.md; a emissão do CSS é travada no tailwind.spec dos tokens.
  it('pede o retorno de toque (fundo sutil) na linha', async () => {
    await render(<SheetOption emoji="🔖" label="Salvar publicação" />);
    expect(screen.getByLabelText('Salvar publicação').props.className).toContain('active:bg-state-pressedSubtle');
  });

});
