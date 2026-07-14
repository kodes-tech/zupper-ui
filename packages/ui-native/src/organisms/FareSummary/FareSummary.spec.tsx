import { render, screen } from '@testing-library/react-native';
import { FareSummary } from './FareSummary';
import type { FareSummaryProps } from './FareSummary';

const baseProps: FareSummaryProps = {
  title: 'Melhor preço',
  showBadge: true,
  rows: [
    { label: 'Tarifa por adulto', value: 'R$ 1.963,27', bold: true, withDivider: true },
    { label: '1 adulto', value: 'R$ 1.963,27' },
    { label: 'Taxas e impostos', value: 'R$ 199,49', withDivider: true },
    { label: 'TOTAL A PAGAR', value: 'R$ 2.162,76', bold: true },
  ],
};

describe('FareSummary', () => {
  it('renders the title and every row', () => {
    render(<FareSummary {...baseProps} />);
    expect(screen.getByText('Melhor preço')).toBeOnTheScreen();
    expect(screen.getByText('Tarifa por adulto')).toBeOnTheScreen();
    expect(screen.getByText('1 adulto')).toBeOnTheScreen();
    expect(screen.getByText('Taxas e impostos')).toBeOnTheScreen();
    expect(screen.getByText('TOTAL A PAGAR')).toBeOnTheScreen();
    expect(screen.getByText('R$ 2.162,76')).toBeOnTheScreen();
  });

  it('omits the header when there is no title', () => {
    render(<FareSummary rows={baseProps.rows} />);
    expect(screen.queryByText('Melhor preço')).toBeNull();
  });
});
