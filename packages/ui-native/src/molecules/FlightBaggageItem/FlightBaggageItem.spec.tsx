import { render, screen } from '@testing-library/react-native';
import { FlightBaggageItem } from './FlightBaggageItem';

describe('FlightBaggageItem', () => {
  it('renders the title and subtitle', async () => {
    await render(
      <FlightBaggageItem
        icon="baggage-carryon"
        title="Inclui bagagem de mão"
        subtitle="Tamanho limitado a caber no compartimento superior do avião. Até 10kg."
        included
      />,
    );
    expect(screen.getByText('Inclui bagagem de mão')).toBeOnTheScreen();
    expect(
      screen.getByText('Tamanho limitado a caber no compartimento superior do avião. Até 10kg.'),
    ).toBeOnTheScreen();
  });
});
