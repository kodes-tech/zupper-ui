import { render, screen } from '@testing-library/react-native';
import { PurchaseSummaryCard } from './PurchaseSummaryCard';

describe('PurchaseSummaryCard', () => {
  it('renders the items and total', () => {
    render(
      <PurchaseSummaryCard
        items={[
          { label: 'Tarifa por adulto', value: 'R$ 654,51' },
          { label: 'Taxas e impostos', value: 'R$ 39,00' },
        ]}
        total="R$ 1.255,12"
      />,
    );
    expect(screen.getByText('Sua compra')).toBeOnTheScreen();
    expect(screen.getByText('Tarifa por adulto')).toBeOnTheScreen();
    expect(screen.getByText('Taxas e impostos')).toBeOnTheScreen();
    expect(screen.getByText('TOTAL A PAGAR')).toBeOnTheScreen();
    expect(screen.getByText('R$ 1.255,12')).toBeOnTheScreen();
  });
});
