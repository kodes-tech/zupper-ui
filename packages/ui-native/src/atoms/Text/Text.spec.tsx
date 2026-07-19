import { render, screen } from '@testing-library/react-native';
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

  it('exposes the testID', async () => {
    await render(<Text testID="greeting">Olá</Text>);
    expect(screen.getByTestId('greeting')).toBeOnTheScreen();
  });
});
