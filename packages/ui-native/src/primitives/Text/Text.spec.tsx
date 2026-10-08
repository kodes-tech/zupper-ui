import { fireEvent, render, screen } from '@testing-library/react-native';
import { Text } from './Text';

describe('Text', () => {
  it('renders its children', async () => {
    await render(<Text>Destinos em alta</Text>);
    expect(screen.getByText('Destinos em alta')).toBeOnTheScreen();
  });

  it('accepts a variant and a color', async () => {
    await render(
      <Text variant="sectionTitle" color="link">
        Ver todos
      </Text>,
    );
    expect(screen.getByText('Ver todos')).toBeOnTheScreen();
  });

  it('forwards numberOfLines to the underlying text', async () => {
    await render(<Text numberOfLines={1}>Um texto bem longo que deve truncar</Text>);
    expect(screen.getByText('Um texto bem longo que deve truncar').props.numberOfLines).toBe(1);
  });

  it('forwards adjustsFontSizeToFit and minimumFontScale to the underlying text', async () => {
    await render(
      <Text numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
        Ainda não há publicações por aqui
      </Text>,
    );
    const text = screen.getByText('Ainda não há publicações por aqui');
    expect(text.props.adjustsFontSizeToFit).toBe(true);
    expect(text.props.minimumFontScale).toBe(0.8);
  });

  it('leaves the font size alone when the fit props are omitted', async () => {
    await render(<Text numberOfLines={1}>Destinos em alta</Text>);
    const text = screen.getByText('Destinos em alta');
    expect(text.props.adjustsFontSizeToFit).toBeUndefined();
    expect(text.props.minimumFontScale).toBeUndefined();
  });

  it('exposes the testID', async () => {
    await render(<Text testID="greeting">Olá</Text>);
    expect(screen.getByTestId('greeting')).toBeOnTheScreen();
  });

  it('fires onPress and exposes the link role when tappable', async () => {
    const onPress = jest.fn();
    await render(
      <Text onPress={onPress} accessibilityLabel="Termos de Aceite">
        Termos de Aceite
      </Text>,
    );
    const link = screen.getByLabelText('Termos de Aceite');
    expect(link.props.accessibilityRole).toBe('link');
    await fireEvent.press(link);
    expect(onPress).toHaveBeenCalledTimes(1);
  });
});
