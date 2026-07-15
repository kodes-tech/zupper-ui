import { render, screen } from '@testing-library/react-native';
import { BaggageInfo } from './BaggageInfo';

const items = [
  {
    icon: 'baggage-backpack' as const,
    label: 'Inclui uma mochila ou bolsa',
    description: 'Tamanho limitado a caber abaixo do assento dianteiro.',
    included: true,
  },
  {
    icon: 'baggage-checked' as const,
    label: 'Não inclui bagagem para despachar',
    description: 'É possível incluir bagagem despachada alterando a tarifa.',
    included: false,
  },
];

describe('BaggageInfo', () => {
  it('renders the title and items', () => {
    render(<BaggageInfo items={items} />);
    expect(screen.getByText('Bagagem')).toBeOnTheScreen();
    expect(screen.getByText('Inclui uma mochila ou bolsa')).toBeOnTheScreen();
    expect(screen.getByText('Não inclui bagagem para despachar')).toBeOnTheScreen();
  });
});
